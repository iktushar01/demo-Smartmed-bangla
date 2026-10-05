import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptReceived: (transcript: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onTranscriptReceived,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [statusText, setStatusText] = useState('আমি শুনছি…');
  const [currentPrompt, setCurrentPrompt] = useState('আপনার স্বাস্থ্য বা ওষুধ নিয়ে যে কোনো প্রশ্ন বাংলায় বলুন');
  const [aiSpokenResponse, setAiSpokenResponse] = useState<string | null>(null);

  const sampleVoicePrompts = [
    'রাতের ওষুধ কখন খাব?',
    'আজ আমার কয়টা ওষুধ বাকি আছে?',
    'আমার প্রেসার কি স্বাভাবিক?',
    'ডা. রহমানের অ্যাপয়েন্টমেন্ট কবে?',
  ];

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setStatusText('আমি শুনছি…');
      setAiSpokenResponse(null);
    }
  }, [isOpen]);

  const handleSimulatedSpeech = (phrase: string) => {
    setStatusText('শোনা হচ্ছে…');
    setCurrentPrompt(`"${phrase}"`);

    // Simulate speech-to-text recognition
    setTimeout(() => {
      setStatusText('প্রসেসিং হচ্ছে…');
      setIsListening(false);

      setTimeout(() => {
        let answer = '';
        if (phrase.includes('রাতের ওষুধ')) {
          answer = 'আপনার রাতের Napa 500mg রাত ৮টায় খাওয়ার কথা। খাবারের পরে নিতে হবে।';
        } else if (phrase.includes('কয়টা ওষুধ')) {
          answer = 'আজ আপনার ৪টি scheduled dose আছে। এর মধ্যে ৩টি নেওয়া হয়েছে এবং ১টি বাকি আছে।';
        } else if (phrase.includes('প্রেসার')) {
          answer = 'আপনার সাম্প্রতিক রক্তচাপ ১২৮/৮২ mmHg, যা স্বাভাবিক সীমার মধ্যে রয়েছে।';
        } else {
          answer = 'ডা. মিজানুর রহমানের সাথে আপনার অ্যাপয়েন্টমেন্ট ১২ অক্টোবর বিকাল ৫:০০ টায়।';
        }

        setAiSpokenResponse(answer);
        setStatusText('সহকারী কথা বলছে…');

        // Optional browser speech synthesis if available
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(answer);
            utterance.lang = 'bn-BD';
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
          }
        } catch (e) {
          // Fallback gracefully
        }
      }, 900);
    }, 1200);
  };

  const handleFinishAndSendToChat = () => {
    if (aiSpokenResponse) {
      onTranscriptReceived(currentPrompt.replace(/"/g, ''));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/95 text-white p-6 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">SmartMed Voice Assistant</h2>
            <p className="text-[11px] text-teal-300">বাংলা ভয়েস মোড</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Visualization: Big Animated Microphone & Soundwave */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto text-center py-6">
        {/* Animated Radar Circle */}
        <div className="relative mb-8 flex items-center justify-center">
          {isListening && (
            <>
              <div className="absolute w-36 h-36 rounded-full bg-teal-500/20 animate-ping opacity-60" />
              <div className="absolute w-48 h-48 rounded-full border border-teal-400/20 animate-pulse" />
            </>
          )}

          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-tr from-teal-600 to-teal-400 text-white shadow-teal-500/50 scale-105'
                : 'bg-slate-800 text-teal-300 border border-teal-500/40'
            }`}
          >
            {isListening ? (
              <Mic className="w-12 h-12 animate-pulse" />
            ) : (
              <Volume2 className="w-12 h-12 text-teal-400" />
            )}
          </div>
        </div>

        {/* Status text */}
        <p className="text-xl font-bold tracking-tight text-white mb-2">{statusText}</p>
        <p className="text-sm text-slate-300 max-w-xs leading-relaxed">{currentPrompt}</p>

        {/* Audio Waveform visualization */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 h-14 mt-6">
            <span className="w-1.5 rounded-full bg-teal-400 animate-soundwave-1" />
            <span className="w-1.5 rounded-full bg-teal-300 animate-soundwave-2" />
            <span className="w-1.5 rounded-full bg-teal-200 animate-soundwave-3" />
            <span className="w-1.5 rounded-full bg-teal-400 animate-soundwave-4" />
            <span className="w-1.5 rounded-full bg-teal-300 animate-soundwave-5" />
            <span className="w-1.5 rounded-full bg-teal-200 animate-soundwave-2" />
            <span className="w-1.5 rounded-full bg-teal-400 animate-soundwave-1" />
          </div>
        )}

        {/* AI Spoken Answer display */}
        {aiSpokenResponse && (
          <div className="mt-6 p-4 rounded-2xl bg-teal-950/70 border border-teal-500/30 text-left max-w-sm w-full animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold mb-1">
              <Volume2 className="w-4 h-4 text-teal-400" />
              <span>সহকারীর উত্তর:</span>
            </div>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              {aiSpokenResponse}
            </p>
          </div>
        )}

        {/* Sample voice triggers for quick test */}
        {isListening && (
          <div className="mt-8 w-full max-w-xs">
            <p className="text-[11px] text-slate-400 font-medium mb-2">অথবা সরাসরি প্রশ্ন স্পর্শ করুন:</p>
            <div className="flex flex-col gap-1.5">
              {sampleVoicePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSimulatedSpeech(prompt)}
                  className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left text-xs text-teal-200 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{prompt}</span>
                  <Mic className="w-3 h-3 text-teal-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="max-w-md w-full mx-auto flex items-center gap-3 pt-4">
        {aiSpokenResponse ? (
          <button
            onClick={handleFinishAndSendToChat}
            className="flex-1 min-h-[50px] rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>চ্যাটে দেখুন ও প্রশ্ন করুন</span>
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex-1 min-h-[50px] rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors"
          >
            <span>বন্ধ করুন</span>
          </button>
        )}
      </div>
    </div>
  );
};
