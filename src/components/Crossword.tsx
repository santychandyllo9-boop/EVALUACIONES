/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef } from "react";
import { generateCrosswordCells, CrosswordCell } from "../utils";

interface CrosswordProps {
  words: string[];
  answers: { [key: string]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  isSubmitted?: boolean;
}

export function Crossword({ words, answers, setAnswers, isSubmitted = false }: CrosswordProps) {
  const cells = useMemo(() => generateCrosswordCells(words), [words]);

  // Map coordinates to cell objects for fast resolution
  const cellsByCoord = useMemo(() => {
    const map: { [key: string]: CrosswordCell } = {};
    cells.forEach((cell) => {
      map[`${cell.r},${cell.c}`] = cell;
    });
    return map;
  }, [cells]);

  // Grid bounds determination
  const minR = useMemo(() => Math.min(...cells.map((c) => c.r), 0), [cells]);
  const maxR = useMemo(() => Math.max(...cells.map((c) => c.r), 10), [cells]);
  const minC = useMemo(() => Math.min(...cells.map((c) => c.c), 0), [cells]);
  const maxC = useMemo(() => Math.max(...cells.map((c) => c.c), 10), [cells]);

  const gridRows = maxR - minR + 1;
  const gridCols = maxC - minC + 1;

  // Set up inputs element reference maps to handle key board arrow trigger traversal
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleCharInput = (r: number, c: number, value: string) => {
    if (isSubmitted) return;
    const key = `${r},${c}`;
    const cleanChar = value.slice(-1).toUpperCase();
    
    setAnswers((prev) => ({
      ...prev,
      [key]: cleanChar
    }));

    // Auto-advance cursor to the next orthogonal cell of the active word if character is filled
    if (cleanChar) {
      const activeCell = cellsByCoord[key];
      if (activeCell) {
        const nextR = activeCell.across ? r : r + 1;
        const nextC = activeCell.across ? c + 1 : c;
        const targetKey = `${nextR},${nextC}`;
        if (cellsByCoord[targetKey]) {
          inputRefs.current[targetKey]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = `${r},${c}`;
    
    if (e.key === "Backspace" && !answers[key]) {
      // Auto-backtrack to previous cell if pressing backspace on empty input
      const activeCell = cellsByCoord[key];
      if (activeCell) {
        const prevR = activeCell.across ? r : r - 1;
        const prevC = activeCell.across ? c - 1 : c;
        const prevKey = `${prevR},${prevC}`;
        if (cellsByCoord[prevKey]) {
          inputRefs.current[prevKey]?.focus();
        }
      }
    } else if (e.key === "ArrowRight") {
      const targetKey = `${r},${c + 1}`;
      if (cellsByCoord[targetKey]) {
        inputRefs.current[targetKey]?.focus();
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft") {
      const targetKey = `${r},${c - 1}`;
      if (cellsByCoord[targetKey]) {
        inputRefs.current[targetKey]?.focus();
        e.preventDefault();
      }
    } else if (e.key === "ArrowDown") {
      const targetKey = `${r + 1},${c}`;
      if (cellsByCoord[targetKey]) {
        inputRefs.current[targetKey]?.focus();
        e.preventDefault();
      }
    } else if (e.key === "ArrowUp") {
      const targetKey = `${r - 1},${c}`;
      if (cellsByCoord[targetKey]) {
        inputRefs.current[targetKey]?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 overflow-x-auto w-full custom-scrollbar">
      <div 
        className="grid gap-[3px] bg-white/60 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-200/85 dark:border-slate-800/80 mx-auto select-none transition-colors duration-300"
        style={{
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: gridRows }).map((_, rOffset) => {
          const r = minR + rOffset;
          return Array.from({ length: gridCols }).map((_, cOffset) => {
            const c = minC + cOffset;
            const cellKey = `${r},${c}`;
            const cell = cellsByCoord[cellKey];

            if (!cell) {
              // Empty space block - completely transparent and clean!
              return (
                <div
                  key={cellKey}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-transparent"
                />
              );
            }

            // Word starting index indicator number
            const labelNum = cell.isStart && cell.wordNum > 0 ? cell.wordNum : null;

            return (
              <div
                key={cellKey}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-slate-850 border-2 border-slate-200/95 dark:border-slate-700/90 hover:border-purple-400 dark:hover:border-purple-500 rounded-xl relative flex items-center justify-center focus-within:border-purple-600 dark:focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100/60 dark:focus-within:ring-purple-900/20 transition-all shadow-sm"
              >
                {labelNum && (
                  <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9.5px] font-extrabold text-purple-600 dark:text-purple-400 leading-none">
                    {labelNum}
                  </span>
                )}
                <input
                  ref={(el) => {
                    inputRefs.current[cellKey] = el;
                  }}
                  type="text"
                  maxLength={1}
                  disabled={isSubmitted}
                  value={answers[cellKey] || ""}
                  onChange={(e) => handleCharInput(r, c, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(r, c, e)}
                  className="w-full h-full text-center font-mono font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none uppercase caret-purple-500 disabled:bg-slate-150/50 disabled:text-slate-400 rounded-xl"
                />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
