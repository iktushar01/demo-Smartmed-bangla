import React from 'react';
import { Bot, Camera, FileText, Mic, Brain, Pill, ChevronRight, X, Sparkles, CheckCircle } from 'lucide-react';
import { BottomSheet } from '../common/BottomSheet';

interface AIFeaturesShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerFeature: (featureKey: string) => void;
}

export const AIFeaturesShowcase: React.FC<AIFeaturesShowcaseProps> = ({
  isOpen,
  onClose,
  onTriggerFeature,
}) => {
  const features = [
    {
      key: 'assistant',
      icon: Bot,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      title: 'AI Health Assistant',
      titleBangla: 'এআই স্বাস্থ্য সহকারী',
      desc: 'বাংলায় স্বাস্থ্য সংক্রান্ত তথ্য বুঝুন ও যে কোনো প্রশ্নের উত্তর জানুন।',
      actionText: 'চ্যাট শুরু করুন',
    },
    {
      key: 'scanner',
      icon: Camera,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Prescription Scanner',
      titleBangla: 'প্রেসক্রিপশন স্ক্যানার',
      desc: 'Prescription থেকে medicine তথ্য ও ডোজের নিয়ম নিমেষেই স্বয়ংক্রিয়ভাবে বের করুন।',
      actionText: 'প্রেসক্রিপশন স্ক্যান',
    },
    {
      key: 'report',
      icon: FileText,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Report Summarizer',
      titleBangla: 'মেডিকেল রিপোর্ট সারসংক্ষেপ',
      desc: 'জটিল ডায়াগনস্টিক রিপোর্ট সাধারণ মানুষের বোধগম্য সহজ ভাষায় বুঝে নিন।',
      actionText: 'রিপোর্ট বিশ্লেষণ',
    },
    {
      key: 'voice',
      icon: Mic,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Voice Assistant',
      titleBangla: 'ভয়েস সহকারী',
      desc: 'টাইপ না করে সরাসরি কথা বলে ওষুধ চেক করুন ও স্বাস্থ্য নির্দেশনা শুনুন।',
      actionText: 'কথা বলুন',
    },
    {
      key: 'memory',
      icon: Brain,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Health Memory',
      titleBangla: 'ব্যক্তিগত হেলথ মেমোরি',
      desc: 'আপনার পূর্ববর্তী রক্তচাপ, ডায়াবেটিস ও চিকিৎসার হিস্টোরি বিশ্লেষণ করে কাস্টম পরামর্শ।',
      actionText: 'মেমোরি দেখুন',
    },
    {
      key: 'analysis',
      icon: Pill,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Medication Analysis',
      titleBangla: 'ওষুধ বিশ্লেষণ ও ট্র্যাকিং',
      desc: 'ওষুধ খাওয়ার সময়ানুবর্তিতা (Adherence Rate) ও সম্ভাব্য ড্রাগ ইন্টারঅ্যাকশন পরীক্ষা।',
      actionText: 'শিডিউল দেখুন',
    },
  ];

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="SmartMed AI ক্ষমতা"
      subtitle="বাংলায় নির্মিত পরবর্তী প্রজন্মের ডিজিটাল স্বাস্থ্য প্রযুক্তি"
    >
      <div className="space-y-3 pb-2">
        {features.map((feat) => {
          const Icon = feat.icon;

          return (
            <div
              key={feat.key}
              className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-teal-300 transition-all shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{feat.title}</h4>
                    <span className="text-[11px] font-semibold text-teal-700">{feat.titleBangla}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      বাংলা ভাষায় সক্রিয়
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onTriggerFeature(feat.key);
                      }}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                      <span>{feat.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
};
