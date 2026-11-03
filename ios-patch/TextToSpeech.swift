import AVFoundation
import Capacitor

// Version modifiée de @capacitor-community/text-to-speech 6.1.0 (Mon Trajet).
// Objectif : lecture fiable en voiture (CarPlay / Bluetooth).
//  1. Session audio ".playback" activée UNE fois, jamais désactivée entre
//     deux phrases, sans ducking : l'app est une source audio principale.
//  2. "Keep-alive" : une piste quasi silencieuse tourne en boucle pendant
//     la leçon pour que le canal audio de la voiture ne se ferme jamais
//     entre deux phrases ni pendant les micro-silences entre les mots
//     (cause des mots avalés). Elle s'arrête d'elle-même ~25 s après la
//     dernière phrase.

enum QUEUE_STRATEGY: Int {
    case QUEUE_ADD = 1, QUEUE_FLUSH = 0
}

@objc public class TextToSpeech: NSObject, AVSpeechSynthesizerDelegate {
    let synthesizer = AVSpeechSynthesizer()
    var calls: [CAPPluginCall] = []

    private var sessionReady = false
    private var keepAlive: AVAudioPlayer?
    private var keepAliveGeneration = 0
    private let keepAliveIdleSeconds: Double = 25

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
            let r = Int16(truncatingIfNeeded: Int32(seed >> 16) % 17) - 8 // bruit à -72 dBFS, inaudible
            pcm[i] = r
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
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            if self.keepAlive == nil {
                do {
                    let p = try AVAudioPlayer(data: self.makeKeepAliveData(), fileTypeHint: AVFileType.wav.rawValue)
                    p.numberOfLoops = -1
                    p.volume = 1.0
                    p.prepareToPlay()
                    self.keepAlive = p
                } catch {
                    print("TextToSpeech: keep-alive error \(error)")
                }
            }
            if let p = self.keepAlive, !p.isPlaying { p.play() }
            self.keepAliveGeneration += 1
            let gen = self.keepAliveGeneration
            DispatchQueue.main.asyncAfter(deadline: .now() + self.keepAliveIdleSeconds) { [weak self] in
                guard let self = self, gen == self.keepAliveGeneration else { return }
                if !self.synthesizer.isSpeaking { self.keepAlive?.pause() }
            }
        }
    }

    // MARK: - AVSpeechSynthesizerDelegate

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        self.resolveCurrentCall()
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        self.touchKeepAlive()
        self.resolveCurrentCall()
    }

    // MARK: - API appelée par TextToSpeechPlugin

    @objc public func speak(_ text: String, _ lang: String, _ rate: Float, _ pitch: Float, _ category: String, _ volume: Float, _ voice: Int, _ queueStrategy: Int, _ call: CAPPluginCall) throws {
        ensureSession()
        touchKeepAlive()

        if queueStrategy == QUEUE_STRATEGY.QUEUE_FLUSH.rawValue {
            self.synthesizer.stopSpeaking(at: .immediate)
        }
        self.calls.append(call)

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

        synthesizer.speak(utterance)
    }

    @objc public func stop() {
        synthesizer.stopSpeaking(at: .immediate)
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

    @objc private func resolveCurrentCall() {
        guard let call = calls.first else {
            return
        }
        call.resolve()
        calls.removeFirst()
    }
}
