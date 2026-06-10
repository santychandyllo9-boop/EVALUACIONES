/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, RotateCcw, HelpCircle, CheckCircle2 } from "lucide-react";

export interface MatchItem {
  id: number;
  word: string;
  pista: string;
}

interface ConceptMatchProps {
  matchItems: MatchItem[];
  shuffledWords: { id: number; word: string }[];
  conceptLinks: { [key: number]: number | null };
  setConceptLinks: React.Dispatch<React.SetStateAction<{ [key: number]: number | null }>>;
  isSubmitted?: boolean;
}

export function ConceptMatch({
  matchItems,
  shuffledWords,
  conceptLinks,
  setConceptLinks,
  isSubmitted = false
}: ConceptMatchProps) {
  // Key state of selected word to associate
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);

  const handleWordSelect = (wordId: number) => {
    if (isSubmitted) return;
    // Toggle active select or set pointer
    setSelectedWordId((v) => (v === wordId ? null : wordId));
  };

  const handlePistaAssociate = (itemId: number) => {
    if (isSubmitted) return;
    
    if (selectedWordId !== null) {
      // Create link: Mapping clue ID (itemId) to matched word ID (selectedWordId)
      setConceptLinks((prev) => ({
        ...prev,
        [itemId]: selectedWordId
      }));
      // Reset active selection pointer
      setSelectedWordId(null);
    }
  };

  const handleClearLink = (itemId: number) => {
    if (isSubmitted) return;
    setConceptLinks((prev) => ({
      ...prev,
      [itemId]: null
    }));
  };

  // Determine if a particular word has already been allocated to any clue
  const isWordLinked = (wordId: number) => {
    return Object.values(conceptLinks).includes(wordId);
  };

  // Turn word ID into string concept label
  const getWordTextFromId = (wordId: number | null) => {
    if (wordId === null) return "";
    const match = shuffledWords.find((sw) => sw.id === wordId);
    return match ? match.word : "";
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* WORD TRAY: Top selections for elements */}
      <div className="bg-slate-50 border border-purple-200/95 p-4 rounded-2xl flex flex-col gap-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
          PASO 1: Selecciona un Concepto de esta bandeja:
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {shuffledWords.map((item) => {
            const isSelected = selectedWordId === item.id;
            const isAllocated = isWordLinked(item.id);

            return (
              <button
                key={item.id}
                type="button"
                disabled={isSubmitted || (isAllocated && !isSelected)}
                onClick={() => handleWordSelect(item.id)}
                className={`py-3 px-4.5 rounded-xl text-xs font-black transition-all border text-center relative flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? "bg-purple-650 border-purple-700 text-white shadow-md shadow-purple-100 scale-103 font-extrabold"
                    : isAllocated
                    ? "bg-slate-100 border-slate-200 text-slate-350 line-through cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 hover:border-purple-300 text-slate-700 border-purple-250 shadow-sm cursor-pointer"
                }`}
              >
                {item.word.toLowerCase()}
                {isAllocated && <CheckCircle2 className="w-3.5 h-3.5 text-slate-350" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* CLUE ASSIGNMENT SLOTS: Matching list of items */}
      <div className="flex flex-col gap-3.5">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
          PASO 2: Haz clic sobre el casillero de destino correspondiente al concepto:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchItems.map((item) => {
            const linkedWordId = conceptLinks[item.id];
            const hasLink = linkedWordId !== null;
            const canBind = selectedWordId !== null;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!hasLink && canBind) {
                    handlePistaAssociate(item.id);
                  }
                }}
                className={`p-4 border-2 rounded-2xl flex flex-col justify-between gap-3 transition-all ${
                  hasLink
                    ? "bg-purple-50/15 border-purple-300 shadow-inner"
                    : canBind
                    ? "bg-white border-dashed border-purple-350 hover:border-purple-500 hover:bg-slate-50/30 cursor-pointer animate-pulse"
                    : "bg-white border-purple-200 hover:border-purple-300"
                }`}
              >
                {/* Description */}
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {item.pista}
                  </p>
                </div>

                {/* Target placeholder box link */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1 min-h-[44px]">
                  {hasLink ? (
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-600 text-white rounded-xl py-1 px-3.5 text-xs font-black shadow-sm font-mono tracking-wide">
                        {getWordTextFromId(linkedWordId).toLowerCase()}
                      </div>
                      
                      {!isSubmitted && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Stop parent triggers
                            handleClearLink(item.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Desasociar este concepto"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] sm:text-xs font-bold text-slate-400 italic flex items-center gap-1.5 pl-1">
                      <Link className="w-3.5 h-3.5 text-slate-300" />
                      {canBind ? "Haz clic aquí para asociar..." : "Asocia un término de arriba primero..."}
                    </span>
                  )}

                  {hasLink && (
                    <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      Asociado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
