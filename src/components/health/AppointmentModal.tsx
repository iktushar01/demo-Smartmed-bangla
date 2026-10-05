import React from 'react';
import { Calendar, Clock, MapPin, Phone, UserCheck, Stethoscope, ChevronRight, X, AlertCircle } from 'lucide-react';
import { Appointment } from '../../types';
import { BottomSheet } from '../common/BottomSheet';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onToast: (title: string, desc: string) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onToast,
}) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="ডাক্তারের অ্যাপয়েন্টমেন্ট বিবরণ"
      subtitle="পরবর্তী ফলো-আপ ও চেম্বার শিডিউল"
    >
      <div className="space-y-4">
        {/* Doctor Identity Header */}
        <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base">{appointment.doctorNameBangla}</h3>
              <span className="text-[11px] font-mono text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-full font-semibold">
                {appointment.doctorName}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">{appointment.specialtyBangla}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{appointment.hospitalBangla}</span>
            </p>
          </div>
        </div>

        {/* Time and Serial Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-400 block font-medium">তারিখ ও সময়</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>{appointment.date}</span>
            </div>
            <span className="text-xs text-teal-700 font-semibold block mt-0.5">{appointment.time}</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-400 block font-medium">সিরিয়াল নম্বর</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <UserCheck className="w-4 h-4 text-teal-600" />
              <span className="font-mono text-base">{appointment.serialNo}</span>
            </div>
            <span className="text-xs text-slate-500 block mt-0.5">চেম্বার ৩ (লিফট ৪)</span>
          </div>
        </div>

        {/* Preparation guidelines */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-1.5 text-slate-700">
          <p className="font-bold text-slate-900">পরামর্শের প্রস্তুতি:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>পূর্ববর্তী প্রেসক্রিপশন ও ব্লাড টেস্ট রিপোর্ট সাথে রাখুন।</li>
            <li>নির্দিষ্ট সময়ের অন্তত ১৫ মিনিট পূর্বে উপস্থিত থাকুন।</li>
            <li>গত ৭ দিনের ব্লাড প্রেশার ও সুগারের রেকর্ড ফোনে সংরক্ষিত আছে।</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onToast('কল সংযোগ করা হচ্ছে', `${appointment.hospitalBangla}-এর চেম্বারে কল দেওয়া হচ্ছে: ${appointment.phone}`);
            }}
            className="w-full min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>চেম্বারে কল দিন ({appointment.phone})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onToast('ক্যালেন্ডারে সংরক্ষিত', '১২ অক্টোবর ডা. রহমানের অ্যাপয়েন্টমেন্ট রিমাইন্ডার সেট করা হয়েছে।');
              onClose();
            }}
            className="w-full min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>ক্যালেন্ডার রিমাইন্ডার সেট করুন</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
