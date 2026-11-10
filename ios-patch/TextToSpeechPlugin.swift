import Foundation
import Capacitor
import AVFoundation

// Version modifiée (Mon Trajet) : ajoute la lecture en séquence native
// (playSequence / pauseSequence / resumeSequence / getSequenceState) pour que
// la leçon continue écran éteint. Voir ios-patch/TextToSpeech.swift.

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TextToSpeechPlugin)
public class TextToSpeechPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TextToSpeechPlugin" 
    public let jsName = "TextToSpeech" 
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "speak", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openInstall", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSupportedLanguages", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSupportedVoices", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isLanguageSupported", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "playSequence", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pauseSequence", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resumeSequence", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSequenceState", returnType: CAPPluginReturnPromise),
    ] 
    private static let errorUnsupportedLanguage = "This language is not supported."

    private let implementation = TextToSpeech()

    override public func load() {
        implementation.notify = { [weak self] name, data in
            self?.notifyListeners(name, data: data)
        }
    }

    @objc func playSequence(_ call: CAPPluginCall) {
        guard let raw = call.getArray("items") else {
            call.reject("items manquant")
            return
        }
        var items: [[String: Any]] = []
        for el in raw {
            if let o = el as? JSObject {
                var d: [String: Any] = [:]
                for (k, v) in o { d[k] = v }
                items.append(d)
            }
        }
        let start = call.getInt("start") ?? 0
        let id = call.getInt("seq") ?? 0
        implementation.playSequence(items, start, id)
        call.resolve(["seq": id])
    }

    @objc func pauseSequence(_ call: CAPPluginCall) {
        implementation.pauseSequence()
        call.resolve()
    }

    @objc func resumeSequence(_ call: CAPPluginCall) {
        implementation.resumeSequence()
        call.resolve()
    }

    @objc func getSequenceState(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            guard let s = self else { return }
            call.resolve(s.implementation.sequenceState())
        }
    }

    @objc public func speak(_ call: CAPPluginCall) {
        let text = call.getString("text") ?? ""
        let lang = call.getString("lang") ?? "en-US"
        let rate = call.getFloat("rate") ?? 1.0
        let pitch = call.getFloat("pitch") ?? 1.0
        let volume = call.getFloat("volume") ?? 1.0
        let voice = call.getInt("voice") ?? -1
        let category = call.getString("category") ?? "ambient"
        let queueStrategy = call.getInt("queueStrategy") ?? 0

        let isLanguageSupported = implementation.isLanguageSupported(lang)
        guard isLanguageSupported else {
            call.reject(TextToSpeechPlugin.errorUnsupportedLanguage)
            return
        }

        do {
            try implementation.speak(text, lang, rate, pitch, category, volume, voice, queueStrategy, call)
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc public func stop(_ call: CAPPluginCall) {
        implementation.stop()
        call.resolve()
    }

    @objc public func openInstall(_ call: CAPPluginCall) {
        call.resolve()
    }

    @objc func getSupportedLanguages(_ call: CAPPluginCall) {
        let languages = self.implementation.getSupportedLanguages()
        call.resolve([
            "languages": languages
        ])
    }

    @objc func getSupportedVoices(_ call: CAPPluginCall) {
        let allVoices = AVSpeechSynthesisVoice.speechVoices()
        var res: [[String: Any]] = []

        for voice in allVoices {
            let lang = [
                "default": false,
                "lang": voice.language,
                "localService": true,
                "name": voice.name,
                "voiceURI": voice.identifier
            ] as [String: Any]
            res.append(lang)
        }

        call.resolve([
            "voices": res
        ])
    }

    @objc func isLanguageSupported(_ call: CAPPluginCall) {
        let lang = call.getString("lang") ?? ""
        let isLanguageSupported = self.implementation.isLanguageSupported(lang)
        call.resolve([
            "supported": isLanguageSupported
        ])
    }
}
