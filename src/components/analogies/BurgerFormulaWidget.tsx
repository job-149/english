import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

interface BurgerSubject {
  label: string;
  expectedPatty: 'am' | 'is' | 'are';
  note: string;
}

const SUBJECTS: BurgerSubject[] = [
  { label: 'I', expectedPatty: 'am', note: 'I always takes "am"!' },
  { label: 'A dog (one animal)', expectedPatty: 'is', note: 'Singular (It) takes "is"!' },
  { label: 'She (the teacher)', expectedPatty: 'is', note: 'Singular (She) takes "is"!' },
  { label: 'The students', expectedPatty: 'are', note: 'Plural (They) takes "are"!' },
  { label: 'We', expectedPatty: 'are', note: 'Plural (We) takes "are"!' },
  { label: 'You', expectedPatty: 'are', note: 'You always pairs with "are"!' }
];

const PATTIES = ['am', 'is', 'are', 'none (no patty)'] as const;

const VERBS = [
  { base: 'sleep', ing: 'sleeping', note: 'Just add -ing!' },
  { base: 'run', ing: 'running', note: 'Spelling rule: Double the n → running!' },
  { base: 'write', ing: 'writing', note: 'Spelling rule: Drop the silent e → writing!' },
  { base: 'cook', ing: 'cooking', note: 'Just add -ing!' }
];

export const BurgerFormulaWidget: React.FC = () => {
  const [selectedSub, setSelectedSub] = useState<BurgerSubject>(SUBJECTS[0]);
  const [selectedPatty, setSelectedPatty] = useState<string>('am');
  const [selectedVerb, setSelectedVerb] = useState(VERBS[0]);

  const isNoPatty = selectedPatty === 'none (no patty)';
  const isCorrectPatty = selectedPatty === selectedSub.expectedPatty;
  const isPerfectBurger = !isNoPatty && isCorrectPatty;

  const handleSelectPatty = (patty: string) => {
    setSelectedPatty(patty);
    if (patty === selectedSub.expectedPatty) {
      soundManager.playCorrect();
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 }
      });
    } else if (patty === 'none (no patty)') {
      soundManager.playTryAgain();
    } else {
      soundManager.playPop();
    }
  };

  const handleRead = () => {
    if (isNoPatty) {
      speak(`${selectedSub.label} ${selectedVerb.ing}. That is incomplete! A burger needs its patty! Add ${selectedSub.expectedPatty}.`);
    } else {
      const sentence = `${selectedSub.label.split(' ')[0]} ${selectedPatty} ${selectedVerb.ing} right now!`;
      speak(sentence);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍔 📹</span>
          <h4 className="text-lg font-bold text-rose-950 font-heading">
            The 3-Part Burger Formula Builder!
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-rose-100 text-rose-900 rounded-full">
          Live Action Right Now!
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Like a video camera recording live right now, Present Continuous needs all three parts to make sense!
      </p>

      {/* Layer Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Top Bun: Subject */}
        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>🍞 1. Top Bun (Subject)</span>
          </div>
          <div className="space-y-1.5">
            {SUBJECTS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setSelectedSub(s);
                  soundManager.playPop();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSub.label === s.label
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Patty: am / is / are */}
        <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-200">
          <div className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>🥩 2. Burger Patty (Helping)</span>
          </div>
          <div className="space-y-1.5">
            {PATTIES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSelectPatty(p)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPatty === p
                    ? p === selectedSub.expectedPatty
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : p.includes('none')
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-orange-100/60'
                }`}
              >
                {p === 'none (no patty)' ? '❌ (Omit Patty)' : `Patty: ${p}`}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bun: Verb-ing */}
        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>🍞 3. Bottom Bun (Verb-ing)</span>
          </div>
          <div className="space-y-1.5">
            {VERBS.map((v) => (
              <button
                key={v.base}
                type="button"
                onClick={() => {
                  setSelectedVerb(v);
                  soundManager.playPop();
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedVerb.base === v.base
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60'
                }`}
              >
                <span className="font-mono">{v.ing}</span>
                <span className="block text-[10px] opacity-80">{v.note}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Burger Stack */}
      <div className="bg-gradient-to-b from-rose-50/50 via-amber-50/30 to-amber-100/40 rounded-2xl p-6 border border-rose-200 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-2 text-center">
          {/* Top Bun */}
          <div className="bg-amber-200 border-2 border-amber-400 text-amber-900 font-black py-2.5 px-6 rounded-t-3xl shadow-sm text-lg">
            🍞 Top Bun: {selectedSub.label.split(' ')[0]}
          </div>

          {/* Patty Layer */}
          {isNoPatty ? (
            <div className="bg-red-100 border-2 border-dashed border-red-400 text-red-700 font-bold py-2 px-6 rounded-xl text-xs animate-bounce">
              ⚠️ Missing Patty! "am / is / are" cannot be forgotten!
            </div>
          ) : (
            <div
              className={`py-3 px-6 rounded-xl font-black text-xl shadow-md transition-all ${
                isCorrectPatty
                  ? 'bg-amber-900 text-white ring-2 ring-emerald-400'
                  : 'bg-red-700 text-white ring-2 ring-red-400'
              }`}
            >
              🥩 Patty: {selectedPatty}
              {!isCorrectPatty && (
                <span className="block text-xs font-normal text-red-100 mt-0.5">
                  (Needs "{selectedSub.expectedPatty}")
                </span>
              )}
            </div>
          )}

          {/* Bottom Bun */}
          <div className="bg-amber-200 border-2 border-amber-400 text-amber-900 font-black py-2.5 px-6 rounded-b-3xl shadow-sm text-lg">
            🍞 Bottom Bun: {selectedVerb.ing}
          </div>
        </div>

        {/* Complete Sentence Banner */}
        <div className="mt-5 w-full max-w-md">
          {isPerfectBurger ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Delicious & Grammatically Perfect!</span>
              </div>
              <div className="text-xl font-black text-emerald-950 font-heading">
                "{selectedSub.label.split(' ')[0]} {selectedPatty} {selectedVerb.ing}."
              </div>
              <p className="text-xs text-emerald-700 mt-1">{selectedSub.note}</p>
            </div>
          ) : isNoPatty ? (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-center text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-1" />
              Without <strong>{selectedSub.expectedPatty}</strong>, the sentence falls apart!
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 text-center text-xs text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 inline mr-1" />
              <strong>{selectedSub.label}</strong> does not pair with "<strong>{selectedPatty}</strong>"! Pick "<strong>{selectedSub.expectedPatty}</strong>".
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleRead}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-white hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer shadow-sm"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Read Burger Sentence</span>
        </button>
      </div>
    </div>
  );
};
