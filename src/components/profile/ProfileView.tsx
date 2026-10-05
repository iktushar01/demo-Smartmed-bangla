import React from 'react';
import { User, Phone, Shield, Bell, Volume2, Globe, Eye, Sparkles, HeartHandshake, Check, ChevronRight, FileText, Lock } from 'lucide-react';
import { UserSettings } from '../../types';

interface ProfileViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onOpenCaregiver: () => void;
  onOpenReports: () => void;
  onOpenFeatures: () => void;
  onReplayOnboarding: () => void;
  onToast: (title: string, desc: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  settings,
  onUpdateSettings,
  onOpenCaregiver,
  onOpenReports,
  onOpenFeatures,
  onReplayOnboarding,
  onToast,
}) => {
  return (
    <div className="space-y-5 pb-8 max-w-3xl mx-auto">
      {/* Profile Card Header */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-teal-800/20">
            TU
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              Tushar (তুযার)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">বয়স: ৩৪ বছর · রক্ত গ্রুপ: B+ (পজেটিভ)</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                স্মার্ট হেলথ আইডি: #BD-7829
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToast('প্রোফাইল আপডেট', 'ব্যক্তিগত তথ্য সম্পাদনা পেজ খোলা হচ্ছে।')}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 border border-teal-200 px-3 py-1.5 rounded-xl hover:bg-teal-50 transition-colors"
        >
          এডিট করুন
        </button>
      </div>

      {/* Accessibility Center (Key Feature for Seniors & Visual Impairment) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Accessibility Settings (সহজ দর্শন ও সহায়ক সুবিধা)
              </h3>
              <p className="text-xs text-slate-400">বয়োজ্যেষ্ঠ ও দৃষ্টি সহায়তার জন্য বিশেষ মোড</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Large Text */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
            <div>
              <p className="text-xs font-bold text-white">বড় হরফ (Large Text)</p>
              <p className="text-[11px] text-slate-400">অ্যাপের সব টেক্সটের সাইজ বৃদ্ধি করে পড়া সহজ করে</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ largeText: !settings.largeText });
                onToast('বড় হরফ মোড', settings.largeText ? 'বড় হরফ মোড বন্ধ হয়েছে।' : 'বড় হরফ মোড চালু হয়েছে!');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.largeText ? 'bg-teal-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.largeText ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
            <div>
              <p className="text-xs font-bold text-white">হাই কনট্রাস্ট (High Contrast)</p>
              <p className="text-[11px] text-slate-400">রং ও টেক্সটের স্পষ্টতা বৃদ্ধি করে</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ highContrast: !settings.highContrast });
                onToast('হাই কনট্রাস্ট', settings.highContrast ? 'স্বাভাবিক কনট্রাস্ট' : 'হাই কনট্রাস্ট সক্রিয়!');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.highContrast ? 'bg-teal-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Guidance */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
            <div>
              <p className="text-xs font-bold text-white">ভয়েস অ্যাসিস্ট্যান্ট স্বয়ংক্রিয় পাঠ</p>
              <p className="text-[11px] text-slate-400">ওষুধের নাম ও এআই উত্তর বাংলায় জোরে পড়ে শোনানো</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ audioFeedback: !settings.audioFeedback });
                onToast('ভয়েস অডিও', settings.audioFeedback ? 'ভয়েস পাঠ নিষ্ক্রিয়' : 'ভয়েস পাঠ সক্রিয় হয়েছে');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                settings.audioFeedback ? 'bg-teal-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.audioFeedback ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Medical Info Section */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">মেডিকেল তথ্য (Medical Profile)</h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium block">রক্তের গ্রুপ</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block font-mono">B+ (পজেটিভ)</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium block">অ্যালার্জি</span>
            <span className="font-bold text-rose-700 text-xs mt-0.5 block">পেনিসিলিন (Penicillin)</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 col-span-2">
            <span className="text-slate-400 font-medium block">পূর্ববর্তী রোগ ও শারীরিক অবস্থা</span>
            <div className="flex gap-2 mt-1">
              <span className="font-medium text-slate-800">১. মাইল্ড হাইপারটেনশন (উচ্চ রক্তচাপ)</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-medium text-slate-800">২. প্রি-ডায়াবেটিস</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Section */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">জরুরি কন্টাক্ট (Emergency Contacts)</h3>
          <span className="text-xs text-teal-700 font-medium">+ নতুন যোগ করুন</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-900 text-xs block">Rahim (ভাই - ভাইপো)</span>
            <span className="text-xs text-slate-500 font-mono">+880 1711-234567</span>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">প্রাথমিক এসওএস রিসিভার</span>
          </div>
          <button
            onClick={() => onToast('টেস্ট কল', 'Rahim-এর সাথে সংযোগ করা হচ্ছে…')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-teal-700"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Caregiver and Health Reports Shortcuts */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenCaregiver}
          className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-teal-400 text-left transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-900">ফ্যামিলি কেয়ার</p>
          <p className="text-[11px] text-slate-500 mt-0.5">আম্মার ওষুধ ট্র্যাকিং</p>
        </button>

        <button
          onClick={onOpenReports}
          className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-teal-400 text-left transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-slate-900">মেডিকেল রিপোর্ট</p>
          <p className="text-[11px] text-slate-500 mt-0.5">ল্যাব টেস্ট এআই বিশ্লেষণ</p>
        </button>
      </div>

      {/* Language and App Settings */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">ভাষা ও নিরাপত্তা</h3>

        {/* Language selector */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-700">অ্যাপের ভাষা</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onUpdateSettings({ language: 'bn' })}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                settings.language === 'bn'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => onUpdateSettings({ language: 'en' })}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                settings.language === 'en'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-600" />
            <span>গোপনীয়তা ও তথ্য নিরাপত্তা (HIPAA / স্থানীয় স্ট্যান্ডার্ড)</span>
          </div>
          <span className="text-emerald-700 font-semibold">এনক্রিপ্টেড ✓</span>
        </div>

        {/* Replay Onboarding */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <span>অ্যাপ পরিচিতি ও টিউটোরিয়াল</span>
          </div>
          <button
            type="button"
            onClick={onReplayOnboarding}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-200/80 transition-colors"
          >
            অনবোর্ডিং স্লাইড দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};
