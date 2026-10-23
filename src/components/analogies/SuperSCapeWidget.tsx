import React, { useState } from 'react';
import { Shield, Sparkles, Volume2, Magnet } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

interface SubjectOption {
  label: string;
  isSingularThirdPerson: boolean;
  type: string;
}

const SUBJECTS: SubjectOption[] = [
  { label: 'He', isSingularThirdPerson: true, type: 'Singular' },
  { label: 'She', isSingularThirdPerson: true, type: 'Singular' },
  { label: 'It (The sun)', isSingularThirdPerson: true, type: 'Singular / Fact' },
  { label: 'Dolango (one boy)', isSingularThirdPerson: true, type: 'Singular' },
  { label: 'I', isSingularThirdPerson: false, type: 'First person' },
  { label: 'You', isSingularThirdPerson: false, type: 'Second person' },
  { label: 'We', isSingularThirdPerson: false, type: 'Plural' },
  { label: 'They', isSingularThirdPerson: false, type: 'Plural' },
  { label: 'Kuma and Bekele', isSingularThirdPerson: false, type: 'Plural (Two people)' }
];

const VERBS = [
  { base: 'walk', withS: 'walks' },
  { base: 'teach', withS: 'teaches' },
  { base: 'play', withS: 'plays' },
  { base: 'rise', withS: 'rises' },
  { base: 'wake', withS: 'wakes' },
  { base: 'study', withS: 'studies' }
];

