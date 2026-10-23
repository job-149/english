import React from 'react';
import { STUDY_SECTIONS, MASTER_EXAM_PART_A, MASTER_EXAM_PART_B } from '../data/studyData';

export const PrintStudyGuide: React.FC = () => {
  return (
    <div className="hidden print:block p-8 bg-white text-slate-900 text-xs">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-2xl font-black font-heading uppercase tracking-wide">
          Grade 4 English Super-Study Guide & Exam Prep 🌟
        </h1>
        <p className="text-sm font-semibold text-slate-600 mt-1">
          Complete Revision Notes • All 6 Key Grammar Rules & Metaphors • Official Exam Key
        </p>
      </div>

      {/* 6 Sections Summary */}
      <div className="space-y-6">
        {STUDY_SECTIONS.map((sec, idx) => (
          <div key={sec.id} className="border border-slate-300 rounded-lg p-4 page-break-inside-avoid">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
              <h2 className="text-base font-bold font-heading text-slate-900">
                {sec.title}
              </h2>
              <span className="font-semibold text-slate-600 text-[11px]">
                {sec.analogyTitle}
              </span>
            </div>

            {/* Analogy bullets */}
            <div className="space-y-1 mb-3 text-slate-700">
              {sec.analogyDescription.map((desc, dIdx) => (
                <p key={dIdx} className="leading-normal">{desc}</p>
              ))}
            </div>

            {/* Table if exists */}
            {sec.table && (
              <div className="my-3 overflow-hidden border border-slate-300 rounded">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 border-b border-slate-300 font-bold">
                    <tr>
                      {sec.table.headers.map((h, i) => (
                        <th key={i} className="p-1.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((r, ri) => (
                      <tr key={ri} className="border-b border-slate-200 last:border-b-0">
                        <td className="p-1.5 font-bold">{r.word} {r.type ? `(${r.type})` : ''}</td>
                        <td className="p-1.5">{r.meaning}</td>
                        <td className="p-1.5 italic">{r.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Key Rules & Traps:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                {sec.keyTakeaways.map((k, ki) => (
                  <li key={ki}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Exam Answer Key Section for Teachers / Parents */}
      <div className="mt-8 border-t-2 border-slate-800 pt-4 page-break">
        <h2 className="text-xl font-black font-heading mb-3">
          🎯 Master Practice Exam Answer Key & Marking Guide
        </h2>

        <div className="mb-4">
          <h3 className="font-bold text-sm mb-2">Part A: Multiple Choice Answers:</h3>
          <ol className="list-decimal list-inside space-y-1">
            {MASTER_EXAM_PART_A.map((q) => (
              <li key={q.id}>
                <strong>{q.number}. {q.correctLabel}</strong> — {q.explanation}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-sm mb-2">Part B: Punctuated Model Paragraph:</h3>
          <div className="p-3 bg-slate-100 rounded font-mono font-bold text-sm border border-slate-300">
            "{MASTER_EXAM_PART_B.expectedPunctuated}"
          </div>
          <div className="mt-2 space-y-1">
            {MASTER_EXAM_PART_B.rules.map((r, ri) => (
              <p key={ri}>• <strong>{r.rule}:</strong> {r.details}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
