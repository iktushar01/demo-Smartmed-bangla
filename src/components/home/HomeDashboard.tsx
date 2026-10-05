import React from 'react';
import { Sparkles, Mic, Activity, Heart, Droplets, Calendar, AlertOctagon, ChevronRight, CheckCircle2, Clock, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';
import { Medicine, HealthMetric, Appointment, TabType } from '../../types';
import { MedicineCard } from '../medicine/MedicineCard';

interface HomeDashboardProps {
  medicines: Medicine[];
  metrics: HealthMetric[];
  appointment: Appointment;
  onMarkTaken: (id: string) => void;
  onSkip: (id: string) => void;
  onOpenVoiceMode: () => void;
  onOpenAiAssistant: () => void;
  onOpenEmergency: () => void;
  onOpenAppointment: () => void;
  onOpenAddMedicine: () => void;
  onNavigateTab: (tab: TabType) => void;
  largeText: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  medicines,
  metrics,
  appointment,
  onMarkTaken,
  onSkip,
  onOpenVoiceMode,
  onOpenAiAssistant,
  onOpenEmergency,
  onOpenAppointment,
  onOpenAddMedicine,
  onNavigateTab,
  largeText,
}) => {
  const totalDoses = medicines.length;
  const takenCount = medicines.filter((m) => m.status === 'taken').length;
  const pendingCount = medicines.filter((m) => m.status === 'upcoming').length;

  // Key upcoming / featured medicines
  const upcomingMeds = medicines.filter((m) => m.status === 'upcoming');
  const takenMeds = medicines.filter((m) => m.status === 'taken');

  // Display top 2-3 relevant medicines for dashboard
  const displayMedicines = [...upcomingMeds, ...takenMeds].slice(0, 3);

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Personalized Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
            শুভ সন্ধ্যা, Tushar 👋
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            আজ আপনার স্বাস্থ্য কেমন? SmartMed AI আপনার পাশে আছে।
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('caregiver')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>আম্মার স্বাস্থ্য: স্বাভাবিক</span>
        </button>
      </div>

      {/* 1. Large AI Health Summary Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-900 via-teal-850 to-slate-900 text-white shadow-lg shadow-teal-950/20 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                আজকের AI Health Summary
              </span>
              <p className="text-[11px] text-teal-100/70 font-mono">লাইভ অ্যালগরিদম সারসংক্ষেপ</p>
            </div>
          </div>

          {/* Voice Launcher Mic */}
          <button
            onClick={onOpenVoiceMode}
            className="min-h-[44px] min-w-[44px] rounded-2xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 hover:text-white border border-teal-400/30 flex items-center justify-center transition-colors group"
            title="ভয়েসে শুনুন বা প্রশ্ন করুন"
            aria-label="ভয়েস সহকারী"
          >
            <Mic className="w-5 h-5 text-teal-300 group-hover:scale-110 transition-transform animate-pulse" />
          </button>
        </div>

        <p className="text-sm sm:text-base font-normal leading-relaxed mt-3.5 text-teal-50 relative z-10">
          “আজ আপনার ৪টি ওষুধের মধ্যে ৩টি সময়মতো নেওয়া হয়েছে। রাত ৮টায় আরও ১টি ওষুধ (Napa 500mg) নেওয়ার সময় আছে।”
        </p>

        <div className="mt-4 pt-3.5 border-t border-teal-700/60 flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2 text-xs text-teal-200">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>অ্যাডহেরেন্স স্কোর: ৮৭%</span>
          </div>

          <button
            onClick={onOpenAiAssistant}
            className="min-h-[40px] px-3.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>বিস্তারিত দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Today's Medicine Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h3 className="text-base font-bold tracking-tight text-slate-900">আজকের ওষুধ</h3>
            <span className="text-xs text-slate-400">
              ({takenCount} সম্পন্ন · {pendingCount} বাকি)
            </span>
          </div>

          <button
            onClick={() => onNavigateTab('medicines')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {displayMedicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onMarkTaken={onMarkTaken}
              onSkip={onSkip}
              onSelect={() => onNavigateTab('medicines')}
              largeText={largeText}
            />
          ))}
        </div>
      </div>

      {/* 3. Health Overview Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight text-slate-900">স্বাস্থ্য সূচক (Health Overview)</h3>
          <button
            onClick={() => onNavigateTab('health')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>গ্রাফ দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* BP */}
          <div
            onClick={() => onNavigateTab('health')}
            className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500">ব্লাড প্রেশার</span>
              <Activity className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <p className="font-bold font-mono text-base text-slate-900">128/82</p>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">স্বাভাবিক ✓</span>
          </div>

          {/* Heart Rate */}
          <div
            onClick={() => onNavigateTab('health')}
            className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500">হার্ট রেট</span>
              <Heart className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <p className="font-bold font-mono text-base text-slate-900">76 <span className="text-xs font-normal text-slate-400">BPM</span></p>
            <span className="text-[10px] text-teal-700 font-medium block mt-0.5">স্থিতিশীল</span>
          </div>

          {/* Glucose */}
          <div
            onClick={() => onNavigateTab('health')}
            className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-teal-300 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500">সুগার</span>
              <Droplets className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <p className="font-bold font-mono text-base text-slate-900">5.4 <span className="text-xs font-normal text-slate-400">mmol</span></p>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">আদর্শ মাত্রা</span>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Appointment Card */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
            <Stethoscope className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
              আসন্ন ডাক্তারের অ্যাপয়েন্টমেন্ট
            </span>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">
              {appointment.doctorNameBangla} ({appointment.doctorName})
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              {appointment.specialty} · {appointment.hospital}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-800 font-semibold mt-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{appointment.date}</span>
              <span aria-hidden="true">·</span>
              <span>{appointment.time}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAppointment}
          className="min-h-[44px] px-3.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-800 text-xs font-bold shrink-0 transition-colors flex items-center gap-1"
        >
          <span>Appointment দেখুন</span>
        </button>
      </div>

      {/* 5. Clearly Visible Elegant Red Emergency SOS Card */}
      <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200/90 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-600/30">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-rose-950 text-sm">জরুরি সাহায্য প্রয়োজন?</h4>
            <p className="text-xs text-rose-800/80 mt-0.5">
              অভিভাবক (Rahim) ও ৯৯৯ এ দ্রুত এসওএস বার্তা পাঠান
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEmergency}
          className="min-h-[44px] px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/25 active:scale-95 transition-all shrink-0"
        >
          <span>Emergency SOS</span>
        </button>
      </div>
    </div>
  );
};