export const SuperSCapeWidget: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectOption>(SUBJECTS[0]);
  const [selectedVerb, setSelectedVerb] = useState(VERBS[0]);
  const [mode, setMode] = useState<'statement' | 'question_does'>('statement');

  const handleSelectSubject = (s: SubjectOption) => {
    setSelectedSubject(s);
    if (s.isSingularThirdPerson) {
      soundManager.playWhoosh();
    } else {
      soundManager.playPop();
    }
  };

  const isCapeOn = selectedSubject.isSingularThirdPerson && mode === 'statement';
  const isDoesActive = selectedSubject.isSingularThirdPerson && mode === 'question_does';

  const readSentence = () => {
    if (mode === 'statement') {
      const v = selectedSubject.isSingularThirdPerson ? selectedVerb.withS : selectedVerb.base;
      const cleanSub = selectedSubject.label.split(' ')[0];
      const sentence = `${cleanSub} ${v} every day.`;
      speak(sentence);
    } else {
      const helper = selectedSubject.isSingularThirdPerson ? 'Does' : 'Do';
      const cleanSub = selectedSubject.label.split(' ')[0];
      const sentence = `${helper} ${cleanSub} ${selectedVerb.base} every day? Notice: ${selectedVerb.base} has no S, because ${helper} already has it!`;
      speak(sentence);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-sky-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦸 ⏰</span>
          <h4 className="text-lg font-bold text-sky-950 font-heading">
            The Super-S Cape & Magnet Simulator!
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-sky-100 text-sky-900 rounded-full">
          Interactive Tense Lab
        </span>
      </div>

      {/* Mode Switcher */}
      <div className="flex rounded-xl bg-slate-100 p-1 mb-5 max-w-md">
        <button
          type="button"
          onClick={() => {
            setMode('statement');
            soundManager.playPop();
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mode === 'statement'
              ? 'bg-white text-sky-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🦸 Statement (Super-S Cape)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('question_does');
            soundManager.playWhoosh();
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mode === 'question_does'
              ? 'bg-white text-indigo-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🧲 Questions with Do / Does
        </button>
      </div>

      {/* Subject selection */}
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          1. Choose a Subject:
        </div>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => handleSelectSubject(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSubject.label === s.label
                  ? s.isSingularThirdPerson
                    ? 'bg-red-500 text-white shadow-md ring-2 ring-red-300 scale-105'
                    : 'bg-sky-600 text-white shadow-md ring-2 ring-sky-300 scale-105'
                  : s.isSingularThirdPerson
                  ? 'bg-red-50 text-red-900 border border-red-200 hover:bg-red-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.isSingularThirdPerson ? '🦸 ' : '👥 '}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verb selection */}
      <div className="mb-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          2. Choose a Verb:
        </div>
        <div className="flex flex-wrap gap-2">
          {VERBS.map((v) => (
            <button
              key={v.base}
              type="button"
              onClick={() => {
                setSelectedVerb(v);
                soundManager.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedVerb.base === v.base
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {v.base}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Cape Visual Showcase */}
      <div className="relative bg-gradient-to-br from-sky-50 via-indigo-50/40 to-amber-50 rounded-2xl p-6 border border-sky-200 overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
        {/* Animated Cape Behind Verb */}
        <div className="relative flex items-center gap-4 flex-wrap justify-center z-10">
          {mode === 'question_does' && (
            <div className="flex items-center gap-2">
              <div
                className={`px-4 py-2 rounded-2xl text-xl font-black transition-all ${
                  selectedSubject.isSingularThirdPerson
                    ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-300 animate-pulse-subtle'
                    : 'bg-slate-700 text-white shadow'
                }`}
              >
                {selectedSubject.isSingularThirdPerson ? 'Does' : 'Do'}
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                {selectedSubject.isSingularThirdPerson ? '🧲 Stole the S!' : 'Base helper'}
              </span>
            </div>
          )}

          {/* Subject display */}
          <div className="text-2xl font-black text-slate-800">
            {selectedSubject.label.split(' ')[0]}
          </div>

          {/* Verb Box with Cape Effect */}
          <div className="relative">
            {isCapeOn && (
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl -rotate-2 shadow-lg opacity-90 transition-all duration-300">
                <span className="absolute -top-3 -right-2 text-xs bg-amber-300 text-amber-950 font-black px-1.5 py-0.5 rounded-full border border-amber-400 shadow-sm animate-bounce">
                  SUPER-S! 🦸
                </span>
              </div>
            )}

            <div
              className={`relative px-5 py-3 rounded-xl text-2xl font-black transition-all ${
                isCapeOn
                  ? 'bg-white text-red-600 shadow-md ring-2 ring-red-400'
                  : isDoesActive
                  ? 'bg-white text-indigo-900 border-2 border-indigo-300'
                  : 'bg-white text-slate-800 border-2 border-slate-300'
              }`}
            >
              {isCapeOn ? selectedVerb.withS : selectedVerb.base}
            </div>
          </div>

          <div className="text-xl font-bold text-slate-500">
            {mode === 'statement' ? 'every day.' : 'every day?'}
          </div>
        </div>

        {/* Explanation text */}
        <div className="mt-5 text-center z-10">
          {mode === 'statement' ? (
            isCapeOn ? (
              <div className="text-sm font-semibold text-red-700 bg-red-100/80 px-4 py-2 rounded-xl border border-red-200">
                🦸 <strong>Super-S Cape ON!</strong> Because the subject is{' '}
                <strong>{selectedSubject.label}</strong> (singular), the verb adds{' '}
                <strong>{selectedVerb.withS.slice(selectedVerb.base.length)}</strong>!
              </div>
            ) : (
              <div className="text-sm font-semibold text-slate-700 bg-white/80 px-4 py-2 rounded-xl border border-slate-200">
                👥 <strong>No Cape Needed!</strong> For <strong>{selectedSubject.label}</strong>, the verb stays in its normal, comfortable base form: <strong>{selectedVerb.base}</strong>.
              </div>
            )
          ) : (
            isDoesActive ? (
              <div className="text-sm font-semibold text-indigo-900 bg-indigo-100/90 px-4 py-2 rounded-xl border border-indigo-200">
                🧲 <strong>The "Does" Magnet Rule:</strong> "Does" already carries the S, so <strong>{selectedVerb.base}</strong> loses its cape and goes back to normal!
              </div>
            ) : (
              <div className="text-sm font-semibold text-slate-700 bg-white/80 px-4 py-2 rounded-xl border border-slate-200">
                🤝 With <strong>{selectedSubject.label}</strong>, we ask questions using <strong>Do</strong>!
              </div>
            )
          )}
        </div>

        <button
          type="button"
          onClick={readSentence}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-white hover:bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 transition-colors cursor-pointer shadow-sm"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Listen Aloud</span>
        </button>
      </div>
    </div>
  );
};
