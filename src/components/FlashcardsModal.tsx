import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Volume2, Sparkles, X } from 'lucide-react';
import { STUDY_FLASHCARDS } from '../data/studyData';
import { soundManager, speak } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const current = STUDY_FLASHCARDS[currentIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    soundManager.playPop();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % STUDY_FLASHCARDS.length);
    soundManager.playWhoosh();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + STUDY_FLASHCARDS.length) % STUDY_FLASHCARDS.length);
    soundManager.playWhoosh();
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped) {
      speak(`${current.back}. ${current.backNote || ''}`);
    } else {
      speak(`${current.front}. ${current.frontSub || ''}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in no-print">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-4 border-amber-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🃏</span>
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Super Flashcard Review Drill
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                Card {currentIndex + 1} of {STUDY_FLASHCARDS.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pill */}
        <div className="text-center mb-4">
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
            {current.category}
          </span>
        </div>

        {/* Interactive 3D Flip Card */}
        <div
          onClick={handleFlip}
          className="min-h-[220px] rounded-2xl p-6 sm:p-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 shadow-md cursor-pointer flex flex-col items-center justify-center text-center transition-all hover:shadow-lg relative select-none"
        >
          <button
            type="button"
            onClick={handleSpeak}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-2xs border border-slate-200 transition-colors"
            title="Read aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {!isFlipped ? (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">
                Question / Prompt
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-snug">
                {current.front}
              </div>
              {current.frontSub && (
                <p className="text-xs font-semibold text-slate-500">
                  {current.frontSub}
                </p>
              )}
              <div className="text-xs text-amber-600 font-bold mt-4 flex items-center justify-center gap-1.5 opacity-80">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap card to reveal answer</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <span className="text-xs uppercase tracking-widest text-emerald-600 font-bold block">
                Answer & Key Rule
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-900 font-heading leading-snug whitespace-pre-line">
                {current.back}
              </div>
              {current.backNote && (
                <p className="text-xs font-medium text-slate-600 max-w-sm mt-2 leading-relaxed">
                  {current.backNote}
                </p>
              )}
              <div className="text-xs text-slate-400 font-bold mt-4 flex items-center justify-center gap-1.5 opacity-80">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip back</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleFlip}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Flip</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
