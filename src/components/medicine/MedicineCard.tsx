import React from 'react';
import { Pill, Check, Clock, AlertCircle, Sparkles, ChevronRight, MoreVertical } from 'lucide-react';
import { Medicine } from '../../types';

interface MedicineCardProps {
  medicine: Medicine;
  onMarkTaken: (id: string) => void;
  onSkip: (id: string) => void;
  onSelect: (medicine: Medicine) => void;
  largeText: boolean;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onMarkTaken,
  onSkip,
  onSelect,
  largeText,
}) => {
  const isTaken = medicine.status === 'taken';
  const isSkipped = medicine.status === 'skipped';
  const isUpcoming = medicine.status === 'upcoming';

  const getCategoryStyles = () => {
    switch (medicine.category) {
      case 'fever':
        return {
          iconBg: 'bg-rose-50 text-rose-600',
          accent: 'border-l-4 border-l-rose-500',
        };
      case 'gastric':
        return {
          iconBg: 'bg-amber-50 text-amber-600',
          accent: 'border-l-4 border-l-amber-500',
        };
      case 'vitamin':
        return {
          iconBg: 'bg-emerald-50 text-emerald-600',
          accent: 'border-l-4 border-l-emerald-500',
        };
      case 'diabetes':
        return {
          iconBg: 'bg-indigo-50 text-indigo-600',
          accent: 'border-l-4 border-l-indigo-500',
        };
      default:
        return {
          iconBg: 'bg-teal-50 text-teal-600',
          accent: 'border-l-4 border-l-teal-500',
        };
    }
  };

  const catStyle = getCategoryStyles();

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white p-4 shadow-xs hover:shadow-sm ${
        isTaken
          ? 'border-emerald-200/90 bg-emerald-50/20'
          : isSkipped
          ? 'border-slate-200 opacity-60 bg-slate-50/50'
          : 'border-slate-200/90'
      } ${catStyle.accent}`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Icon & Details */}
        <div className="flex items-start gap-3 flex-1 min-w-0" onClick={() => onSelect(medicine)}>
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer ${
              isTaken ? 'bg-emerald-100 text-emerald-700' : catStyle.iconBg
            }`}
          >
            {isTaken ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Pill className="w-5 h-5" />}
          </div>

          <div className="flex-1 min-w-0 cursor-pointer">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h4 className="font-bold text-slate-900 text-base tracking-tight truncate leading-tight">
                {medicine.name}
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {medicine.genericName}
              </span>
            </div>

            {/* Zero-Pill Unboxed Metadata with typographic separators */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 mt-1 leading-normal">
              <span className="font-semibold text-slate-700">{medicine.dosage}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-teal-700 font-medium">{medicine.mealTimingBangla}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1 font-mono text-slate-600">
                <Clock className="w-3 h-3 text-slate-400" />
                {medicine.timeBangla}
              </span>
            </div>

            {/* Notes if available */}
            {medicine.notes && (
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-1">
                {medicine.notes}
              </p>
            )}
          </div>
        </div>

        {/* Right: Status Label */}
        <div className="shrink-0 text-right">
          {isTaken && (
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>নেওয়া হয়েছে ✓</span>
            </div>
          )}
          {isUpcoming && (
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-700">
              <Clock className="w-3.5 h-3.5" />
              <span>আসন্ন</span>
            </div>
          )}
          {isSkipped && (
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>বাদ দেওয়া</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Accessible >=44px hitboxes */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(medicine)}
          className="text-xs font-medium text-slate-600 hover:text-teal-700 flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <span>বিস্তারিত</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center gap-2">
          {isUpcoming && (
            <>
              <button
                onClick={() => onSkip(medicine.id)}
                className="min-h-[44px] px-3.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors active:scale-95"
              >
                Skip
              </button>
              <button
                onClick={() => onMarkTaken(medicine.id)}
                className="min-h-[44px] px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-1.5 shadow-sm shadow-teal-700/20 active:scale-95 transition-all"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>নিয়েছি</span>
              </button>
            </>
          )}

          {isTaken && (
            <span className="text-xs text-slate-400 font-mono">
              সময়: {medicine.takenAt || medicine.timeBangla}
            </span>
          )}

          {isSkipped && (
            <button
              onClick={() => onMarkTaken(medicine.id)}
              className="min-h-[44px] px-3 rounded-xl text-xs font-medium text-teal-700 hover:bg-teal-50 transition-colors"
            >
              পুনরায় নিন
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
