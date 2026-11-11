import AVFoundation
import Capacitor

// Version modifiée de @capacitor-community/text-to-speech 6.1.0 (Mon Trajet).
// Objectif : lecture fiable en voiture (CarPlay / Bluetooth).
//
// Au lieu de laisser la synthèse vocale parler « en direct » (ce qui hache en
// CarPlay : mots avalés), chaque phrase est d'abord FABRIQUÉE en fichier audio
// (AVSpeechSynthesizer.write), puis jouée comme un son normal (AVAudioPlayer),
// exactement comme de la musique ou un podcast, qui passent sans problème
// dans la voiture.
//  - Session audio « .playback » activée une fois, sans ducking.
//  - Piste quasi silencieuse en boucle pendant la leçon (keep-alive) pour que
//    le canal audio de la voiture reste ouvert entre deux phrases.
//  - Secours : si la fabrication du fichier échoue (voix incompatible…),
//    la phrase est lue en direct comme avant.
//  - LECTURE EN SÉQUENCE NATIVE (playSequence) : toute la leçon (phrases ET
//    silences de répétition, et les leçons suivantes enchaînées) est confiée
//    d'un bloc au code natif. iOS gèle la page web (JavaScript) quand l'écran
//    s'éteint ; avec la séquence native, la lecture continue écran noir /
//    verrouillé, sans dépendre du JavaScript. La page est tenue au courant
//    par des événements (seqProgress / seqEnd) qu'elle traite à son réveil.
//  - INTERRUPTIONS (appel téléphonique, Siri, alarme…) : iOS coupe le son de
//    l'app. On met alors la séquence en pause proprement (seqPaused) et on la
//    reprend automatiquement quand iOS signale la fin de l'interruption
//    (seqResumed). Sans cela, la leçon restait bloquée après un appel.

enum QUEUE_STRATEGY: Int {
    case QUEUE_ADD = 1, QUEUE_FLUSH = 0
}

final class MTRenderJob {
    let lock = NSLock()
    var file: AVAudioFile?
    var frames: AVAudioFrameCount = 0
    var done = false
}

@objc public class TextToSpeech: NSObject, AVSpeechSynthesizerDelegate, AVAudioPlayerDelegate {
    let synthesizer = AVSpeechSynthesizer()      // lecture en direct (secours)
    private var renderSynth: AVSpeechSynthesizer? // fabrication des fichiers
    var calls: [CAPPluginCall] = []

    private var sessionReady = false
    private var keepAlive: AVAudioPlayer?
    private var keepAliveGeneration = 0
    private let keepAliveIdleSeconds: Double = 25

    private var player: AVAudioPlayer?
    private var liveUtterance: AVSpeechUtterance?
    private var generation = 0
    private var onDone: (() -> Void)?   // appelé quand la phrase en cours est finie

    // Séquence native
    var notify: ((String, [String: Any]) -> Void)?
    private var seqItems: [[String: Any]] = []
    private var seqIndex = 0
    private var seqId = 0
    private var seqActive = false
    private var seqPaused = false
    private var seqInWait = false
    private var seqEnded = false       // la séquence est allée jusqu'au bout (≠ arrêtée)
    private var seqInterrupted = false // mise en pause par iOS (appel, Siri…), pas par l'utilisateur
    private var waitRemaining: Double = 0
    private var waitStartedAt: Date?
    private var waitGen = 0

