import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2,
  Printer,
  BookOpen
} from 'lucide-react';
import {
  MASTER_EXAM_PART_A,
  MASTER_EXAM_PART_B,
  ExamMultipleChoiceQuestion
} from '../data/studyData';
import { soundManager, speak } from '../utils/sound';

export const MasterExamSection: React.FC = () => {
  // Exam state
  const [selectedAnswersA, setSelectedAnswersA] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Grade 4 Scholar');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Part B state
  const [paragraphInput, setParagraphInput] = useState<string>(
    'hi nasise how are you i am so happy to see you did you bring your brothers cap'
  );

  // Timer state
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerEnabled && timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerEnabled, timerRunning, secondsLeft]);

  // Scoring Part A
  const partAScore = MASTER_EXAM_PART_A.filter(
    (q) => selectedAnswersA[q.id] === q.correctLabel
  ).length;

  // Scoring Part B
  const evaluatePartB = (text: string) => {
    const trimmed = text.trim();
    const rulesResults = [
      {
        rule: 'Capital "Hi" and "Nasise"',
        passed: trimmed.includes('Hi') && trimmed.includes('Nasise'),
        points: 2
      },
      {
        rule: 'Comma after "Hi"',
        passed: /Hi,\s*Nasise/i.test(trimmed),
        points: 1
      },
      {
        rule: 'Question mark after "How are you?"',
        passed: /How are you\?/i.test(trimmed),
        points: 2
      },
      {
        rule: 'Exclamation mark after "...happy to see you!"',
        passed: /happy to see you!/i.test(trimmed),
        points: 2
      },
      {
        rule: 'Apostrophe in "brother\'s" (possession)',
        passed: /brother['’]s/i.test(trimmed),
        points: 2
      },
      {
        rule: 'Question mark at end ("...cap?")',
        passed: /cap\?\s*$/i.test(trimmed) || /brother['’]s cap\?/i.test(trimmed),
        points: 1
      }
    ];

    const earned = rulesResults.reduce((acc, r) => acc + (r.passed ? r.points : 0), 0);
    return { rulesResults, earned, total: 10 };
  };

  const partBResult = evaluatePartB(paragraphInput);
  const totalScore = partAScore * 2 + partBResult.earned; // 10 pts Part A (2 each) + 10 pts Part B = 20 pts max
  const maxScore = 20;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleSubmitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);

    if (percentage >= 80) {
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
      speak(`Super job, ${studentName}! You scored ${totalScore} out of ${maxScore}, that is ${percentage} percent! You earned the Grade 4 English Gold Star Certificate!`);
    } else {
      soundManager.playCorrect();
      speak(`Good effort, ${studentName}! You scored ${totalScore} out of ${maxScore}. Check the teacher's answer key below to review!`);
    }
  };

  const handleResetExam = () => {
    setSelectedAnswersA({});
    setParagraphInput('hi nasise how are you i am so happy to see you did you bring your brothers cap');
    setSubmitted(false);
    setShowCertificate(false);
    setSecondsLeft(15 * 60);
    setTimerRunning(false);
    soundManager.playPop();
  };

  const insertPunctuation = (char: string) => {
    setParagraphInput((prev) => prev + char);
    soundManager.playPop();
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div id="master-exam" className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl my-10 relative overflow-hidden">
      {/* Decorative Gold Header */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-6 text-amber-950 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎯 🌟</span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-wide">
              Master Practice Exam (Grade 4 Level)
            </h2>
          </div>
          <p className="text-amber-950/80 text-sm font-semibold mt-1">
            Standard Exam Blueprint • 5 Multiple Choice + Paragraph Punctuation Workshop
          </p>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-amber-300">
          <Clock className={`w-5 h-5 ${secondsLeft < 120 ? 'text-red-500 animate-pulse' : 'text-amber-700'}`} />
          {timerEnabled ? (
            <div className="text-sm font-mono font-black text-slate-800">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          ) : (
            <span className="text-xs font-bold text-slate-700">Untimed Practice</span>
          )}

          <button
            type="button"
            onClick={() => {
              setTimerEnabled(!timerEnabled);
              setTimerRunning(!timerEnabled);
            }}
            className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2 py-1 rounded-lg ml-2 cursor-pointer"
          >
            {timerEnabled ? 'Disable' : 'Enable 15m'}
          </button>
        </div>
      </div>

      {/* Student Name Bar */}
      <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-amber-950">Scholar Name:</span>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="bg-white border border-amber-300 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Type your name"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Target: 80%+ to unlock the Champion Certificate!
        </div>
      </div>

      {/* PART A: MULTIPLE CHOICE */}
      <div className="mb-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-amber-500 text-white w-8 h-8 rounded-xl flex items-center justify-center font-heading">
              A
            </span>
            <h3 className="text-xl font-black text-slate-800 font-heading">
              Part A: Choose the correct answer (A, B, C, or D)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            5 Questions • 2 pts each
          </span>
        </div>

        <div className="space-y-6">
          {MASTER_EXAM_PART_A.map((q) => {
            const chosen = selectedAnswersA[q.id];
            const isCorrect = submitted && chosen === q.correctLabel;
            const isWrong = submitted && chosen !== q.correctLabel;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-rose-50/60 border-rose-300'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center mt-0.5 shrink-0">
                      {q.number}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {q.prompt}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    {q.concept}
                  </span>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  {q.options.map((opt) => {
                    const isSelected = chosen === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        disabled={submitted}
                        onClick={() => {
                          setSelectedAnswersA((prev) => ({ ...prev, [q.id]: opt.label }));
                          soundManager.playPop();
                        }}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? submitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-rose-600 text-white shadow-md'
                              : 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                            : submitted && opt.label === q.correctLabel
                            ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400 font-black'
                            : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black">
                            {opt.label}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {submitted && opt.label === q.correctLabel && (
                          <span className="text-xs">✓ Correct</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on submit */}
                {submitted && (
                  <div
                    className={`mt-4 p-3.5 rounded-xl text-xs font-medium leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-900'
                        : 'bg-rose-100/70 border border-rose-300 text-rose-900'
                    }`}
                  >
                    <strong>💡 Answer Key & Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PART B: PARAGRAPH PUNCTUATION WORKSHOP */}
      <div className="mb-10">
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-amber-500 text-white w-8 h-8 rounded-xl flex items-center justify-center font-heading">
              B
            </span>
            <h3 className="text-xl font-black text-slate-800 font-heading">
              Part B: Punctuate this short paragraph correctly
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            6 Rules • 10 pts total
          </span>
        </div>

        <div className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200">
          <div className="text-xs font-bold text-slate-600 mb-2">
            Raw unpunctuated sentence provided to Grade 4 students:
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-300 font-mono text-sm text-slate-700 tracking-wide select-all">
            "{MASTER_EXAM_PART_B.originalRaw}"
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                ✏️ Your Punctuated Version: (Add capital letters, commas, question marks, apostrophe, exclamation mark)
              </label>
              {/* Quick symbol insertion helper */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick Tools:</span>
                {[',', '.', '?', '!', "'"].map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => insertPunctuation(sym)}
                    className="w-7 h-7 bg-white hover:bg-amber-100 border border-slate-300 rounded-lg text-xs font-black text-slate-800 flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={paragraphInput}
              disabled={submitted}
              onChange={(e) => setParagraphInput(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-amber-300 bg-white font-mono text-base font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-200 leading-relaxed shadow-inner"
              placeholder="Hi, Nasise! How are you? I am so happy to see you! Did you bring your brother's cap?"
            />
          </div>

          {/* Quick Preset Buttons for Testing */}
          {!submitted && (
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setParagraphInput(MASTER_EXAM_PART_B.expectedPunctuated);
                  soundManager.playPop();
                }}
                className="text-amber-800 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                ✨ Fill Perfect Answer (For instant check)
              </button>
              <button
                type="button"
                onClick={() => {
                  setParagraphInput(MASTER_EXAM_PART_B.originalRaw);
                  soundManager.playPop();
                }}
                className="text-slate-600 hover:text-slate-800 bg-white border border-slate-300 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Reset to raw text
              </button>
            </div>
          )}

          {/* Feedback & Rubric analysis on submit */}
          {submitted && (
            <div className="mt-5 p-5 bg-white rounded-2xl border-2 border-amber-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="font-heading font-black text-slate-900 text-lg flex items-center gap-2">
                  <span>💡</span>
                  <span>Part B Marking Guide & Rule Breakdown</span>
                </div>
                <div className="text-sm font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-full">
                  Score: {partBResult.earned} / {partBResult.total} pts
                </div>
              </div>

              {/* Official Answer Key */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Official Teacher Model Answer:
                </span>
                <div className="text-base font-mono font-black text-emerald-950">
                  "{MASTER_EXAM_PART_B.expectedPunctuated}"
                </div>
              </div>

              {/* Individual Rules Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {partBResult.rulesResults.map((r, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs font-medium ${
                      r.passed
                        ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50/60 border-rose-300 text-rose-950'
                    }`}
                  >
                    {r.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">
                        {r.rule} ({r.points} {r.points === 1 ? 'pt' : 'pts'})
                      </div>
                      <span className="text-[11px] opacity-80">
                        {r.passed ? 'Marked correctly! ✓' : 'Missed or misplaced.'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUBMISSION & SCORE CARD */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Official Exam Completion</span>
          </div>
          <h3 className="text-2xl font-black font-heading">
            {submitted ? `Exam Score: ${totalScore} / ${maxScore} (${percentage}%)` : 'Ready to Submit Your Exam?'}
          </h3>
          <p className="text-slate-300 text-sm mt-1 max-w-md">
            {submitted
              ? percentage >= 80
                ? `Sensational work, ${studentName}! You demonstrated Grade 4 English mastery!`
                : `Great try, ${studentName}! Take a look at the explanations above to strengthen your skills.`
              : 'Submit to evaluate both Part A and Part B with detailed teacher marking keys.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={handleSubmitExam}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black rounded-2xl shadow-lg transition-all scale-102 hover:scale-105 cursor-pointer text-base font-heading flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Submit Exam & Grade</span>
            </button>
          ) : (
            <>
              {percentage >= 80 && (
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>View Certificate 🏅</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleResetExam}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-xs flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Exam</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* POPUP / MODAL CERTIFICATE OF ACHIEVEMENT */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-gradient-to-b from-amber-50 to-white border-8 border-amber-400 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <span className="text-5xl mb-2 block">🌟 🏆 🌟</span>
            <div className="text-xs font-black uppercase tracking-widest text-amber-700">
              Grade 4 English Super-Study Prep
            </div>
            <h2 className="text-3xl font-black text-amber-950 font-heading mt-2">
              Certificate of Excellence
            </h2>

            <p className="text-sm text-slate-600 mt-4">
              This certifies that
            </p>
            <div className="text-2xl font-black text-amber-900 border-b-2 border-amber-300 pb-1 mx-8 my-2 font-heading">
              {studentName}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed px-4">
              has successfully mastered the rules of <strong>Job vs. Work vs. Career</strong>, <strong>Articles</strong>, <strong>Simple Present</strong>, <strong>Present Continuous</strong>, <strong>Quantifiers</strong>, and <strong>Punctuation Marks</strong> with a score of <strong>{totalScore}/{maxScore} ({percentage}%)</strong>!
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
