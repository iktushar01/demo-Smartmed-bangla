import React, { useState } from 'react';
import { AlertOctagon, Phone, MapPin, FileHeart, X, ShieldAlert, CheckCircle2, Siren, Share2, AlertTriangle } from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (title: string, desc: string) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [step, setStep] = useState<'confirm' | 'active'>('confirm');

  if (!isOpen) return null;

  const handleConfirmEmergency = () => {
    setStep('active');
    onToast('জরুরি অ্যালার্ট সক্রিয় হয়েছে', 'আপনার বিশ্বস্ত কন্টাক্ট এবং মেডিকেল প্রোফাইল সক্রিয় করা হয়েছে।');
  };

  const handleCallRahim = () => {
    onToast('কল সংযোগ করা হচ্ছে', 'Rahim (ভাই)-এর নম্বরে (+880 1711-234567) জরুরি কল যাচ্ছে…');
  };

  const handleCall999 = () => {
    onToast('৯৯৯-এ জরুরি সংযোগ', 'বাংলাদেশ জাতীয় জরুরি সেবা ৯৯৯-এ কল করা হচ্ছে…');
  };

  const handleShareLocation = () => {
    onToast('লাইভ লোকেশন পাঠানো হয়েছে', 'আপনার সঠিক জিপিএস লোকেশন (ধানমন্ডি, ঢাকা) জরুরি কন্টাক্টকে এসএমএস করা হয়েছে।');
  };

  const handleSendMedicalProfile = () => {
    onToast('মেডিকেল প্রোফাইল শেয়ারড', 'ব্লাড গ্রুপ B+, পেনিসিলিন অ্যালার্জি ও হাইপারটেনশনের তথ্য পাঠানো হয়েছে।');
  };

  const handleCancelEmergency = () => {
    setStep('confirm');
    onClose();
    onToast('জরুরি অবস্থা সমাপ্ত', 'ইমার্জেন্সি মোড নিষ্ক্রিয় করা হয়েছে।');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Step 1: Confirmation Dialog */}
      {step === 'confirm' && (
        <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-rose-200 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
            <AlertOctagon className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              আপনি কি জরুরি সাহায্য চান?
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              এটি চালু করলে আপনার বিশ্বস্ত অভিভাবক (Rahim - ভাই)-এর ফোনে লাইভ লোকেশন ও মেডিকেল কার্ড অ্যালার্ট চলে যাবে।
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirmEmergency}
              className="w-full min-h-[48px] rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
            >
              <Siren className="w-5 h-5 text-white animate-bounce" />
              <span>হ্যাঁ, সাহায্য চাই</span>
            </button>

            <button
              onClick={onClose}
              className="w-full min-h-[44px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Cancel (বাতিল)
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Full Screen Emergency Active Mode */}
      {step === 'active' && (
        <div className="fixed inset-0 bg-gradient-to-b from-rose-950 via-slate-950 to-slate-950 text-white p-5 flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between max-w-md w-full mx-auto pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                লাইভ ইমার্জেন্সি সংকেত
              </span>
            </div>

            <button
              onClick={handleCancelEmergency}
              className="text-xs font-bold text-slate-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"
            >
              Cancel Emergency
            </button>
          </div>

          {/* Central Siren Alert */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto text-center py-6">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl animate-sos-radar text-4xl">
                🚨
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-1">
              Emergency Mode Active
            </h2>
            <p className="text-xs text-rose-200 font-medium">
              জরুরি সহায়তা মোড চালু রয়েছে। দ্রুত যোগাযোগ সম্পন্ন করুন।
            </p>

            {/* Trusted Contact Card */}
            <div className="mt-6 w-full p-4 rounded-3xl bg-slate-900/90 border border-rose-500/40 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                    বিশ্বস্ত কন্টাক্ট (Trusted Contact)
                  </span>
                  <p className="text-base font-bold text-white">Rahim — Brother (ভাই)</p>
                  <span className="text-xs text-slate-400 font-mono">+880 1711-234567</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>

              <button
                onClick={handleCallRahim}
                className="w-full min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Contact</span>
              </button>
            </div>

            {/* Emergency Action Buttons */}
            <div className="mt-4 w-full grid grid-cols-2 gap-3">
              <button
                onClick={handleShareLocation}
                className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-5 h-5 text-rose-400" />
                <span>Share Location</span>
              </button>

              <button
                onClick={handleSendMedicalProfile}
                className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-white text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <FileHeart className="w-5 h-5 text-teal-400" />
                <span>Send Medical Profile</span>
              </button>
            </div>

            {/* National Emergency Numbers */}
            <div className="mt-5 w-full p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-between text-xs">
              <div className="text-left">
                <span className="font-bold text-white block">জাতীয় জরুরি সেবা (৯৯৯)</span>
                <span className="text-slate-400 text-[11px]">পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস</span>
              </div>
              <button
                onClick={handleCall999}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>৯৯৯ কল দিন</span>
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="max-w-md w-full mx-auto pt-2 text-center">
            <button
              onClick={handleCancelEmergency}
              className="text-xs text-slate-400 hover:text-white underline decoration-slate-600"
            >
              জরুরি অবস্থা প্রত্যাহার করুন (Cancel Emergency)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
