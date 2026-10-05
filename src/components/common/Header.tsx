import React from 'react';
import { Bell, AlertOctagon, Sparkles } from 'lucide-react';
import { TabType } from '../../types';

interface HeaderProps {
  currentTab: TabType;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenEmergency: () => void;
  onOpenAiAssistant: () => void;
  onNavigateTab: (tab: TabType) => void;
  largeText: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  unreadCount,
  onOpenNotifications,
  onOpenEmergency,
  onOpenAiAssistant,
  onNavigateTab,
  largeText,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:bg-teal-700 transition-colors">
              <span className="font-bold text-lg font-serif">স</span>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors block leading-tight">
                SmartMed Bangla
              </span>
              <span className="text-[11px] text-slate-500 font-medium leading-none block">
                ডিজিটাল স্বাস্থ্য সহকারী
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Desktop Quick Navigation / Mobile Current Section */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigateTab('home')}
            className={`hover:text-teal-700 transition-colors ${currentTab === 'home' ? 'text-teal-700 font-semibold' : ''}`}
          >
            হোম
          </button>
          <button
            onClick={() => onNavigateTab('medicines')}
            className={`hover:text-teal-700 transition-colors ${currentTab === 'medicines' ? 'text-teal-700 font-semibold' : ''}`}
          >
            ওষুধ তালিকা
          </button>
          <button
            onClick={() => onNavigateTab('health')}
            className={`hover:text-teal-700 transition-colors ${currentTab === 'health' ? 'text-teal-700 font-semibold' : ''}`}
          >
            স্বাস্থ্য চার্ট
          </button>
          <button
            onClick={() => onNavigateTab('caregiver')}
            className={`hover:text-teal-700 transition-colors ${currentTab === 'caregiver' ? 'text-teal-700 font-semibold' : ''}`}
          >
            ফ্যামিলি কেয়ার
          </button>
          <button
            onClick={() => onNavigateTab('ai')}
            className={`hover:text-teal-700 transition-colors flex items-center gap-1 ${currentTab === 'ai' ? 'text-teal-700 font-semibold' : ''}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            এআই সহকারী
          </button>
        </div>

        {/* Zone 3: Actions (SOS, Notifications, Profile) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick SOS Trigger */}
          <button
            onClick={onOpenEmergency}
            className="min-h-[44px] px-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100 flex items-center gap-1.5 transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-rose-500 active:scale-95"
            title="জরুরি সাহায্য (SOS)"
            aria-label="জরুরি সাহায্য"
          >
            <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
            <span className="hidden sm:inline">ইমার্জেন্সি</span>
            <span className="sm:hidden font-bold">SOS</span>
          </button>

          {/* AI Quick launcher button */}
          <button
            onClick={onOpenAiAssistant}
            className="min-h-[44px] min-w-[44px] rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100 flex items-center justify-center border border-teal-200/60 transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
            title="SmartMed AI সহকারী"
            aria-label="SmartMed AI সহকারী"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative min-h-[44px] min-w-[44px] rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
            title="বিজ্ঞপ্তি"
            aria-label="বিজ্ঞপ্তি দেখুন"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Profile Avatar trigger */}
          <button
            onClick={() => onNavigateTab('profile')}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-teal-500 ${
              currentTab === 'profile' ? 'ring-2 ring-teal-600' : 'hover:bg-slate-100'
            }`}
            title="ব্যবহারকারী প্রোফাইল"
            aria-label="প্রোফাইলে যান"
          >
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
              TU
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
