import React from 'react';
import { Home, Pill, Activity, Sparkles, User, AlertCircle } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onTriggerSOS: () => void;
  pendingMedicineCount: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  onTriggerSOS,
  pendingMedicineCount,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'হোম',
      icon: Home,
    },
    {
      id: 'medicines' as TabType,
      label: 'ওষুধ',
      icon: Pill,
      badge: pendingMedicineCount > 0 ? pendingMedicineCount : undefined,
    },
    {
      id: 'health' as TabType,
      label: 'স্বাস্থ্য',
      icon: Activity,
    },
    {
      id: 'ai' as TabType,
      label: 'AI সহকারী',
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'profile' as TabType,
      label: 'প্রোফাইল',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative min-h-[44px] flex flex-col items-center justify-center py-1 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl ${
                isActive ? 'text-teal-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Highlight icon container for AI Assistant */}
              <div
                className={`relative flex items-center justify-center transition-transform duration-200 ${
                  tab.highlight
                    ? isActive
                      ? 'w-10 h-7 rounded-full bg-teal-600 text-white shadow-sm'
                      : 'w-10 h-7 rounded-full bg-teal-50 text-teal-700'
                    : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-active:scale-90 ${
                    isActive && !tab.highlight ? 'stroke-[2.5px] text-teal-700' : 'stroke-[1.8px]'
                  }`}
                />

                {/* Badge indicator */}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[10px] font-bold ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] tracking-tight mt-0.5 whitespace-nowrap transition-colors ${
                  isActive ? 'font-bold text-teal-800' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>

              {/* Subtle active dot */}
              {isActive && !tab.highlight && (
                <span className="w-1 h-1 rounded-full bg-teal-700 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
