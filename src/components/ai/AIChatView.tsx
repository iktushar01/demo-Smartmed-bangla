import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, User, Bot, RotateCcw, Volume2, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../../types';
import { mockAiResponses } from '../../data/mockData';

interface AIChatViewProps {
  onOpenVoiceMode: () => void;
  onOpenFeaturesShowcase: () => void;
  largeText: boolean;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  onOpenVoiceMode,
  onOpenFeaturesShowcase,
  largeText,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'আসসালামু আলাইকুম Tushar! আমি SmartMed AI স্বাস্থ্য সহকারী। আপনার ওষুধ, স্বাস্থ্য রিপোর্ট বা প্রতিদিনের যত্ন সম্পর্কে বাংলায় যে কোনো প্রশ্ন করতে পারেন।',
      time: 'সকাল ৯:০০',
      suggestions: [
        'আজকের ওষুধ দেখাও',
        'আমার health summary',
        'আমার appointment কখন?',
        'আমার রিপোর্ট বুঝিয়ে দাও',
      ],
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'আজ আমার কয়টা ওষুধ আছে?',
      time: 'সকাল ৯:০২',
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'আজ আপনার ৪টি scheduled dose আছে। এর মধ্যে ৩টি নেওয়া হয়েছে এবং ১টি বাকি আছে (Napa 500mg রাত ৮:০০ টায়)।',
      time: 'সকাল ৯:০২',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic AI thought & response
    setTimeout(() => {
      let reply = mockAiResponses[query.trim()];

      if (!reply) {
        if (query.includes('ওষুধ') || query.includes('dose') || query.includes('নাপা') || query.includes('মেডিসিন')) {
          reply = 'আপনার তালিকায় বর্তমানে Napa 500mg (রাত ৮:০০) এবং Metformin 500mg (রাত ৮:৩০) অন্তর্ভুক্ত আছে। সময়মতো ওষুধ নেওয়া নিশ্চিত করুন।';
        } else if (query.includes('প্রেসার') || query.includes('রক্তচাপ')) {
          reply = 'আপনার সর্বশেষ রেকর্ড করা রক্তচাপ ১২৮/৮২ mmHg, যা স্বাভাবিক। অতিরিক্ত লবণ এড়িয়ে চলুন এবং নিয়মিত বিশ্রাম নিন।';
        } else if (query.includes('ডাক্তার') || query.includes('অ্যাপয়েন্টমেন্ট')) {
          reply = 'ডা. মিজানুর রহমানের সাথে আগামী ১২ অক্টোবর বিকাল ৫:০০ টায় স্কয়ার হাসপাতালে আপনার কনসালটেশন নির্ধারিত আছে।';
        } else {
          reply = 'আপনার প্রশ্নের জন্য ধন্যবাদ। SmartMed AI আপনার মেডিকেল হিস্টোরি অনুসারে জানাচ্ছে: আপনার নিয়মিত ওষুধ ও স্বাস্থ্য পরিমাপ স্বাভাবিক গতিতে চলছে। বিশেষ কোনো শারীরিক অস্বস্তি হলে দ্রুত চিকিৎসকের সাথে যোগাযোগ করুন।';
        }
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleSpeakMessage = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bn-BD';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      // Graceful fallback
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] md:h-[calc(100vh-5.5rem)] max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="px-4 py-3 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900 text-base leading-tight">SmartMed AI</h2>
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                বাংলা স্বাস্থ্য সহকারী
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ওষুধ, প্রেসক্রিপশন ও দৈনন্দিন যত্ন বিষয়ক তথ্য
            </p>
          </div>
        </div>

        <button
          onClick={onOpenFeaturesShowcase}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:bg-teal-50 px-2.5 py-1.5 rounded-xl border border-teal-200/70 transition-colors"
        >
          এআই ফিচারসমূহ
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((message) => {
          const isAi = message.sender === 'ai';

          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-md rounded-2xl p-3.5 shadow-xs transition-all ${
                  isAi
                    ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    : 'bg-teal-700 text-white rounded-tr-xs'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {message.text}
                </p>

                <div
                  className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[11px] ${
                    isAi
                      ? 'border-slate-100 text-slate-400'
                      : 'border-teal-600/60 text-teal-100'
                  }`}
                >
                  <span className="font-mono">{message.time}</span>
                  {isAi && (
                    <button
                      onClick={() => handleSpeakMessage(message.text)}
                      className="text-slate-400 hover:text-teal-700 p-0.5 rounded transition-colors flex items-center gap-1 text-[11px]"
                      title="অডিও শুনুন"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>শুনুন</span>
                    </button>
                  )}
                </div>

                {/* Suggested prompt chips inside AI bubble */}
                {isAi && message.suggestions && (
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">
                      দ্রুত প্রশ্ন করতে ট্যাপ করুন:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {message.suggestions.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-medium border border-teal-200/60 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-400 font-medium ml-1">সহকারী উত্তর লিখছে…</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Bar */}
      <div className="px-4 py-2 bg-white/90 border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap shrink-0">
          পরামর্শ:
        </span>
        <button
          onClick={() => handleSendMessage('রাতের ওষুধ কখন খাব?')}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 whitespace-nowrap transition-colors border border-slate-200/60 shrink-0"
        >
          রাতের ওষুধ কখন খাব?
        </button>
        <button
          onClick={() => handleSendMessage('আমার health summary')}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 whitespace-nowrap transition-colors border border-slate-200/60 shrink-0"
        >
          স্বাস্থ্য সারসংক্ষেপ
        </button>
        <button
          onClick={() => handleSendMessage('আমার appointment কখন?')}
          className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 whitespace-nowrap transition-colors border border-slate-200/60 shrink-0"
        >
          অ্যাপয়েন্টমেন্ট কখন?
        </button>
      </div>

      {/* Input Box and Action Bar */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Launcher Button */}
          <button
            type="button"
            onClick={onOpenVoiceMode}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 flex items-center justify-center border border-teal-200/80 transition-colors shrink-0"
            title="ভয়েসে বলুন"
            aria-label="ভয়েস সহকারী মোড চালু করুন"
          >
            <Mic className="w-5 h-5 text-teal-600 animate-pulse" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="আপনার প্রশ্ন বাংলায় লিখুন (যেমন: রাতের ওষুধ কখন খাব?)"
            className="flex-1 h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 bg-slate-50/60"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center shadow-xs transition-colors shrink-0"
            aria-label="বার্তা পাঠান"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>SmartMed AI তথ্যমূলক সহায়তার জন্য তৈরি। জটিল বিষয়ে চিকিৎসকের পরামর্শ নিন।</span>
        </p>
      </div>
    </div>
  );
};
