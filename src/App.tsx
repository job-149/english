/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Printer,
  Volume2,
  VolumeX,
  Layers,
  Award,
  CheckCircle,
  HelpCircle,
  Search,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { STUDY_SECTIONS } from './data/studyData';
import { TreeAnalogyWidget } from './components/analogies/TreeAnalogyWidget';
import { ArticlesBumperCarWidget } from './components/analogies/ArticlesBumperCarWidget';
import { SuperSCapeWidget } from './components/analogies/SuperSCapeWidget';
import { BurgerFormulaWidget } from './components/analogies/BurgerFormulaWidget';
import { CountScoopScaleWidget } from './components/analogies/CountScoopScaleWidget';
import { RoadSignsPunctuationWidget } from './components/analogies/RoadSignsPunctuationWidget';
import { PracticeQuizWidget } from './components/PracticeQuizWidget';
import { MasterExamSection } from './components/MasterExamSection';
import { FlashcardsModal } from './components/FlashcardsModal';
import { PrintStudyGuide } from './components/PrintStudyGuide';
import { soundManager, speak, stopSpeech } from './utils/sound';

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedSections, setCompletedSections] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('g4_completed_sections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('g4_completed_sections', JSON.stringify(completedSections));
    } catch {
      // ignore
    }
  }, [completedSections]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.setSoundEnabled(next);
    if (!next) {
      stopSpeech();
      setIsSpeaking(false);
    }
  };

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections((prev) => [...prev, sectionId]);
      soundManager.playCorrect();
    }
  };

  const handleReadSection = (title: string, analogy: string[]) => {
    setIsSpeaking(true);
    speak(`${title}. ${analogy.join(' ')}`, () => setIsSpeaking(false));
  };

  const scrollToExam = () => {
    const el = document.getElementById('master-exam');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter sections based on search query
  const filteredSections = STUDY_SECTIONS.filter((sec) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.analogyTitle.toLowerCase().includes(q) ||
      sec.analogyDescription.some((d) => d.toLowerCase().includes(q)) ||
      sec.keyTakeaways.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Print only guide */}
      <PrintStudyGuide />

      {/* Interactive Web UI */}
      <div className="flex-1 print:hidden">
        {/* Sticky Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            {/* Logo & Grade Badge */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 flex items-center justify-center font-black text-2xl shadow-sm border border-amber-300">
                🌟
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 font-heading leading-tight flex items-center gap-1.5">
                  <span>Grade 4 English Super-Study Guide</span>
                </h1>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Exam Prep Edition • 6 Core Modules + Master Exam
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFlashcardsOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                title="Practice Flashcards"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Flashcards</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                type="button"
                onClick={toggleSound}
                className={`p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
                title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={scrollToExam}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Jump to Exam</span>
              </button>
            </div>
          </div>

          {/* Subheader: Category Scroller & Progress */}
          <div className="bg-amber-50/50 border-t border-amber-100 px-4 py-2">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveSectionId('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                    activeSectionId === 'all'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-amber-100/60'
                  }`}
                >
                  All Topics
                </button>
                {STUDY_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                      activeSectionId === sec.id
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-slate-700 hover:bg-amber-100/60'
                    }`}
                  >
                    <span>{sec.emoji}</span>
                    <span>{sec.shortTag}</span>
                    {completedSections.includes(sec.id) && (
                      <span className="text-[10px] text-emerald-500 font-black">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-slate-600">
                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedSections.length / STUDY_SECTIONS.length) * 100}%`
                    }}
                  ></div>
                </div>
                <span>
                  {completedSections.length}/{STUDY_SECTIONS.length} Modules Mastered
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent pt-8 pb-6 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/60 text-amber-900 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Grade 4 Super-Study Guide & Exam Prep</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight leading-tight">
              Master Grade 4 English with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700">
                Fun Analogies & Exam Drills!
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Explore <strong>The Tree</strong>, <strong>The Bumper Car & Spotlight</strong>,{' '}
              <strong>The Super-S Cape</strong>, <strong>The 3-Part Burger</strong>,{' '}
              <strong>Count-it vs Scoop-it</strong>, and <strong>The Reading Road Signs</strong>, then take the authentic Grade 4 Master Exam!
            </p>

            {/* Search filter input */}
            <div className="max-w-md mx-auto relative pt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any rule (e.g., career, bumper car, does, much)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-amber-300 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-4.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
          {filteredSections.map((sec) => {
            if (activeSectionId !== 'all' && activeSectionId !== sec.id) {
              return null;
            }

            const isDone = completedSections.includes(sec.id);

            return (
              <article
                key={sec.id}
                id={sec.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-sm transition-all"
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-2xl bg-amber-50 border border-amber-200/70">
                      {sec.emoji}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                        {sec.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-slate-500">
                          {sec.analogyTitle}
                        </span>
                        {isDone && (
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Mastered</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReadSection(sec.title, sec.analogyDescription)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Read Analogy</span>
                  </button>
                </div>

                {/* Analogy Narrative Box */}
                <div className={`${sec.color.bg} rounded-2xl p-5 border-2 ${sec.color.border} mb-6`}>
                  <div className="font-heading font-black text-slate-900 text-base mb-2">
                    {sec.analogyTitle}
                  </div>
                  <div className="space-y-2 text-slate-700 text-sm leading-relaxed">
                    {sec.analogyDescription.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))}
                  </div>
                </div>

                {/* Interactive Analogies Custom Components */}
                {sec.id === 'job-work-career' && <TreeAnalogyWidget />}
                {sec.id === 'articles' && <ArticlesBumperCarWidget />}
                {sec.id === 'simple-present' && <SuperSCapeWidget />}
                {sec.id === 'present-continuous' && <BurgerFormulaWidget />}
                {sec.id === 'quantifiers' && <CountScoopScaleWidget />}
                {sec.id === 'punctuation' && <RoadSignsPunctuationWidget />}

                {/* Comparison Table if provided */}
                {sec.table && (
                  <div className="my-6 overflow-hidden rounded-2xl border-2 border-slate-200 shadow-2xs">
                    <div className="bg-slate-100 px-4 py-2.5 font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                      Quick Reference Comparison Table
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
                          <tr>
                            {sec.table.headers.map((h, i) => (
                              <th key={i} className="p-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sec.table.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-amber-50/30 transition-colors">
                              <td className="p-3 font-black text-slate-900 font-heading">
                                {row.word}
                                {row.type && (
                                  <span className="block text-[11px] font-sans font-normal text-slate-500">
                                    ({row.type})
                                  </span>
                                )}
                              </td>
                              {row.type && (
                                <td className="p-3 font-semibold text-slate-700">
                                  {row.meaning}
                                </td>
                              )}
                              {!row.type && (
                                <td className="p-3 text-slate-700 font-medium">
                                  {row.meaning}
                                </td>
                              )}
                              <td className="p-3 text-slate-600 italic">
                                {row.example}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Key Takeaways Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Grade 4 Super Rules & Memory Anchors:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    {sec.keyTakeaways.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice Questions Component */}
                <PracticeQuizWidget
                  sectionTitle={sec.title}
                  questions={sec.practiceQuestions}
                  onCompleteSection={() => markSectionComplete(sec.id)}
                />
              </article>
            );
          })}

          {/* Master Practice Exam (Part A & Part B) */}
          <MasterExamSection />
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-white font-black font-heading text-lg">
                <span>🌟 Grade 4 English Super-Study Guide</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Built for elementary scholars, parents, and educators. Perfect for classroom review and exam preparation.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  setCompletedSections([]);
                  localStorage.removeItem('g4_completed_sections');
                  soundManager.playPop();
                }}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                Reset Progress
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </footer>

        {/* Flashcards Modal */}
        <FlashcardsModal
          isOpen={isFlashcardsOpen}
          onClose={() => setIsFlashcardsOpen(false)}
        />
      </div>
    </div>
  );
}
