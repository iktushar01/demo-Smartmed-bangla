import React, { useState } from 'react';
import { Activity, Heart, Droplets, Scale, TrendingUp, TrendingDown, Minus, Sparkles, Plus, ChevronRight, FileText, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { HealthMetric } from '../../types';
import { initialHealthMetrics } from '../../data/mockData';
import { BottomSheet } from '../common/BottomSheet';

interface HealthOverviewProps {
  onOpenReportModal: () => void;
  onOpenAppointmentModal: () => void;
  onOpenAiAssistant: () => void;
  onToast: (title: string, desc: string) => void;
  largeText: boolean;
}

export const HealthOverview: React.FC<HealthOverviewProps> = ({
  onOpenReportModal,
  onOpenAppointmentModal,
  onOpenAiAssistant,
  onToast,
  largeText,
}) => {
  const [metrics, setMetrics] = useState<HealthMetric[]>(initialHealthMetrics);
  const [selectedMetricId, setSelectedMetricId] = useState<string>('bp');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // New Record Form
  const [recordType, setRecordType] = useState<'bp' | 'glucose' | 'hr' | 'weight'>('bp');
  const [recordVal1, setRecordVal1] = useState('126');
  const [recordVal2, setRecordVal2] = useState('80');

  const selectedMetric = metrics.find((m) => m.id === selectedMetricId) || metrics[0];

  const handleSaveReading = (e: React.FormEvent) => {
    e.preventDefault();
    let displayVal = `${recordVal1}/${recordVal2}`;
    if (recordType !== 'bp') {
      displayVal = recordVal1;
    }

    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id === recordType) {
          return {
            ...m,
            value: displayVal,
            trendText: 'আজ নতুন পরিমাপ যোগ করা হয়েছে',
            history: [
              ...m.history.slice(1),
              { day: 'আজ', value: parseInt(recordVal1, 10) || 120, label: displayVal },
            ],
          };
        }
        return m;
      })
    );

    setIsRecordModalOpen(false);
    onToast('পরিমাপ সফলভাবে সংরক্ষিত', `${selectedMetric.nameBangla}: ${displayVal} ${selectedMetric.unit}`);
  };

  return (
    <div className="space-y-5 pb-8 max-w-3xl mx-auto">
      {/* Title & Quick Add Record button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">আমার স্বাস্থ্য</h2>
          <p className="text-xs text-slate-500 mt-0.5">রক্তচাপ, ডায়াবেটিস ও নিয়মিত স্বাস্থ্য সূচক</p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="min-h-[44px] px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>পরিমাপ রেকর্ড</span>
        </button>
      </div>

      {/* AI Health Insight Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-teal-800 to-teal-950 text-white shadow-md shadow-teal-950/15">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600/60 flex items-center justify-center text-teal-200">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                AI Health Insight
              </span>
              <p className="text-xs text-teal-100/80">স্মার্ট বিশ্লেষণ</p>
            </div>
          </div>
          <button
            onClick={onOpenAiAssistant}
            className="text-xs font-semibold text-teal-200 hover:text-white underline decoration-teal-400/60"
          >
            পরামর্শ নিন
          </button>
        </div>

        <p className="text-sm font-medium leading-relaxed mt-3 text-teal-50">
          “গত ৭ দিনে আপনার blood pressure বেশিরভাগ সময় stable ছিল। সকালের পরিমাপে কোনো অস্বাভাবিকতা পাওয়া যায়নি।”
        </p>

        <div className="mt-3.5 pt-3 border-t border-teal-700/50 flex items-center justify-between text-xs text-teal-200">
          <span>পরবর্তী রক্তচাপ রেকর্ড: আগামীকাল সকাল ৮:০০</span>
          <button
            onClick={onOpenReportModal}
            className="font-bold text-white hover:text-teal-200 flex items-center gap-1"
          >
            <span>সব তথ্য দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Health Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const isSelected = metric.id === selectedMetricId;

          const getIcon = () => {
            switch (metric.id) {
              case 'bp':
                return <Activity className="w-4 h-4 text-teal-600" />;
              case 'hr':
                return <Heart className="w-4 h-4 text-rose-600" />;
              case 'glucose':
                return <Droplets className="w-4 h-4 text-amber-600" />;
              default:
                return <Scale className="w-4 h-4 text-indigo-600" />;
            }
          };

          return (
            <button
              key={metric.id}
              type="button"
              onClick={() => setSelectedMetricId(metric.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-teal-600 bg-white ring-2 ring-teal-600/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{metric.nameBangla}</span>
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                  {getIcon()}
                </div>
              </div>

              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="font-bold font-mono text-xl text-slate-900 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-medium text-slate-400">{metric.unit}</span>
              </div>

              {/* Zero-Pill Unboxed Trend Text */}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500 truncate">
                {metric.trend === 'up' && <TrendingUp className="w-3 h-3 text-rose-500 shrink-0" />}
                {metric.trend === 'down' && <TrendingDown className="w-3 h-3 text-emerald-500 shrink-0" />}
                {metric.trend === 'stable' && <Minus className="w-3 h-3 text-teal-500 shrink-0" />}
                <span className="truncate">{metric.trendText}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Metric Weekly Trend Chart */}
      <div className="p-4 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {selectedMetric.nameBangla} ({selectedMetric.name}) সাপ্তাহিক গ্রাফ
            </h4>
            <span className="text-xs text-slate-400">সর্বশেষ ৭ দিনের পরিমাপের ধারা</span>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl">
            {selectedMetric.statusBangla}
          </span>
        </div>

        {/* Clean SVG Trend Line & Bars */}
        <div className="h-44 w-full pt-4">
          <div className="h-32 flex items-end justify-between gap-2 px-2 border-b border-slate-100">
            {selectedMetric.history.map((pt, idx) => {
              const maxVal = Math.max(...selectedMetric.history.map((h) => h.value));
              const minVal = Math.min(...selectedMetric.history.map((h) => h.value)) * 0.8;
              const range = maxVal - minVal || 1;
              const heightPercent = Math.min(100, Math.max(25, ((pt.value - minVal) / range) * 90));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {pt.value}
                  </span>
                  <div
                    className="w-full max-w-[28px] rounded-t-lg bg-teal-500/80 group-hover:bg-teal-600 transition-all cursor-pointer relative"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-700 ring-2 ring-white" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 mt-1">
                    {pt.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>স্বাভাবিক রেঞ্জ: {selectedMetric.id === 'bp' ? '১২০/৮০ - ১৩০/৮৫' : selectedMetric.id === 'glucose' ? '৪.০ - ৬.০ mmol/L' : '৬০ - ১০০ BPM'}</span>
          <span className="font-semibold text-teal-700">নিয়মিত ট্র্যাকিং সক্রিয়</span>
        </div>
      </div>

      {/* Health Timeline */}
      <div className="p-4 rounded-3xl border border-slate-200 bg-white shadow-xs space-y-3">
        <h4 className="font-bold text-slate-900 text-sm">স্বাস্থ্য টাইমলাইন (Health Timeline)</h4>

        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {/* Today Group */}
          <div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md ml-7">
              আজ (Today)
            </span>
            <div className="space-y-3 mt-2 ml-7">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white -ml-[23px] mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    সকালের ৩টি ওষুধ সময়মতো নেওয়া হয়েছে
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">সকাল ৯:১৫ · Napa & Vit D3</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white -ml-[23px] mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    রক্তচাপ পরিমাপ রেকর্ড: ১২৮/৮২ mmHg
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">দুপুর ১২:০০ · স্বাভাবিক</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yesterday Group */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md ml-7">
              গতকাল (Yesterday)
            </span>
            <div className="space-y-3 mt-2 ml-7">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white -ml-[23px] mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    ডা. মিজানুর রহমানের ফলো-আপ অ্যাপয়েন্টমেন্ট কনফার্ম
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">১২ অক্টোবর চেম্বার নির্ধারিত</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white -ml-[23px] mt-1 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    ব্লাড টেস্ট রিপোর্ট আপলোড ও এআই বিশ্লেষণ সম্পন্ন
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">ল্যাবএইড ডায়াগনস্টিক রিপোর্ট</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Reading BottomSheet Modal */}
      <BottomSheet
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        title="নতুন স্বাস্থ্য পরিমাপ যোগ করুন"
        subtitle="আজকের ব্লাড প্রেশার, সুগার বা হার্ট রেট রেকর্ড করুন"
      >
        <form onSubmit={handleSaveReading} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              পরিমাপের ধরন (Metric Type)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRecordType('bp')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left ${
                  recordType === 'bp' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200'
                }`}
              >
                রক্তচাপ (BP)
              </button>
              <button
                type="button"
                onClick={() => setRecordType('glucose')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left ${
                  recordType === 'glucose' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200'
                }`}
              >
                ব্লাড সুগার (Glucose)
              </button>
              <button
                type="button"
                onClick={() => setRecordType('hr')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left ${
                  recordType === 'hr' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200'
                }`}
              >
                হার্ট রেট (BPM)
              </button>
              <button
                type="button"
                onClick={() => setRecordType('weight')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left ${
                  recordType === 'weight' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200'
                }`}
              >
                ওজন (Weight kg)
              </button>
            </div>
          </div>

          {recordType === 'bp' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Systolic (উপরের মান)
                </label>
                <input
                  type="number"
                  value={recordVal1}
                  onChange={(e) => setRecordVal1(e.target.value)}
                  placeholder="120"
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 font-mono text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Diastolic (নিচের মান)
                </label>
                <input
                  type="number"
                  value={recordVal2}
                  onChange={(e) => setRecordVal2(e.target.value)}
                  placeholder="80"
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 font-mono text-base"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                পরিমাপের মান
              </label>
              <input
                type="text"
                value={recordVal1}
                onChange={(e) => setRecordVal1(e.target.value)}
                placeholder="যেমন: 5.6 অথবা 75"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 font-mono text-base"
                required
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              রেকর্ড সেভ করুন
            </button>
          </div>
        </form>
      </BottomSheet>
    </div>
  );
};
