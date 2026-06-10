/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckCircle2, XCircle, ShieldQuestion } from "lucide-react";

export interface TrueFalseQuestion {
  q: string;
  a: boolean;
}

interface TrueFalseQuizProps {
  questions: TrueFalseQuestion[];
  answers: { [key: number]: boolean };
  onChange: (index: number, answer: boolean) => void;
  disabled?: boolean;
}

export function TrueFalseQuiz({
  questions,
  answers,
  onChange,
  disabled = false
}: TrueFalseQuizProps) {
  return (
    <div className="space-y-4">
      {questions.map((item, idx) => {
        const isTrueSelected = answers[idx] === true;
        const isFalseSelected = answers[idx] === false;

        return (
          <div
            key={idx}
            className="p-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
          >
            {/* Clue text */}
            <div className="flex gap-2.5 items-start">
              <ShieldQuestion className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  POSTULADO #{idx + 1}:
                </span>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed pr-1">
                  {item.q}
                </p>
              </div>
            </div>

            {/* Answer select buttons */}
            <div className="flex gap-2.5 shrink-0 self-stretch sm:self-auto">
              {/* TRUE OPTION BUTTON */}
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(idx, true)}
                className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1.5 ${
                  isTrueSelected
                    ? "bg-indigo-600 text-white border-indigo-750 shadow-md scale-103 font-bold"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-650 cursor-pointer"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isTrueSelected ? "text-white" : "text-emerald-500"}`} />
                Verdadero
              </button>

              {/* FALSE OPTION BUTTON */}
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(idx, false)}
                className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-1.5 ${
                  isFalseSelected
                    ? "bg-rose-600 text-white border-rose-750 shadow-md scale-103 font-bold"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-650 cursor-pointer"
                }`}
              >
                <XCircle className={`w-4 h-4 ${isFalseSelected ? "text-white" : "text-rose-500"}`} />
                Falso
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
