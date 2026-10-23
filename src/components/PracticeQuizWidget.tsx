import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, HelpCircle, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { PracticeQuestion } from '../data/studyData';
import { soundManager, speak } from '../utils/sound';

interface Props {
  sectionTitle: string;
  questions: PracticeQuestion[];
  onCompleteSection?: () => void;
}

export const PracticeQuizWidget: React.FC<Props> = ({
  sectionTitle,
  questions,
  onCompleteSection
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [hintsVisible, setHintsVisible] = useState<Record<string, boolean>>({});

  const handleSelect = (qId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: option }));
    soundManager.playPop();
  };

  const handleCheck = (q: PracticeQuestion) => {
    const userAns = selectedAnswers[q.id];
    if (!userAns) return;

    setCheckedQuestions((prev) => ({ ...prev, [q.id]: true }));

    const isCorrect = userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      soundManager.playCorrect();
      speak(`Correct! ${q.explanation}`);
      confetti({
        particleCount: 20,
        spread: 35,
        origin: { y: 0.8 }
      });
    } else {
      soundManager.playTryAgain();
      speak(`Not quite. Read the explanation: ${q.explanation}`);
    }

    // Check if all are answered correctly
    const allAnswered = questions.every((item) => {
      const ans = item.id === q.id ? userAns : selectedAnswers[item.id];
      return ans && ans.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase();
    });

    if (allAnswered && onCompleteSection) {
      onCompleteSection();
    }
  };

  const toggleHint = (qId: string) => {
    setHintsVisible((prev) => ({ ...prev, [qId]: !prev[qId] }));
    soundManager.playPop();
  };

  const correctCount = questions.filter(
    (q) => checkedQuestions[q.id] && selectedAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
  ).length;

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 mt-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div>
          <h4 className="text-lg font-bold text-slate-800 font-heading flex items-center gap-2">
            <span>✏️</span>
            <span>Practice Questions & Explanations</span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Test yourself to earn section mastery stars!
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full font-bold text-xs">
          <span>⭐</span>
          <span>
            {correctCount} / {questions.length} Solved Correctly
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const userAns = selectedAnswers[q.id];
          const isChecked = checkedQuestions[q.id];
          const isCorrect = isChecked && userAns?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
          const isWrong = isChecked && !isCorrect;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl transition-all ${
                isCorrect
                  ? 'bg-emerald-50/70 border-2 border-emerald-300'
                  : isWrong
                  ? 'bg-rose-50/70 border-2 border-rose-300'
                  : 'bg-white border-2 border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {q.question}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speak(q.question)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg shrink-0 cursor-pointer"
                  title="Read question aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-3">
                {q.options.map((opt) => {
                  const isSelected = userAns === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isChecked && isCorrect}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`p-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? isChecked
                            ? isCorrect
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-rose-600 text-white shadow-md'
                            : 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-400'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && isChecked && (
                        <span>{isCorrect ? '✓' : '✗'}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!userAns || (isChecked && isCorrect)}
                    onClick={() => handleCheck(q)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      !userAns
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : isChecked && isCorrect
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    <span>{isChecked && isCorrect ? 'Completed ✓' : 'Check Answer'}</span>
                  </button>

                  {q.hint && !isCorrect && (
                    <button
                      type="button"
                      onClick={() => toggleHint(q.id)}
                      className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-semibold px-2 py-1 rounded-lg hover:bg-amber-50 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{hintsVisible[q.id] ? 'Hide Hint' : 'Need a Hint?'}</span>
                    </button>
                  )}
                </div>

                {isChecked && (
                  <button
                    type="button"
                    onClick={() => speak(q.explanation)}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear Explanation</span>
                  </button>
                )}
              </div>

              {/* Hint Box */}
              {hintsVisible[q.id] && !isCorrect && (
                <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 animate-fade-in">
                  💡 <strong>Hint:</strong> {q.hint}
                </div>
              )}

              {/* Explanation Reveal */}
              {isChecked && (
                <div
                  className={`mt-3 p-3 rounded-xl text-xs leading-relaxed font-medium animate-fade-in ${
                    isCorrect
                      ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-950'
                      : 'bg-rose-100/70 border border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1 mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-700" />
                        <span>Teacher's Explanation:</span>
                      </>
                    )}
                  </div>
                  <div>{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
