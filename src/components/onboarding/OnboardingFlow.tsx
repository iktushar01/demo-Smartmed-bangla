import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { onboardingSlides } from '../../data/mockData';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slide = onboardingSlides[currentSlideIndex];
  const isLast = currentSlideIndex === onboardingSlides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col justify-between max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Top bar with Skip button */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 text-white font-serif font-bold text-sm flex items-center justify-center">
              স
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-tight">SmartMed Bangla</span>
          </div>

          <button
            onClick={onComplete}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-md transition-colors"
          >
            এড়িয়ে যান (Skip)
          </button>
        </div>

        {/* Slide Visual Image */}
        <div className="px-5 pt-2">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-100">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-white/90 text-teal-800 text-[11px] font-bold shadow-xs backdrop-blur-xs">
                {slide.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-6 text-center space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-snug">
            {slide.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
            {slide.subtitle}
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {onboardingSlides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx ? 'w-6 bg-teal-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`স্লাইড ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="p-5 pt-0">
          <button
            onClick={handleNext}
            className="w-full min-h-[50px] rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 active:scale-[0.98] transition-all"
          >
            <span>{isLast ? 'শুরু করুন' : 'পরবর্তী ধাপ'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
