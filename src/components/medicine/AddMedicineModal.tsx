import React, { useState } from 'react';
import { Camera, FileUp, Sparkles, Plus, Check, Clock, AlertCircle, RefreshCw, X } from 'lucide-react';
import { Medicine } from '../../types';
import { BottomSheet } from '../common/BottomSheet';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedicine: (newMed: Medicine) => void;
  onAddMultipleMedicines: (meds: Medicine[]) => void;
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
  isOpen,
  onClose,
  onAddMedicine,
  onAddMultipleMedicines,
}) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'scan'>('manual');

  // Manual Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('১ ট্যাবলেট');
  const [frequency, setFrequency] = useState('প্রতিদিন ১ বার');
  const [time, setTime] = useState('8:00 PM');
  const [timeBangla, setTimeBangla] = useState('রাত ৮:০০');
  const [mealTiming, setMealTiming] = useState<'before_meal' | 'after_meal' | 'with_meal'>('after_meal');
  const [duration, setDuration] = useState('৭ দিন');
  const [notes, setNotes] = useState('');

  // Scanning State
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'initial' | 'analyzing' | 'extracted'>('initial');

  const detectedMedicines: Medicine[] = [
    {
      id: `med-scan-1-${Date.now()}`,
      name: 'Napa 500mg',
      genericName: 'Paracetamol',
      dosage: '১ ট্যাবলেট',
      strength: '500mg',
      time: '8:00 PM',
      timeBangla: 'রাত ৮:০০',
      mealTiming: 'after_meal',
      mealTimingBangla: 'খাবারের পরে',
      status: 'upcoming',
      frequency: 'দিনে ৩ বার (ভরা পেটে)',
      duration: '৫ দিন',
      category: 'fever',
      notes: 'জর বা শরীর ব্যথার সময়',
    },
    {
      id: `med-scan-2-${Date.now()}`,
      name: 'Omeprazole 20mg',
      genericName: 'Omeprazole (Seclo)',
      dosage: '১ ক্যাপসুল',
      strength: '20mg',
      time: '9:00 PM',
      timeBangla: 'রাত ৯:০০',
      mealTiming: 'before_meal',
      mealTimingBangla: 'খাবারের ৩০ মিনিট আগে',
      status: 'upcoming',
      frequency: 'সকাল ও রাতে',
      duration: '১৪ দিন',
      category: 'gastric',
      notes: 'গ্যাস্ট্রিক সুরক্ষায়',
    },
    {
      id: `med-scan-3-${Date.now()}`,
      name: 'Vitamin D3 40,000 IU',
      genericName: 'Cholecalciferol',
      dosage: '১ ক্যাপসুল',
      strength: '40,000 IU',
      time: '9:00 AM',
      timeBangla: 'সকাল ৯:০০',
      mealTiming: 'after_meal',
      mealTimingBangla: 'সকালের নাস্তার পর',
      status: 'upcoming',
      frequency: 'সপ্তাহে ১ বার',
      duration: '৮ সপ্তাহ',
      category: 'vitamin',
      notes: 'হাড়ের পুষ্টি ও রোগ প্রতিরোধে',
    },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep('analyzing');

    setTimeout(() => {
      setIsScanning(false);
      setScanStep('extracted');
    }, 2400);
  };

  const handleCreateScheduleFromScan = () => {
    onAddMultipleMedicines(detectedMedicines);
    resetAndClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medicine = {
      id: `med-manual-${Date.now()}`,
      name: name.trim(),
      genericName: 'নির্ধারিত প্রেসক্রিপশন',
      dosage,
      strength: 'স্ট্যান্ডার্ড',
      time,
      timeBangla,
      mealTiming,
      mealTimingBangla:
        mealTiming === 'before_meal'
          ? 'খাবারের আগে'
          : mealTiming === 'after_meal'
          ? 'খাবারের পরে'
          : 'খাবারের সাথে',
      status: 'upcoming',
      frequency,
      duration,
      category: 'other',
      notes,
    };

    onAddMedicine(newMed);
    resetAndClose();
  };

  const resetAndClose = () => {
    setName('');
    setScanStep('initial');
    setIsScanning(false);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={resetAndClose}
      title="ওষুধ যোগ করুন"
      subtitle="নতুন ওষুধের শিডিউল তৈরি বা প্রেসক্রিপশন স্ক্যান করুন"
    >
      {/* Functional Segmented Controls (Buttons, not pills) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'manual'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Plus className="w-4 h-4 text-teal-600" />
          <span>নিজে যোগ করুন</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('scan')}
          className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'scan'
              ? 'bg-white text-teal-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Prescription Scan করুন</span>
        </button>
      </div>

      {/* Option 1: Manual Input */}
      {activeTab === 'manual' && (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              ওষুধের নাম (Medicine Name) *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: Napa 500mg, Seclo 20mg"
              required
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                ডোজ (Dosage)
              </label>
              <select
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 bg-white"
              >
                <option value="১ ট্যাবলেট">১ ট্যাবলেট</option>
                <option value="২ ট্যাবলেট">২ ট্যাবলেট</option>
                <option value="১/২ ট্যাবলেট">১/২ ট্যাবলেট</option>
                <option value="১ ক্যাপসুল">১ ক্যাপসুল</option>
                <option value="১ চামচ (সিরাপ)">১ চামচ (সিরাপ)</option>
                <option value="২ ফোঁটা (ড্রপ)">২ ফোঁটা (ড্রপ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                খাওয়ার নিয়ম (Meal Timing)
              </label>
              <select
                value={mealTiming}
                onChange={(e) => setMealTiming(e.target.value as any)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 bg-white"
              >
                <option value="after_meal">খাবারের পরে</option>
                <option value="before_meal">খাবারের আগে</option>
                <option value="with_meal">খাবারের সাথে</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                সময় (Time)
              </label>
              <select
                value={timeBangla}
                onChange={(e) => {
                  setTimeBangla(e.target.value);
                  if (e.target.value === 'সকাল ৮:০০') setTime('8:00 AM');
                  else if (e.target.value === 'দুপুর ২:০০') setTime('2:00 PM');
                  else if (e.target.value === 'রাত ৮:০০') setTime('8:00 PM');
                  else if (e.target.value === 'রাত ৯:০০') setTime('9:00 PM');
                }}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 bg-white"
              >
                <option value="সকাল ৮:০০">সকাল ৮:০০</option>
                <option value="সকাল ৯:০০">সকাল ৯:০০</option>
                <option value="দুপুর ২:০০">দুপুর ২:০০</option>
                <option value="রাত ৮:০০">রাত ৮:০০</option>
                <option value="রাত ৯:০০">রাত ৯:০০</option>
                <option value="রাত ১০:০০">রাত ১০:০০</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                কতদিন চলবে (Duration)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 bg-white"
              >
                <option value="৩ দিন">৩ দিন</option>
                <option value="৫ দিন">৫ দিন</option>
                <option value="৭ দিন">৭ দিন</option>
                <option value="১৪ দিন">১৪ দিন</option>
                <option value="১ মাস">১ মাস</option>
                <option value="চলমান (নিয়মিত)">চলমান (নিয়মিত)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              বিশেষ নির্দেশনাবলী (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="যেমন: কুসুম গরম পানি দিয়ে খাবেন"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>ওষুধ সেভ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* Option 2: Prescription Scan */}
      {activeTab === 'scan' && (
        <div className="space-y-4">
          {scanStep === 'initial' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-teal-200 rounded-3xl p-5 text-center bg-teal-50/30">
                <div className="relative w-full max-w-xs mx-auto h-40 rounded-2xl overflow-hidden shadow-inner mb-3 border border-slate-200">
                  <img
                    src="/src/assets/images/mock_prescription_doc_1791214968091.jpg"
                    alt="প্রেসক্রিপশন নমুনা"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                    <span className="bg-slate-950/80 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-xs font-medium">
                      ডা. মিজানুর রহমানের প্রেসক্রিপশন
                    </span>
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-800">
                  প্রেসক্রিপশন আপলোড বা ক্যামেরা দিয়ে ছবি তুলুন
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  SmartMed বাংলা AI আপনার প্রেসক্রিপশন থেকে ওষুধের নাম, ডোজ ও নিয়ম স্বয়ংক্রিয়ভাবে আলাদা করবে।
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleStartScan}
                  className="min-h-[48px] rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>ক্যামেরা দিয়ে স্ক্যান</span>
                </button>
                <button
                  type="button"
                  onClick={handleStartScan}
                  className="min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <FileUp className="w-4 h-4 text-slate-600" />
                  <span>ফাইল আপলোড করুন</span>
                </button>
              </div>
            </div>
          )}

          {scanStep === 'analyzing' && (
            <div className="py-8 px-4 text-center space-y-4">
              <div className="relative w-48 h-36 mx-auto rounded-2xl overflow-hidden border border-teal-300 shadow-md">
                <img
                  src="/src/assets/images/mock_prescription_doc_1791214968091.jpg"
                  alt="প্রেসক্রিপশন বিশ্লেষণ"
                  className="w-full h-full object-cover filter blur-[0.5px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 h-1 bg-teal-400 shadow-[0_0_12px_#2dd4bf] animate-scanline" />
                <div className="absolute inset-0 bg-teal-900/20" />
              </div>

              <div>
                <div className="flex items-center justify-center gap-2 text-teal-800 font-bold text-base">
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
                  <span>Prescription বিশ্লেষণ করা হচ্ছে…</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  বাংলা হাতের লেখা ও ওষুধের ব্র্যান্ড যাচাই করা হচ্ছে
                </p>
              </div>
            </div>
          )}

          {scanStep === 'extracted' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>৩টি ওষুধ পাওয়া গেছে</span>
                </div>
                <button
                  type="button"
                  onClick={() => setScanStep('initial')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  পুনরায় স্ক্যান
                </button>
              </div>

              <div className="space-y-2.5">
                {detectedMedicines.map((med, idx) => (
                  <div
                    key={med.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                        <span className="text-[11px] text-teal-700 font-semibold">{med.dosage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>{med.mealTimingBangla}</span>
                        <span aria-hidden="true">·</span>
                        <span>{med.timeBangla}</span>
                        <span aria-hidden="true">·</span>
                        <span>{med.duration}</span>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCreateScheduleFromScan}
                  className="w-full min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Schedule তৈরি করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </BottomSheet>
  );
};
