import React, { useState } from 'react';
import { Sparkles, Zap, Sun, Lightbulb, Volume2 } from 'lucide-react';
import { soundManager, speak } from '../../utils/sound';

interface WordSample {
  word: string;
  type: 'vowel' | 'consonant' | 'unique' | 'repeated';
  startsVowel: boolean;
  correctArticle: 'a' | 'an' | 'the';
  reason: string;
  isSpecial?: boolean;
}

const SAMPLE_WORDS: WordSample[] = [
  { word: 'apple', type: 'vowel', startsVowel: true, correctArticle: 'an', reason: 'Starts with vowel sound /a/. Needs "n" bumper cushion!' },
  { word: 'dog', type: 'consonant', startsVowel: false, correctArticle: 'a', reason: 'Starts with consonant sound /d/. Smooth with just "a"!' },
  { word: 'orange', type: 'vowel', startsVowel: true, correctArticle: 'an', reason: 'Starts with vowel sound /o/. Needs "n" bumper cushion!' },
  { word: 'umbrella', type: 'vowel', startsVowel: true, correctArticle: 'an', reason: 'Starts with vowel sound /u/. Needs "n" bumper cushion!' },
  { word: 'cat', type: 'consonant', startsVowel: false, correctArticle: 'a', reason: 'Starts with consonant sound /k/. Safe with "a"!' },
  { word: 'sun', type: 'unique', startsVowel: false, correctArticle: 'the', reason: 'Only ONE in our world! Turn on THE spotlight!', isSpecial: true },
  { word: 'capital city', type: 'unique', startsVowel: false, correctArticle: 'the', reason: 'Ethiopia has only ONE capital city! Spotlit!', isSpecial: true },
  { word: 'blue notebook (2nd time)', type: 'repeated', startsVowel: false, correctArticle: 'the', reason: 'Mentioned for the second time; we know which one!', isSpecial: true }
];

export const ArticlesBumperCarWidget: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<WordSample>(SAMPLE_WORDS[0]);
  const [chosenArticle, setChosenArticle] = useState<'a' | 'an' | 'the' | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const testArticle = (article: 'a' | 'an' | 'the') => {
    setChosenArticle(article);
    setShowResult(true);

    if (article === selectedWord.correctArticle) {
      soundManager.playCorrect();
      speak(`Correct! ${article.toUpperCase()} ${selectedWord.word}. ${selectedWord.reason}`);
    } else {
      soundManager.playTryAgain();
      if (article === 'a' && selectedWord.startsVowel) {
        speak(`Crash! A ${selectedWord.word} bumps two vowels together! Use the "n" bumper cushion!`);
      } else {
        speak(`Not quite. Try checking the rule!`);
      }
    }
  };

  const selectWord = (w: WordSample) => {
    setSelectedWord(w);
    setChosenArticle(null);
    setShowResult(false);
    soundManager.playPop();
  };

  const isCollision = chosenArticle === 'a' && selectedWord.startsVowel;
  const isMatch = chosenArticle === selectedWord.correctArticle;

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚗 🔦</span>
          <h4 className="text-lg font-bold text-amber-950 font-heading">
            Interactive Arena: The Bumper Car & Spotlight!
          </h4>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full">
          Hands-on Grammar Lab
        </span>
      </div>

      {/* Word picker pills */}
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          1. Pick a noun to test:
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_WORDS.map((item) => (
            <button
              key={item.word}
              type="button"
              onClick={() => selectWord(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedWord.word === item.word
                  ? item.isSpecial
                    ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-105'
                    : 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 scale-105'
                  : item.isSpecial
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.isSpecial ? '🔦 ' : '🚗 '}
              {item.word}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Stage */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-indigo-50 rounded-2xl p-6 border border-amber-200 mb-6">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            2. Choose the matching article ticket:
          </span>
          <div className="mt-3 flex items-center justify-center gap-3">
            {(['a', 'an', 'the'] as const).map((art) => (
              <button
                key={art}
                type="button"
                onClick={() => testArticle(art)}
                className={`w-20 h-14 rounded-2xl font-black text-xl tracking-wider transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                  chosenArticle === art
                    ? 'bg-amber-600 text-white ring-4 ring-amber-300 scale-110 shadow-lg'
                    : 'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:scale-105'
                }`}
              >
                {art}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Arena Simulation */}
        <div className="bg-white/95 rounded-xl p-5 border border-slate-200 min-h-[140px] flex flex-col items-center justify-center relative overflow-hidden">
          {selectedWord.correctArticle === 'the' && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-200/40 via-yellow-100/20 to-transparent pointer-events-none flex justify-center">
              <div className="w-48 h-full bg-gradient-to-b from-amber-300/40 to-transparent blur-sm"></div>
            </div>
          )}

          <div className="flex items-center gap-3 z-10">
            <span
              className={`px-4 py-2 rounded-xl text-2xl font-black transition-all ${
                chosenArticle
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-400 border border-dashed border-slate-300'
              }`}
            >
              {chosenArticle ? chosenArticle : '___'}
            </span>

            {isCollision && (
              <div className="flex items-center text-red-500 font-black animate-bounce text-sm">
                💥 CRASH!
              </div>
            )}

            {isMatch && selectedWord.startsVowel && chosenArticle === 'an' && (
              <div className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                🛡️ "n" cushion saved the bump!
              </div>
            )}

            <span className="text-2xl font-black text-slate-800">
              {selectedWord.word}
            </span>
          </div>

          {/* Feedback message */}
          {showResult && (
            <div className="mt-4 text-center z-10 animate-fade-in">
              {isMatch ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm font-medium">
                  🎉 <strong>Super Job!</strong> {selectedWord.reason}
                </div>
              ) : isCollision ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-medium">
                  🚗💥 <strong>Bumper Car Crash!</strong> "A" and "{selectedWord.word}" both have vowel sounds! You need the soft cushion letter <strong>"n"</strong> → <strong>an {selectedWord.word}</strong>!
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm font-medium">
                  💡 <strong>Look closer:</strong> {selectedWord.reason}
                </div>
              )}
            </div>
          )}

          {!showResult && (
            <div className="text-xs text-slate-400 mt-3 italic">
              Tap A, AN, or THE above to test what happens!
            </div>
          )}
        </div>
      </div>

      {/* Visual Rule Flowchart */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
        <div className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Quick Decision Map:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-amber-800">1. Starts with Consonant sound?</span>
            <p className="mt-1 text-slate-600">Use <strong>A</strong> (a dog, a cat, a book).</p>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-amber-800">2. Starts with Vowel sound (a, e, i, o, u)?</span>
            <p className="mt-1 text-slate-600">Use <strong>AN</strong> (an orange, an egg, an umbrella).</p>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200">
            <span className="font-bold text-amber-800">3. Specific, Unique, or Mentioned 2nd time?</span>
            <p className="mt-1 text-slate-600">Use <strong>THE</strong> (the sun, the red pencil).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
