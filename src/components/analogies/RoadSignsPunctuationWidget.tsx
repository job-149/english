import React, { useState } from 'react';
import { Volume2, AlertCircle } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

interface RoadSign {
  id: string;
  symbol: string;
  name: string;
  metaphor: string;
  action: string;
  example: string;
  audioText: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

const ROAD_SIGNS: RoadSign[] = [
  {
    id: 'period',
    symbol: '🛑',
    name: 'Full Stop (.)',
    metaphor: 'The Red Light',
    action: 'Stop completely. Placed at the end of a complete statement.',
    example: '"My mother is a nurse."',
    audioText: 'My mother is a nurse. Full stop. The red light tells our voice to stop completely.',
    accentColor: 'border-red-400 bg-red-50 text-red-950',
    badgeBg: 'bg-red-500',
    badgeText: 'text-white'
  },
  {
    id: 'comma',
    symbol: '🚗',
    name: 'Comma (,)',
    metaphor: 'The Speed Bump',
    action: 'Take a quick breath! Gives a short pause and separates items in a list.',
    example: '"I bought bananas, apples, and oranges."',
    audioText: 'I bought bananas, apples, and oranges. The comma gives a quick pause like a speed bump!',
    accentColor: 'border-amber-400 bg-amber-50 text-amber-950',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white'
  },
  {
    id: 'question',
    symbol: '❓',
    name: 'Question Mark (?)',
    metaphor: 'The Detective',
    action: 'Raise your voice at the end! Placed when asking for information.',
    example: '"Where is your school?"',
    audioText: 'Where is your school? Notice how your voice pitches up at the end for the detective question mark!',
    accentColor: 'border-sky-400 bg-sky-50 text-sky-950',
    badgeBg: 'bg-sky-500',
    badgeText: 'text-white'
  },
  {
    id: 'exclamation',
    symbol: '🎉',
    name: 'Exclamation Point (!)',
    metaphor: 'The Party Horn',
    action: 'Show strong excitement, surprise, joy, or an urgent order!',
    example: '"Wow! That airplane is so fast!"',
    audioText: 'Wow! That airplane is so fast! The party horn sounds loud and energetic!',
    accentColor: 'border-pink-400 bg-pink-50 text-pink-950',
    badgeBg: 'bg-pink-500',
    badgeText: 'text-white'
  },
  {
    id: 'apostrophe',
    symbol: '📎',
    name: 'Apostrophe (\')',
    metaphor: 'The Glue Stick',
    action: 'Job 1: Shows ownership (Halima\'s bag). Job 2: Glues contractions (do not → don\'t).',
    example: '"This is my father\'s jacket. He doesn\'t mind."',
    audioText: 'This is my father\'s jacket. He doesn\'t mind. The apostrophe glues letters and owners together!',
    accentColor: 'border-indigo-400 bg-indigo-50 text-indigo-950',
    badgeBg: 'bg-indigo-600',
    badgeText: 'text-white'
  }
];

export const RoadSignsPunctuationWidget: React.FC = () => {
  const [activeSign, setActiveSign] = useState<RoadSign>(ROAD_SIGNS[0]);

  const handleSelectSign = (sign: RoadSign) => {
    setActiveSign(sign);
    soundManager.playPop();
    speak(sign.audioText);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚦 🛣️</span>
          <h4 className="text-lg font-bold text-orange-950 font-heading">
            The Reading Highway: Click Any Road Sign!
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-900 rounded-full">
          Voice & Traffic Rules
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-5">
        Punctuation marks show your voice how to move when reading, just like traffic signs tell cars when to stop, slow down, or turn!
      </p>

      {/* 5 Road Signs Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-6">
        {ROAD_SIGNS.map((sign) => (
          <button
            key={sign.id}
            type="button"
            onClick={() => handleSelectSign(sign)}
            className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
              activeSign.id === sign.id
                ? `${sign.accentColor} shadow-md scale-105 ring-2 ring-orange-300 font-bold`
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:scale-102'
            }`}
          >
            <span className="text-3xl mb-1">{sign.symbol}</span>
            <span className="text-xs font-black font-heading">{sign.name}</span>
            <span className="text-[10px] opacity-80 mt-0.5">{sign.metaphor}</span>
          </button>
        ))}
      </div>

      {/* Roadway Demonstration Area */}
      <div className="relative bg-slate-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner">
        {/* Road markings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-full border-t-2 border-dashed border-yellow-300"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl border border-white/20 shadow-lg shrink-0">
              {activeSign.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${activeSign.badgeBg} ${activeSign.badgeText}`}>
                  {activeSign.metaphor}
                </span>
                <span className="text-amber-300 font-bold text-xs">
                  {activeSign.name}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-200 mt-1 leading-relaxed">
                {activeSign.action}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shrink-0 text-center md:text-right">
            <span className="text-[10px] uppercase tracking-wider text-amber-200 font-bold block mb-1">
              Grade 4 In Action:
            </span>
            <div className="text-base font-black text-white font-mono">
              {activeSign.example}
            </div>
            <button
              type="button"
              onClick={() => speak(activeSign.audioText)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-300 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear Voice Pitch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
