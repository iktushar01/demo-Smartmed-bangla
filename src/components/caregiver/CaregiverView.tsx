import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Clock, AlertTriangle, Phone, Send, Plus, User, ShieldCheck, ChevronRight } from 'lucide-react';
import { FamilyMember } from '../../types';
import { familyCareMember } from '../../data/mockData';
import { BottomSheet } from '../common/BottomSheet';

interface CaregiverViewProps {
  onToast: (title: string, desc: string) => void;
  largeText: boolean;
}

export const CaregiverView: React.FC<CaregiverViewProps> = ({
  onToast,
  largeText,
}) => {
  const [member, setMember] = useState<FamilyMember>(familyCareMember);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('বাবা');

  const handleSendNudge = () => {
    onToast('রিমাইন্ডার পাঠানো হয়েছে', `আম্মার ফোনে নোটিফিকেশন ও এসএমএস পাঠানো হয়েছে: "রাত ৮টায় Napa 500mg খাওয়ার সময় হয়েছে।"`);
  };

  const handleCallMember = () => {
    onToast('কল সংযোগ করা হচ্ছে', `আম্মাকে কল দেওয়া হচ্ছে (${member.phone})`);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    onToast('সদস্য যুক্ত হয়েছে', `${newMemberName} (${newMemberRelation}) সফলভাবে ফ্যামিলি কেয়ারে যুক্ত হয়েছেন।`);
    setIsAddModalOpen(false);
    setNewMemberName('');
  };

  return (
    <div className="space-y-5 pb-8 max-w-3xl mx-auto">
      {/* Title & Add Family Member Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Family Care (পরিবারের যত্ন)</h2>
          <p className="text-xs text-slate-500 mt-0.5">বয়োজ্যেষ্ঠ বা দূরবর্তী পরিবারের স্বাস্থ্য মনিটর করুন</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="min-h-[44px] px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Family Member যোগ করুন</span>
        </button>
      </div>

      {/* Primary Monitored Member Card: Ma */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 font-bold text-lg flex items-center justify-center border border-amber-200 shrink-0">
              মা
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {member.statusBangla} ({member.status})
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                বয়স: {member.age} বছর · সম্পর্ক: {member.relationBangla}
              </p>
            </div>
          </div>

          <button
            onClick={handleCallMember}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center transition-colors border border-emerald-200/80"
            title="কল করুন"
            aria-label="আম্মাকে কল দিন"
          >
            <Phone className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* Adherence and Progress Overview */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100">
            <span className="text-xs text-slate-500 font-medium">ওষুধ খাওয়ার নিয়মনিষ্ঠতা</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-bold font-mono text-2xl text-teal-800">{member.adherenceRate}%</span>
              <span className="text-xs text-teal-600 font-semibold">সফল</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${member.adherenceRate}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <span className="text-xs text-slate-500 font-medium">আজকের ডোজ সম্পন্ন</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-bold font-mono text-2xl text-indigo-900">
                {member.takenDoses} / {member.totalDoses}
              </span>
              <span className="text-xs text-indigo-600 font-medium">নেওয়া হয়েছে</span>
            </div>
            <span className="text-[11px] text-amber-700 font-semibold block mt-1">
              ১টি ডোজ বাকি (রাত ৮:০০)
            </span>
          </div>
        </div>

        {/* Quick Nudge Action for Caregivers */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-teal-600" />
            <span className="text-xs text-slate-700 font-medium">
              আম্মাকে সন্ধ্যার ওষুধ নেওয়ার তাগিদ পাঠাবেন?
            </span>
          </div>
          <button
            onClick={handleSendNudge}
            className="min-h-[44px] px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
          >
            <span>রিমাইন্ডার পাঠান</span>
          </button>
        </div>

        {/* Recent Activity Feed */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900">সাম্প্রতিক কার্যক্রম (Recent Activity)</h4>

          <div className="space-y-2">
            {member.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5">
                  {act.type === 'taken' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  )}
                  {act.type === 'bp' && (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 stroke-[2.5]" />
                  )}
                  {act.type === 'pending' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  )}

                  <span className="text-xs font-medium text-slate-800">
                    {act.title}
                  </span>
                </div>

                <span className="text-[11px] text-slate-400 font-mono shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Family Member Modal */}
      <BottomSheet
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="নতুন Family Member যোগ করুন"
        subtitle="পরিবারের অন্য কারও ওষুধ ও যত্ন ট্র্যাকিং চালু করুন"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              সদস্যের নাম (Full Name) *
            </label>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="যেমন: আব্বা - শামসুল আলম"
              required
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                সম্পর্ক (Relation)
              </label>
              <select
                value={newMemberRelation}
                onChange={(e) => setNewMemberRelation(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-900"
              >
                <option value="বাবা">বাবা (Father)</option>
                <option value="মা">মা (Mother)</option>
                <option value="দাদা/নানা">দাদা / নানা</option>
                <option value="দাদী/নানী">দাদী / নানী</option>
                <option value="স্ত্রী/স্বামী">স্ত্রী / স্বামী</option>
                <option value="সন্তান">সন্তান</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                মোবাইল নম্বর
              </label>
              <input
                type="tel"
                placeholder="+880 17XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              যোগ করুন
            </button>
          </div>
        </form>
      </BottomSheet>
    </div>
  );
};
