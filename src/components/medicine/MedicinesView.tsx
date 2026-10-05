import React, { useState } from 'react';
import { Plus, Pill, CheckCircle2, Clock, Filter, AlertCircle, Sparkles } from 'lucide-react';
import { Medicine } from '../../types';
import { MedicineCard } from './MedicineCard';
import { BottomSheet } from '../common/BottomSheet';

interface MedicinesViewProps {
  medicines: Medicine[];
  onMarkTaken: (id: string) => void;
  onSkip: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenPrescriptionScan: () => void;
  largeText: boolean;
}

export const MedicinesView: React.FC<MedicinesViewProps> = ({
  medicines,
  onMarkTaken,
  onSkip,
  onOpenAddModal,
  onOpenPrescriptionScan,
  largeText,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'taken'>('all');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const totalDoses = medicines.length;
  const takenCount = medicines.filter((m) => m.status === 'taken').length;
  const pendingCount = medicines.filter((m) => m.status === 'upcoming').length;
  const adherencePercent = totalDoses > 0 ? Math.round((takenCount / totalDoses) * 100) : 0;

  const filteredMedicines = medicines.filter((m) => {
    if (filter === 'upcoming') return m.status === 'upcoming';
    if (filter === 'taken') return m.status === 'taken';
    return true;
  });

  return (
    <div className="space-y-5 pb-24 max-w-3xl mx-auto">
      {/* Top Header & Add action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">আমার ওষুধ</h2>
          <p className="text-xs text-slate-500 mt-0.5">দৈনিক সময়সূচি ও প্রেসক্রিপশন অনুযায়ী ডোজ</p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="min-h-[44px] px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ ওষুধ যোগ করুন</span>
        </button>
      </div>

      {/* Top Summary Dashboard Card */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            আজকের ডোজ সারসংক্ষেপ
          </span>
          <span className="text-xs font-bold text-teal-700 font-mono">
            {adherencePercent}% সম্পন্ন
          </span>
        </div>

        {/* 3 Metrics: আজ ৪টি dose, ৩টি সম্পন্ন, ১টি বাকি */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium block">আজকের মোট</span>
            <span className="font-bold text-slate-900 text-lg mt-0.5 block font-mono">
              {totalDoses}টি dose
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[11px] text-emerald-800 font-medium block">সফলভাবে খাওয়া</span>
            <span className="font-bold text-emerald-700 text-lg mt-0.5 block font-mono">
              {takenCount}টি সম্পন্ন
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="text-[11px] text-amber-800 font-medium block">পরবর্তী সময়</span>
            <span className="font-bold text-amber-700 text-lg mt-0.5 block font-mono">
              {pendingCount}টি বাকি
            </span>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${adherencePercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Filter Buttons (Functional Tabs) */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`min-h-[38px] px-3.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সব ({totalDoses})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`min-h-[38px] px-3.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'upcoming'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            আসন্ন ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('taken')}
            className={`min-h-[38px] px-3.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'taken'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            সম্পন্ন ({takenCount})
          </button>
        </div>

        <button
          onClick={onOpenPrescriptionScan}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-teal-50 border border-teal-200/60"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>স্ক্যান করুন</span>
        </button>
      </div>

      {/* Medicine Cards List */}
      <div className="space-y-3">
        {filteredMedicines.map((medicine) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            onMarkTaken={onMarkTaken}
            onSkip={onSkip}
            onSelect={(med) => setSelectedMedicine(med)}
            largeText={largeText}
          />
        ))}

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 text-slate-400">
            <Pill className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
            <p className="text-sm font-semibold text-slate-700">এই ফিল্টারে কোনো ওষুধ নেই</p>
            <p className="text-xs text-slate-400 mt-1">সব ওষুধ দেখতে "সব" ট্যাবে চাপুন</p>
          </div>
        )}
      </div>

      {/* Floating Add Medicine Button for Mobile */}
      <div className="fixed bottom-20 right-4 md:hidden z-30">
        <button
          onClick={onOpenAddModal}
          className="min-h-[50px] px-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-700/30 active:scale-95 transition-all"
          aria-label="নতুন ওষুধ যোগ করুন"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>+ ওষুধ যোগ করুন</span>
        </button>
      </div>

      {/* Selected Medicine Details BottomSheet */}
      {selectedMedicine && (
        <BottomSheet
          isOpen={!!selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          title={selectedMedicine.name}
          subtitle={`জেনেরিক: ${selectedMedicine.genericName}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">নির্ধারিত ডোজ:</span>
                <span className="text-sm font-bold text-slate-900">{selectedMedicine.dosage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">সময়:</span>
                <span className="text-sm font-mono font-bold text-teal-800">
                  {selectedMedicine.timeBangla} ({selectedMedicine.time})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">খাওয়ার নিয়ম:</span>
                <span className="text-sm font-semibold text-slate-800">
                  {selectedMedicine.mealTimingBangla}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">কতদিন চলবে:</span>
                <span className="text-sm font-semibold text-slate-800">{selectedMedicine.duration}</span>
              </div>
            </div>

            {selectedMedicine.notes && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-800 block mb-1">ডাক্তারের বিশেষ পরামর্শ:</span>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedMedicine.notes}</p>
              </div>
            )}

            <div className="pt-2 flex items-center gap-2">
              {selectedMedicine.status === 'upcoming' ? (
                <button
                  type="button"
                  onClick={() => {
                    onMarkTaken(selectedMedicine.id);
                    setSelectedMedicine(null);
                  }}
                  className="flex-1 min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>এখনই ওষুধ নিয়েছি চিহ্নিত করুন</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedMedicine(null)}
                  className="w-full min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  বন্ধ করুন
                </button>
              )}
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};
