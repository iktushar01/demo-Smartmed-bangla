import React from 'react';
import { Home, Pill, Activity, Sparkles, User, Users, AlertOctagon, HeartHandshake, FileText, Smartphone, Monitor } from 'lucide-react';
import { TabType } from '../../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onTriggerSOS: () => void;
  onOpenReportModal: () => void;
  pendingMedicineCount: number;
  isMobilePreviewMode: boolean;
  onToggleMobilePreview: () => void;
}

export const SidebarNavigation: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onTriggerSOS,
  onOpenReportModal,
  pendingMedicineCount,
  isMobilePreviewMode,
  onToggleMobilePreview,
}) => {
  const mainNavItems = [
    {
      id: 'home' as TabType,
      label: 'ড্যাশবোর্ড',
      sub: 'আজকের স্বাস্থ্য সারসংক্ষেপ',
      icon: Home,
    },
    {
      id: 'medicines' as TabType,
      label: 'আমার ওষুধ',
      sub: 'দৈনিক ওষুধের তালিকা ও ডোজ',
      icon: Pill,
      badge: pendingMedicineCount > 0 ? `${pendingMedicineCount} বাকি` : undefined,
    },
    {
      id: 'health' as TabType,
      label: 'স্বাস্থ্য ট্র্যাকার',
      sub: 'রক্তচাপ, সুগার ও হার্ট রেট',
      icon: Activity,
    },
    {
      id: 'ai' as TabType,
      label: 'SmartMed AI সহকারী',
      sub: 'বাংলায় ভয়েস ও পরামর্শ',
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'caregiver' as TabType,
      label: 'ফ্যামিলি কেয়ার',
      sub: 'পরিবারের সদস্যদের মনিটর',
      icon: Users,
    },
    {
      id: 'profile' as TabType,
      label: 'প্রোফাইল ও সেটিংস',
      sub: 'অ্যাক্সেসিবিলিটি ও তথ্য',
      icon: User,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200/90 bg-white min-h-screen p-4 justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-serif font-bold text-xl flex items-center justify-center shadow-md shadow-teal-700/20">
            স
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">SmartMed Bangla</h1>
            <p className="text-xs text-slate-500 font-medium">AI স্বাস্থ্য প্ল্যাটফর্ম</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1" aria-label="মূল সাইডবার নেভিগেশন">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-left transition-all group ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    item.highlight
                      ? isActive
                        ? 'bg-teal-600 text-white'
                        : 'bg-teal-100 text-teal-700'
                      : isActive
                      ? 'bg-teal-200/70 text-teal-800'
                      : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium tracking-tight truncate leading-tight">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate mt-0.5 font-normal">
                    {item.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Tools */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <p className="px-3 text-xs font-semibold text-slate-400">দ্রুত অ্যাকশন</p>
          <button
            onClick={onOpenReportModal}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>মেডিকেল রিপোর্ট দেখুন</span>
          </button>
          <button
            onClick={() => onSelectTab('caregiver')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <HeartHandshake className="w-4 h-4 text-indigo-600" />
            <span>আম্মার স্বাস্থ্য মনিটর</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions: SOS + Device View Toggle */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        {/* View Switcher for reviewers */}
        <button
          onClick={onToggleMobilePreview}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/60"
          title="মোবাইল ফ্রেম বনাম সম্পূর্ণ ডেক্সটপ ভিউ টগল করুন"
        >
          <span className="flex items-center gap-2">
            {isMobilePreviewMode ? <Smartphone className="w-4 h-4 text-teal-600" /> : <Monitor className="w-4 h-4 text-teal-600" />}
            <span>{isMobilePreviewMode ? 'মোবাইল ফ্রেম চালু' : 'ডেক্সটপ ভিউ'}</span>
          </span>
          <span className="text-[10px] text-teal-700 font-semibold underline">টগল</span>
        </button>

        {/* Big Emergency SOS Button */}
        <button
          onClick={onTriggerSOS}
          className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-rose-600/20 active:scale-[0.98] transition-all"
        >
          <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
          <span>জরুরি এসওএস (SOS)</span>
        </button>

        <div className="px-2 text-[11px] text-slate-400 text-center">
          জাতীয় জরুরি সেবা: <strong className="text-slate-600">৯৯৯</strong> · স্বাস্থ্য বাতায়ন: <strong className="text-slate-600">১৬২৬৩</strong>
        </div>
      </div>
    </aside>
  );
};
