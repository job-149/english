import React, { useState } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

export const TreeAnalogyWidget: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<'work' | 'job' | 'career'>('career');

  const handleSelect = (part: 'work' | 'job' | 'career') => {
    setSelectedPart(part);
    soundManager.playPop();
    const explanation =
      part === 'work'
        ? 'Work is the wood. Any physical or mental effort, like washing dishes or chores.'
        : part === 'job'
        ? 'Job is a single branch. A specific paid role you are hired for, like a pilot or teacher.'
        : 'Career is the entire growing tree. Your lifelong journey of learning, working, and growing.';
    speak(explanation);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌳</span>
          <h4 className="text-lg font-bold text-emerald-900 font-heading">
            Interactive Tree Explorer: Click Any Part!
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
          Touch & Learn
        </span>
      </div>

      {/* Button Switcher */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          type="button"
          onClick={() => handleSelect('work')}
          className={`px-3 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedPart === 'work'
              ? 'bg-amber-700 text-white shadow-md scale-102 ring-2 ring-amber-400'
              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <span>🪵</span>
          <span>1. The Wood (Work)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelect('job')}
          className={`px-3 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedPart === 'job'
              ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-400'
              : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          <span>🌿</span>
          <span>2. A Branch (Job)</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelect('career')}
          className={`px-3 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedPart === 'career'
              ? 'bg-green-700 text-white shadow-md scale-102 ring-2 ring-green-400'
              : 'bg-green-50 text-green-900 hover:bg-green-100 border border-green-200'
          }`}
        >
          <span>🌳</span>
          <span>3. Whole Tree (Career)</span>
        </button>
      </div>

      {/* Visual Tree Stage */}
      <div className="relative bg-gradient-to-b from-sky-50 via-emerald-50/50 to-amber-50/80 rounded-2xl p-6 border border-emerald-100 overflow-hidden flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
          {/* Canopy / Entire Tree (Career) */}
          <div
            onClick={() => handleSelect('career')}
            className={`absolute top-2 w-48 h-48 rounded-full transition-all duration-500 flex items-center justify-center cursor-pointer ${
              selectedPart === 'career'
                ? 'bg-emerald-500/80 shadow-lg ring-4 ring-emerald-400 scale-105'
                : 'bg-emerald-300/60 hover:bg-emerald-400/70'
            }`}
          >
            <span className="text-xs font-bold text-white px-2 py-1 bg-emerald-800/80 rounded-full shadow-sm">
              Whole Tree = Career 🌳
            </span>
          </div>

          {/* Branches (Jobs) */}
          <div
            onClick={() => handleSelect('job')}
            className={`absolute top-18 left-4 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPart === 'job'
                ? 'bg-teal-600 text-white ring-2 ring-teal-300 scale-110 shadow-md z-10'
                : 'bg-teal-100/90 text-teal-900 hover:bg-teal-200 z-10'
            }`}
          >
            🌿 Branch: Pilot / Doctor
          </div>

          <div
            onClick={() => handleSelect('job')}
            className={`absolute top-28 right-4 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedPart === 'job'
                ? 'bg-teal-600 text-white ring-2 ring-teal-300 scale-110 shadow-md z-10'
                : 'bg-teal-100/90 text-teal-900 hover:bg-teal-200 z-10'
            }`}
          >
            🌿 Branch: Teacher / Shopkeeper
          </div>

          {/* Trunk / Wood (Work) */}
          <div
            onClick={() => handleSelect('work')}
            className={`absolute bottom-3 w-16 h-28 rounded-t-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
              selectedPart === 'work'
                ? 'bg-amber-800 ring-4 ring-amber-400 scale-105 shadow-lg z-10 text-white'
                : 'bg-amber-700/80 hover:bg-amber-800 z-10 text-amber-100'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-center px-1">
              Wood = Work 🪵
            </span>
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 w-full h-4 bg-amber-200/90 rounded-full"></div>
        </div>

        {/* Detailed Explanation Panel */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-slate-200 shadow-sm">
          {selectedPart === 'work' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-lg font-heading">
                <span>🪵</span>
                <span>Work = The Raw Wood</span>
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-sans">
                  Uncountable
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Any effort or energy you use.</strong> Doing chores, washing dishes, raking leaves, or writing your homework is <strong>work</strong>. It does <em>not</em> always mean getting paid money!
              </p>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
                💡 <strong>Grade 4 Example:</strong> "Helping my parents clean the kitchen is hard <strong>work</strong>."
              </div>
            </div>
          )}

          {selectedPart === 'job' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-heading">
                <span>🌿</span>
                <span>Job = A Single Branch</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-sans">
                  Countable
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>A specific position you get hired for and paid to do.</strong> It has a title, tasks, and a paycheck (e.g. pilot, teacher, baker, shopkeeper). You can count jobs: 1 job, 2 jobs!
              </p>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 font-medium">
                💡 <strong>Grade 4 Example:</strong> "My uncle flies airplanes; his <strong>job</strong> is being a pilot."
              </div>
            </div>
          )}

          {selectedPart === 'career' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-900 font-bold text-lg font-heading">
                <span>🌳</span>
                <span>Career = The Entire Growing Tree</span>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-sans">
                  Countable
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Your lifelong journey of learning, working, and growing in a field.</strong> Over 20 or 40 years, you learn, take classes, and earn promotions. That whole tree is your career!
              </p>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-xs text-green-900 font-medium">
                💡 <strong>Grade 4 Example:</strong> "She studied for many years to build a wonderful <strong>career</strong> as a doctor."
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 italic">Click buttons or tree parts above</span>
            <button
              type="button"
              onClick={() => {
                const text =
                  selectedPart === 'work'
                    ? 'Work is the wood. General effort, like chores. Uncountable.'
                    : selectedPart === 'job'
                    ? 'Job is a branch. A specific paid role, like a pilot. Countable.'
                    : 'Career is the whole tree. Your lifelong path and progress.';
                speak(text);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