    override init() {
        super.init()
        self.synthesizer.usesApplicationAudioSession = true
        self.synthesizer.delegate = self
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(handleInterruption(_:)),
                                               name: AVAudioSession.interruptionNotification,
                                               object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    // MARK: - Interruptions (appel téléphonique, Siri, alarme…)

    @objc private func handleInterruption(_ note: Notification) {
        guard let info = note.userInfo,
              let rawType = info[AVAudioSessionInterruptionTypeKey] as? UInt,
              let type = AVAudioSession.InterruptionType(rawValue: rawType) else { return }
        let rawOptions = (info[AVAudioSessionInterruptionOptionKey] as? UInt) ?? 0
        let shouldResume = AVAudioSession.InterruptionOptions(rawValue: rawOptions).contains(.shouldResume)
        // iOS envoie aussi un « début d'interruption » en retard quand l'app avait
        // simplement été mise en sommeil : ce n'est pas une vraie coupure, on l'ignore
        // (sinon une leçon tout juste lancée se mettrait en pause toute seule).
        let wasSuspended = (info["AVAudioSessionInterruptionWasSuspendedKey"] as? Bool) ?? false
        let rawReason = (info["AVAudioSessionInterruptionReasonKey"] as? UInt) ?? 0 // 1 = l'app avait été suspendue
        DispatchQueue.main.async { [weak self] in
            guard let s = self else { return }
            if type == .began {
                if wasSuspended || rawReason == 1 { return }
                // iOS vient de couper notre son : on fige la séquence là où elle en est.
                guard s.seqActive, !s.seqPaused else { return }
                s.pauseNow()
                s.seqInterrupted = true
                s.notify?("seqPaused", ["seq": s.seqId])
            } else {
                guard s.seqInterrupted else { return }
                s.seqInterrupted = false
                // Fin de l'appel : on reprend tout seul si iOS l'autorise ; sinon la
                // leçon reste en pause et l'utilisateur la relance avec le bouton lecture.
                if shouldResume, s.seqActive, s.seqPaused {
                    s.resumeNow(2, true)
                }
            }
        }
    }

    // MARK: - Session audio

    private func ensureSession() {
        if sessionReady { return }
        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.playback, mode: .default, options: [])
            try session.setActive(true)
            sessionReady = true
        } catch {
            print("TextToSpeech: AVAudioSession error \(error)")
        }
    }

    // MARK: - Keep-alive (piste quasi silencieuse en boucle)

    private func makeKeepAliveData() -> Data {
        let sampleRate = 44100
        let frames = sampleRate * 2
        var pcm = [Int16](repeating: 0, count: frames)
        var seed: UInt32 = 12345
        for i in 0..<frames {
            seed = seed &* 1664525 &+ 1013904223
            pcm[i] = Int16(Int32(seed >> 16) % 17) - 8 // bruit à -72 dBFS, inaudible
        }
        let dataSize = frames * 2
        var d = Data()
        func u32(_ v: UInt32) { var x = v.littleEndian; d.append(Data(bytes: &x, count: 4)) }
        func u16(_ v: UInt16) { var x = v.littleEndian; d.append(Data(bytes: &x, count: 2)) }
        d.append("RIFF".data(using: .ascii)!)
        u32(UInt32(36 + dataSize))
        d.append("WAVE".data(using: .ascii)!)
        d.append("fmt ".data(using: .ascii)!)
        u32(16); u16(1); u16(1)
        u32(UInt32(sampleRate)); u32(UInt32(sampleRate * 2)); u16(2); u16(16)
        d.append("data".data(using: .ascii)!)
        u32(UInt32(dataSize))
        pcm.withUnsafeBufferPointer { d.append(Data(buffer: $0)) }
        return d
    }

    private func touchKeepAlive() {
        if keepAlive == nil {
            do {
                let p = try AVAudioPlayer(data: makeKeepAliveData(), fileTypeHint: AVFileType.wav.rawValue)
                p.numberOfLoops = -1
                p.volume = 1.0
                p.prepareToPlay()
                keepAlive = p
            } catch {
                print("TextToSpeech: keep-alive error \(error)")
            }
        }
        if let p = keepAlive, !p.isPlaying { p.play() }
        keepAliveGeneration += 1
        let gen = keepAliveGeneration
        DispatchQueue.main.asyncAfter(deadline: .now() + keepAliveIdleSeconds) { [weak self] in
            guard let strongSelf = self, gen == strongSelf.keepAliveGeneration else { return }
            if strongSelf.seqActive && !strongSelf.seqPaused { strongSelf.touchKeepAlive(); return }
            if strongSelf.player == nil && !strongSelf.synthesizer.isSpeaking {
                strongSelf.keepAlive?.pause()
            }
        }
    }

    // MARK: - Résolution des appels JS

    private func resolveCurrentCall() {
        guard let call = calls.first else { return }
        call.resolve()
        calls.removeFirst()
    }

    private func finishCurrent() {
        let d = onDone
        onDone = nil
        d?()
    }

    private func resolveAllCalls() {
        let pending = calls
        calls.removeAll()
        for c in pending { c.resolve() }
    }

    // MARK: - Lecture en direct (secours) : délégué du synthétiseur

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, utterance === strongSelf.liveUtterance else { return }
            strongSelf.liveUtterance = nil
            strongSelf.finishCurrent()
        }
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, utterance === strongSelf.liveUtterance else { return }
            strongSelf.liveUtterance = nil
            strongSelf.touchKeepAlive()
            strongSelf.finishCurrent()
        }
    }

    private func speakLive(_ utterance: AVSpeechUtterance) {
        liveUtterance = utterance
        synthesizer.speak(utterance)
        if seqActive && seqPaused { synthesizer.pauseSpeaking(at: .immediate) }
    }

    // MARK: - Lecture du fichier fabriqué : délégué du lecteur

    public func audioPlayerDidFinishPlaying(_ p: AVAudioPlayer, successfully flag: Bool) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, p === strongSelf.player else { return }
            strongSelf.player = nil
            strongSelf.touchKeepAlive()
            strongSelf.finishCurrent()
        }
    }

    public func audioPlayerDecodeErrorDidOccur(_ p: AVAudioPlayer, error: Error?) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, p === strongSelf.player else { return }
            strongSelf.player = nil
            strongSelf.finishCurrent()
        }
    }

    // MARK: - Fabrication du fichier audio d'une phrase

    private func renderAndPlay(_ utterance: AVSpeechUtterance, _ gen: Int) {
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("montrajet_tts_\(gen % 4).caf")
        try? FileManager.default.removeItem(at: url)

        let job = MTRenderJob()
        let synth = AVSpeechSynthesizer()
        renderSynth = synth

        synth.write(utterance) { [weak self] buffer in
            guard let pcm = buffer as? AVAudioPCMBuffer else { return }
            job.lock.lock()
            if job.done { job.lock.unlock(); return }
            if pcm.frameLength == 0 {
                job.done = true
                job.file = nil // ferme le fichier
                job.lock.unlock()
                DispatchQueue.main.async { self?.renderFinished(job, url, gen, utterance) }
                return
            }
            do {
                if job.file == nil {
                    job.file = try AVAudioFile(forWriting: url,
                                               settings: pcm.format.settings,
                                               commonFormat: pcm.format.commonFormat,
                                               interleaved: pcm.format.isInterleaved)
                }
                try job.file?.write(from: pcm)
                job.frames += pcm.frameLength
            } catch {
                print("TextToSpeech: render write error \(error)")
            }
            job.lock.unlock()
        }

        // Sécurité : si la fin de fabrication n'est jamais signalée, on joue
        // ce qui a été fabriqué (ou on passe en lecture directe).
        let timeout = max(8.0, Double(utterance.speechString.count) * 0.25)
        DispatchQueue.main.asyncAfter(deadline: .now() + timeout) { [weak self] in
            job.lock.lock()
            if job.done { job.lock.unlock(); return }
            job.done = true
            job.file = nil
            job.lock.unlock()
            self?.renderFinished(job, url, gen, utterance)
        }
    }

    private func renderFinished(_ job: MTRenderJob, _ url: URL, _ gen: Int, _ utterance: AVSpeechUtterance) {
        guard gen == generation else { return } // phrase annulée entre-temps
        renderSynth = nil
        if job.frames == 0 {
            speakLive(utterance)
            return
        }
        do {
            let p = try AVAudioPlayer(contentsOf: url)
            p.delegate = self
            p.prepareToPlay()
            player = p
            touchKeepAlive()
            if seqActive && seqPaused { return } // reprendra au resumeSequence()
            if !p.play() {
                player = nil
                speakLive(utterance)
            }
        } catch {
            print("TextToSpeech: player error \(error)")
            speakLive(utterance)
        }
    }

    // MARK: - Arrêt

    private func stopPlayback() {
        generation += 1
        onDone = nil
        if let p = player { p.stop() }
        player = nil
        renderSynth?.stopSpeaking(at: .immediate)
        renderSynth = nil
        liveUtterance = nil
        if synthesizer.isSpeaking { synthesizer.stopSpeaking(at: .immediate) }
    }

    private func stopSequence() {
        seqActive = false
        seqPaused = false
        seqEnded = false
        seqInterrupted = false
        seqInWait = false
        waitStartedAt = nil
        waitGen += 1
        seqItems = []
    }

    private func stopInternal() {
        onDone = nil
        generation += 1
        if let p = player { p.stop() }
        player = nil
        renderSynth?.stopSpeaking(at: .immediate)
        renderSynth = nil
        liveUtterance = nil
        if synthesizer.isSpeaking { synthesizer.stopSpeaking(at: .immediate) }
        resolveAllCalls()
    }

    // MARK: - API appelée par TextToSpeechPlugin

    @objc public func speak(_ text: String, _ lang: String, _ rate: Float, _ pitch: Float, _ category: String, _ volume: Float, _ voice: Int, _ queueStrategy: Int, _ call: CAPPluginCall) throws {
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: lang)
        utterance.rate = adjustRate(rate)
        utterance.pitchMultiplier = pitch
        utterance.volume = volume

        if voice >= 0 {
            let allVoices = AVSpeechSynthesisVoice.speechVoices()
            if voice < allVoices.count {
                utterance.voice = allVoices[voice]
            }
        }

        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self else { return }
            strongSelf.ensureSession()
            strongSelf.touchKeepAlive()
            // L'app enchaîne toujours une phrase après l'autre : on coupe toute
            // phrase précédente encore en cours, quelle que soit la stratégie.
            strongSelf.stopSequence()
            strongSelf.stopInternal()
            strongSelf.calls.append(call)
            strongSelf.onDone = { [weak self] in self?.resolveCurrentCall() }
            strongSelf.generation += 1
            strongSelf.renderAndPlay(utterance, strongSelf.generation)
        }
    }

    @objc public func stop() {
        DispatchQueue.main.async { [weak self] in
            self?.stopSequence()
            self?.stopInternal()
        }
    }

    // MARK: - Séquence native (leçon entière jouée sans le JavaScript)

    private func makeUtterance(_ text: String, _ lang: String, _ rate: Float, _ voice: Int) -> AVSpeechUtterance {
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: lang)
        utterance.rate = adjustRate(rate)
        utterance.pitchMultiplier = 1.0
        utterance.volume = 1.0
        if voice >= 0 {
            let allVoices = AVSpeechSynthesisVoice.speechVoices()
            if voice < allVoices.count { utterance.voice = allVoices[voice] }
        }
        return utterance
    }

    private static func num(_ v: Any?) -> Double? {
        if let n = v as? NSNumber { return n.doubleValue }
        if let d = v as? Double { return d }
        if let i = v as? Int { return Double(i) }
        if let f = v as? Float { return Double(f) }
        return nil
    }

    @objc public func playSequence(_ items: [[String: Any]], _ start: Int, _ id: Int) {
        DispatchQueue.main.async { [weak self] in
            guard let s = self else { return }
            s.stopSequence()
            s.stopInternal()
            s.ensureSession()
            s.seqItems = items
            s.seqIndex = max(0, start)
            s.seqId = id
            s.seqActive = true
            s.seqPaused = false
            s.seqEnded = false
            s.seqInterrupted = false
            s.touchKeepAlive()
            s.seqRun()
        }
    }

    private func seqAdvance(_ id: Int, _ idx: Int) {
        DispatchQueue.main.async { [weak self] in
            guard let s = self, s.seqActive, s.seqId == id, s.seqIndex == idx else { return }
            s.seqIndex = idx + 1
            s.seqRun()
        }
    }

    private func seqRun() {
        guard seqActive else { return }
        let id = seqId
        if seqIndex >= seqItems.count {
            seqActive = false
            seqEnded = true
            seqItems = []
            touchKeepAlive() // la piste silencieuse s'arrêtera seule après le délai d'inactivité
            notify?("seqEnd", ["seq": id])
            return
        }
        let idx = seqIndex
        let it = seqItems[idx]
        notify?("seqProgress", ["seq": id, "index": idx])
        let kind = (it["k"] as? String) ?? "w"
        if kind == "s" {
            let text = (it["text"] as? String) ?? ""
            let lang = (it["lang"] as? String) ?? "fr-FR"
            let rate = Float(TextToSpeech.num(it["rate"]) ?? 1.0)
            let voice = Int(TextToSpeech.num(it["voice"]) ?? -1)
            if text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || (voice < 0 && !isLanguageSupported(lang)) {
                seqAdvance(id, idx)
                return
            }
            let u = makeUtterance(text, lang, rate, voice)
            stopPlayback()
            onDone = { [weak self] in self?.seqAdvance(id, idx) }
            generation += 1
            touchKeepAlive()
            renderAndPlay(u, generation)
        } else {
            let ms = TextToSpeech.num(it["ms"]) ?? 0
            seqInWait = true
            scheduleWait(ms / 1000.0, id, idx)
        }
    }

    private func scheduleWait(_ secs: Double, _ id: Int, _ idx: Int) {
        waitRemaining = max(0, secs)
        waitStartedAt = Date()
        waitGen += 1
        let g = waitGen
        touchKeepAlive()
        DispatchQueue.main.asyncAfter(deadline: .now() + waitRemaining) { [weak self] in
            guard let s = self, s.seqActive, !s.seqPaused, s.seqId == id, s.waitGen == g else { return }
            s.seqInWait = false
            s.waitStartedAt = nil
            s.seqAdvance(id, idx)
        }
    }

    // Fige la séquence (à appeler sur le fil principal).
    private func pauseNow() {
        guard seqActive, !seqPaused else { return }
        seqPaused = true
        if seqInWait, let t = waitStartedAt {
            waitRemaining = max(0, waitRemaining - Date().timeIntervalSince(t))
            waitStartedAt = nil
            waitGen += 1
        }
        if let p = player, p.isPlaying { p.pause() }
        if liveUtterance != nil && synthesizer.isSpeaking { synthesizer.pauseSpeaking(at: .word) }
        keepAlive?.pause()
    }

    // Relance la séquence là où elle s'était arrêtée (à appeler sur le fil principal).
    // retriesLeft : nouvelles tentatives si iOS refuse encore de rendre le son
    // (juste après un appel) ; announce : prévenir la page que la lecture a repris.
    private func resumeNow(_ retriesLeft: Int, _ announce: Bool) {
        guard seqActive, seqPaused else { return }
        sessionReady = false // après un appel, la session audio doit être réactivée
        ensureSession()
        if !seqInWait, let p = player, !p.isPlaying {
            if !p.play() {
                // Le son n'est pas encore rendu à l'app : on réessaie un peu plus tard,
                // sinon on reste en pause (l'utilisateur relancera avec le bouton lecture).
                let id = seqId
                if retriesLeft > 0 {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { [weak self] in
                        guard let s = self, s.seqActive, s.seqPaused, s.seqId == id else { return }
                        s.resumeNow(retriesLeft - 1, announce)
                    }
                } else {
                    notify?("seqPaused", ["seq": id])
                }
                return
            }
        }
        seqPaused = false
        seqInterrupted = false
        touchKeepAlive()
        if seqInWait {
            scheduleWait(waitRemaining, seqId, seqIndex)
        } else if player == nil && liveUtterance != nil {
            synthesizer.continueSpeaking()
        }
        // sinon : la phrase est en cours de fabrication, elle démarrera seule.
        if announce { notify?("seqResumed", ["seq": seqId]) }
    }

    @objc public func pauseSequence() {
        DispatchQueue.main.async { [weak self] in
            self?.pauseNow()
        }
    }

    @objc public func resumeSequence() {
        DispatchQueue.main.async { [weak self] in
            self?.resumeNow(0, false)
        }
    }

    @objc public func sequenceState() -> [String: Any] {
        return ["seq": seqId, "index": seqIndex, "active": seqActive, "paused": seqPaused, "ended": seqEnded]
    }

    @objc public func getSupportedLanguages() -> [String] {
        return Array(AVSpeechSynthesisVoice.speechVoices().map {
            return $0.language
        })
    }

    @objc public func isLanguageSupported(_ lang: String) -> Bool {
        let voice = AVSpeechSynthesisVoice(language: lang)
        return voice != nil
    }

    @objc private func adjustRate(_ rate: Float) -> Float {
        let baseRate: Float = AVSpeechUtteranceDefaultSpeechRate
        if rate >= 1.0 {
            return (0.1 * rate) + (baseRate - 0.1)
        }
        return rate * baseRate
    }
}
