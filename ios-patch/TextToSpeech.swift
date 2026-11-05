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

    override init() {
        super.init()
        self.synthesizer.usesApplicationAudioSession = true
        self.synthesizer.delegate = self
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
            strongSelf.resolveCurrentCall()
        }
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, utterance === strongSelf.liveUtterance else { return }
            strongSelf.liveUtterance = nil
            strongSelf.touchKeepAlive()
            strongSelf.resolveCurrentCall()
        }
    }

    private func speakLive(_ utterance: AVSpeechUtterance) {
        liveUtterance = utterance
        synthesizer.speak(utterance)
    }

    // MARK: - Lecture du fichier fabriqué : délégué du lecteur

    public func audioPlayerDidFinishPlaying(_ p: AVAudioPlayer, successfully flag: Bool) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, p === strongSelf.player else { return }
            strongSelf.player = nil
            strongSelf.touchKeepAlive()
            strongSelf.resolveCurrentCall()
        }
    }

    public func audioPlayerDecodeErrorDidOccur(_ p: AVAudioPlayer, error: Error?) {
        DispatchQueue.main.async { [weak self] in
            guard let strongSelf = self, p === strongSelf.player else { return }
            strongSelf.player = nil
            strongSelf.resolveCurrentCall()
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

    private func stopInternal() {
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
            strongSelf.stopInternal()
            strongSelf.calls.append(call)
            strongSelf.generation += 1
            strongSelf.renderAndPlay(utterance, strongSelf.generation)
        }
    }

    @objc public func stop() {
        DispatchQueue.main.async { [weak self] in
            self?.stopInternal()
        }
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
