import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Check, Sparkles, Scale } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

interface SorterItem {
  name: string;
  emoji: string;
  type: 'count' | 'scoop';
  quantifier: 'many' | 'much';
  reason: string;
}

const ITEMS_TO_SORT: SorterItem[] = [
  { name: 'Water', emoji: '💧', type: 'scoop', quantifier: 'much', reason: 'Liquid! You scoop or pour it. Not much water!' },
  { name: 'Pencils', emoji: '✏️', type: 'count', quantifier: 'many', reason: 'You can count 1 pencil, 2 pencils! Many pencils.' },
  { name: 'Soup', emoji: '🥣', type: 'scoop', quantifier: 'much', reason: 'Hot liquid food! Uncountable scoop-it. Not much soup.' },
  { name: 'Apples', emoji: '🍎', type: 'count', quantifier: 'many', reason: 'Count them on your fingers! Many apples.' },
  { name: 'Milk', emoji: '🥛', type: 'scoop', quantifier: 'much', reason: 'Liquid drink! Scoop-it. How much milk?' },
  { name: 'Chairs', emoji: '🪑', type: 'count', quantifier: 'many', reason: 'Solid countable furniture! Many chairs.' },
  { name: 'Tea', emoji: '☕', type: 'scoop', quantifier: 'much', reason: 'Beverage! You measure it in cups, but tea itself is uncountable. Much tea.' },
  { name: 'Books', emoji: '📚', type: 'count', quantifier: 'many', reason: 'Individual items you can count! Many books.' }
];

export const CountScoopScaleWidget: React.FC = () => {
  const [sorted, setSorted] = useState<Record<string, 'count' | 'scoop'>>({});
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const handleSort = (item: SorterItem, chosenBucket: 'count' | 'scoop') => {
    if (chosenBucket === item.type) {
      soundManager.playCorrect();
      setSorted((prev) => ({ ...prev, [item.name]: chosenBucket }));
      const msg = `Correct! ${item.emoji} ${item.name} is a ${item.type === 'count' ? 'Count-it' : 'Scoop-it'} noun! Use "${item.quantifier.toUpperCase()}"!`;
      setLastFeedback(msg);
      speak(msg);

      if (Object.keys(sorted).length + 1 === ITEMS_TO_SORT.length) {
        confetti({ particleCount: 50, spread: 70 });
      }
    } else {
      soundManager.playTryAgain();
      const msg = `Oops! Can you count ${item.name} one by one with fingers, or do you scoop/measure it? ${item.reason}`;
      setLastFeedback(msg);
      speak(msg);
    }
  };

  const resetGame = () => {
    setSorted({});
    setLastFeedback(null);
    soundManager.playPop();
  };

  const countItems = ITEMS_TO_SORT.filter((i) => sorted[i.name] === 'count');
  const scoopItems = ITEMS_TO_SORT.filter((i) => sorted[i.name] === 'scoop');
  const unsortedItems = ITEMS_TO_SORT.filter((i) => !sorted[i.name]);

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🖐️ 🥣</span>
          <h4 className="text-lg font-bold text-indigo-950 font-heading">
            Interactive Sorter: Count-it (Many) vs. Scoop-it (Much)!
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-900 rounded-full">
            {Object.keys(sorted).length} of {ITEMS_TO_SORT.length} Sorted
          </span>
          {Object.keys(sorted).length > 0 && (
            <button
              type="button"
              onClick={resetGame}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Sort each item into the <strong>Count-it Jar</strong> (use <em>Many</em>) or the <strong>Scoop-it Bucket</strong> (use <em>Much</em>).
      </p>

      {/* Unsorted Items Shelf */}
      {unsortedItems.length > 0 ? (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Click where each item belongs:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {unsortedItems.map((item) => (
              <div
                key={item.name}
                className="bg-white px-3 py-2 rounded-xl border-2 border-slate-200 shadow-sm flex items-center gap-2"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs font-bold text-slate-800">{item.name}</span>
                <div className="flex gap-1 ml-1 border-l border-slate-200 pl-2">
                  <button
                    type="button"
                    onClick={() => handleSort(item, 'count')}
                    className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-[11px] rounded-lg cursor-pointer"
                    title="Count-it (Many)"
                  >
                    🖐️ Count
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSort(item, 'scoop')}
                    className="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-[11px] rounded-lg cursor-pointer"
                    title="Scoop-it (Much)"
                  >
                    🥣 Scoop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center mb-5">
          <div className="text-emerald-800 font-bold text-sm">
            🎉 All Items Successfully Sorted! You are a Quantifier Master!
          </div>
        </div>
      )}

      {/* Two Buckets Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Count-it Jar */}
        <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/60 rounded-2xl p-5 border-2 border-indigo-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🖐️</span>
              <div>
                <h5 className="font-black text-indigo-950 text-base font-heading">
                  Count-it Jar (Use: MANY)
                </h5>
                <span className="text-xs text-indigo-700 font-medium">Countable on fingers (1, 2, 3...)</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full">
              {countItems.length} items
            </span>
          </div>

          <div className="min-h-[100px] bg-white/80 rounded-xl p-3 border border-indigo-200 flex flex-wrap gap-2 items-start">
            {countItems.length === 0 ? (
              <span className="text-xs text-indigo-400 italic m-auto">
                Sort countable nouns here...
              </span>
            ) : (
              countItems.map((item) => (
                <span
                  key={item.name}
                  className="bg-indigo-100 text-indigo-900 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1 shadow-sm"
                >
                  <span>{item.emoji}</span>
                  <span>Many {item.name}</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Scoop-it Bucket */}
        <div className="bg-gradient-to-b from-sky-50 to-sky-100/60 rounded-2xl p-5 border-2 border-sky-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥣</span>
              <div>
                <h5 className="font-black text-sky-950 text-base font-heading">
                  Scoop-it Bucket (Use: MUCH)
                </h5>
                <span className="text-xs text-sky-700 font-medium">Uncountable liquids, grains, powders</span>
              </div>
            </div>
            <span className="text-xs font-bold bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">
              {scoopItems.length} items
            </span>
          </div>

          <div className="min-h-[100px] bg-white/80 rounded-xl p-3 border border-sky-200 flex flex-wrap gap-2 items-start">
            {scoopItems.length === 0 ? (
              <span className="text-xs text-sky-400 italic m-auto">
                Sort uncountable nouns here...
              </span>
            ) : (
              scoopItems.map((item) => (
                <span
                  key={item.name}
                  className="bg-sky-100 text-sky-900 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-sky-200 flex items-center gap-1 shadow-sm"
                >
                  <span>{item.emoji}</span>
                  <span>Much {item.name}</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {lastFeedback && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-xs font-medium flex items-center justify-between mb-4">
          <span>{lastFeedback}</span>
          <button
            type="button"
            onClick={() => speak(lastFeedback)}
            className="text-indigo-600 hover:text-indigo-800 p-1 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Extra mini-rules: Some vs Any & Both vs All */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
          <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <span>☀️ Some vs. Any ❓</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            • <strong>Some:</strong> Positive sentences ("I have <em>some</em> bread").<br />
            • <strong>Any:</strong> Questions & Negatives ("I don't have <em>any</em> bread").
          </p>
        </div>

        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
          <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
            <span>✌️ Both (2) vs. All (3+) 🖐️</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            • <strong>Both:</strong> Strictly two people/things ("<em>Both</em> brothers").<br />
            • <strong>All:</strong> Three or more items ("<em>All</em> five apples").
          </p>
        </div>
      </div>
    </div>
  );
};
