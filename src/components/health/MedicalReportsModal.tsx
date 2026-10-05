import React, { useState } from 'react';
import { FileText, Sparkles, Upload, Check, AlertCircle, ShieldAlert, ArrowRight, Download, Calendar } from 'lucide-react';
import { MedicalReport } from '../../types';
import { sampleReport } from '../../data/mockData';
import { BottomSheet } from '../common/BottomSheet';

interface MedicalReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicalReportsModal: React.FC<MedicalReportsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [report, setReport] = useState<MedicalReport>(sampleReport);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeWithAi = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAiAnalysis(true);
    }, 1500);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Medical Reports (মেডিকেল রিপোর্ট)"
      subtitle="ল্যাব রিপোর্ট আপলোড করুন এবং বাংলায় সহজ ভাষায় বুঝে নিন"
    >
      <div className="space-y-4">
        {/* Upload Card */}
        <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center hover:border-teal-300 transition-colors">
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-slate-800">রিপোর্ট আপলোড করুন</p>
          <p className="text-xs text-slate-500 mt-0.5">সমর্থিত ফরম্যাট: PDF / JPG / PNG (সর্বোচ্চ ১০ এমবি)</p>
          <button
            type="button"
            className="mt-3 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors"
          >
            ফাইল বাছাই করুন
          </button>
        </div>

        {/* Existing Sample Report Card */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{report.titleBangla}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{report.labName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
              {report.fileType}
            </span>
          </div>

          {/* AI Analysis trigger button */}
          {!showAiAnalysis && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                AI দিয়ে রিপোর্টের মূল বিষয়গুলো জানুন
              </span>
              <button
                type="button"
                onClick={handleAnalyzeWithAi}
                disabled={isAnalyzing}
                className="min-h-[44px] px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'বিশ্লেষণ চলছে…' : 'AI দিয়ে বুঝুন'}</span>
              </button>
            </div>
          )}
        </div>

        {/* AI Analyzed Report View */}
        {showAiAnalysis && (
          <div className="p-4 rounded-3xl border border-teal-200 bg-teal-50/40 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>সহজ ভাষায় রিপোর্ট (AI সারসংক্ষেপ)</span>
              </div>
              <span className="text-[11px] text-teal-800 font-medium bg-teal-100/70 px-2 py-0.5 rounded-full">
                স্মার্ট বিশ্লেষণ
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-2xl border border-teal-100">
              {report.summary}
            </p>

            {/* Test parameters breakdown */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800 px-1">পরীক্ষার উপাদানসমূহ:</p>
              {report.parameters.map((param, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{param.name}</span>
                      <span className="text-xs text-slate-400 font-mono ml-1.5">({param.range})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold font-mono text-sm text-slate-800">
                        {param.value} {param.unit}
                      </span>
                      {param.status === 'normal' && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          স্বাভাবিক
                        </span>
                      )}
                      {param.status === 'low' && (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          কম
                        </span>
                      )}
                      {param.status === 'high' && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                          বেশি
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {param.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* Crucial Medical Disclaimer */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold">সতর্কতামূলক নির্দেশনা:</p>
                <p className="mt-0.5 text-amber-800 font-medium">
                  এই AI summary শুধুমাত্র তথ্য বোঝার জন্য। এটি medical diagnosis নয়। যেকোনো ওষুধ বা চিকিৎসার পরিবর্তনের পূর্বে আপনার চিকিৎসকের পরামর্শ নিন।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
