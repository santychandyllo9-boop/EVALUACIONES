/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from "react";
import { Check, Info } from "lucide-react";

interface WordSearchProps {
  words: string[];
  pistas: string[];
  paintedCells: Set<string>;
  setPaintedCells: React.Dispatch<React.SetStateAction<Set<string>>>;
  isSubmitted?: boolean;
  gradeColorAccent?: string;
}

const GRID_SIZE = 14;

export function WordSearch({
  words,
  pistas,
  paintedCells,
  setPaintedCells,
  isSubmitted = false,
  gradeColorAccent = "indigo"
}: WordSearchProps) {
  // Sorted, stable list of clues/words in alphabetical order
  const sortedCluesList = useMemo(() => {
    const combined = words.map((word, idx) => ({
      word,
      pista: pistas[idx] || "Asociación temática informática...",
      id: idx
    }));
    
    // Sort alphabetically by the target word
    return [...combined].sort((a, b) => a.word.localeCompare(b.word));
  }, [words, pistas]);

  // Available highlighter marker colors!
  const colorsTray = [
    { name: "Sorbete Índigo", bg: "bg-indigo-300", border: "border-indigo-400", hex: "indigo" },
    { name: "Menta Esmeralda", bg: "bg-emerald-300", border: "border-emerald-400", hex: "emerald" },
    { name: "Cielo Cyan", bg: "bg-cyan-300", border: "border-cyan-400", hex: "cyan" },
    { name: "Sol Dorado", bg: "bg-amber-300", border: "border-amber-400", hex: "amber" },
    { name: "Coral Magenta", bg: "bg-rose-300", border: "border-rose-400", hex: "rose" }
  ];

  // Active chosen color pointer used to tag coordinates
  const [activeColorTrayIdx, setActiveColorTrayIdx] = useState(0);

  // Store visual coloring of cell coordinate keys
  const [cellColorMap, setCellColorMap] = useState<{ [key: string]: string }>({});

  const wordListUpper = useMemo(() => words.map((w) => w.toUpperCase().replace(/\s+/g, "")), [words]);

  // Procedurally place target words into grid when words dependency changes
  const puzzle = useMemo(() => {
    // Scaffold grid with empty string placeholders
    const board: string[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
    const wordPlacements: { word: string; cells: { r: number; c: number }[] }[] = [];

    const directions = [
      { dr: 0, dc: 1 },   // Horizontal right
      { dr: 1, dc: 0 },   // Vertical down
      { dr: 1, dc: 1 },   // Diagonal down-right
      { dr: -1, dc: 1 }   // Diagonal up-right
    ];

    wordListUpper.forEach((word) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        attempts++;
        const dir = directions[Math.floor(Math.random() * directions.length)];
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);

        // Check bounds check
        if (
          r + dir.dr * (word.length - 1) >= 0 &&
          r + dir.dr * (word.length - 1) < GRID_SIZE &&
          c + dir.dc * (word.length - 1) >= 0 &&
          c + dir.dc * (word.length - 1) < GRID_SIZE
        ) {
          // Check collision check with already filled slots
          let canFit = true;
          for (let i = 0; i < word.length; i++) {
            const targetR = r + dir.dr * i;
            const targetC = c + dir.dc * i;
            if (board[targetR][targetC] !== "" && board[targetR][targetC] !== word[i]) {
              canFit = false;
              break;
            }
          }

          if (canFit) {
            const placedCoords: { r: number; c: number }[] = [];
            for (let i = 0; i < word.length; i++) {
              const targetR = r + dir.dr * i;
              const targetC = c + dir.dc * i;
              board[targetR][targetC] = word[i];
              placedCoords.push({ r: targetR, c: targetC });
            }
            wordPlacements.push({ word, cells: placedCoords });
            placed = true;
          }
        }
      }
    });

    // Populate remaining empty slots with random letters (A-Z)
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (board[r][c] === "") {
          board[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    return { board, wordPlacements };
  }, [wordListUpper]);

  // Check if a word is fully found (i.e. every matching coordinate is in paintedCells)
  const isWordFound = (wordUpper: string) => {
    const match = puzzle.wordPlacements.find((kp) => kp.word === wordUpper);
    if (!match) return false;
    return match.cells.every((coord) => paintedCells.has(`${coord.r},${coord.c}`));
  };

  const handleCellClick = (r: number, c: number) => {
    if (isSubmitted) return;
    const key = `${r},${c}`;

    setPaintedCells((prev) => {
      const copy = new Set(prev);
      if (copy.has(key)) {
        copy.delete(key);
        // Clear specific color
        setCellColorMap((prevColors) => {
          const colorsCopy = { ...prevColors };
          delete colorsCopy[key];
          return colorsCopy;
        });
      } else {
        copy.add(key);
        // Paint chosen active color
        const colorHex = colorsTray[activeColorTrayIdx].hex;
        setCellColorMap((prevColors) => ({
          ...prevColors,
          [key]: colorHex
        }));
      }
      return copy;
    });
  };

  const getCellColorClass = (r: number, c: number) => {
    const key = `${r},${c}`;
    if (!paintedCells.has(key)) return "bg-white hover:bg-slate-50 text-slate-700";

    const colorHex = cellColorMap[key] || "indigo";
    switch (colorHex) {
      case "indigo":
        return "bg-indigo-300 border-indigo-400 text-indigo-950 font-black shadow-sm";
      case "emerald":
        return "bg-emerald-300 border-emerald-400 text-emerald-950 font-black shadow-sm";
      case "cyan":
        return "bg-cyan-300 border-cyan-400 text-cyan-950 font-black shadow-sm";
      case "amber":
        return "bg-amber-300 border-amber-400 text-amber-950 font-black shadow-sm";
      case "rose":
        return "bg-rose-300 border-rose-400 text-rose-950 font-black shadow-sm";
      default:
        return "bg-indigo-200 border-indigo-300 text-indigo-950";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
      
      {/* LEFT COLUMN: ACTIVE INTERACTIVE GENERATED GRID */}
      <div className="flex-1 w-full flex flex-col gap-4">
        
        {/* Colors Palette Tool Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50/75 border border-slate-100 p-2.5 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
            Marcador de Sopa:
          </span>
          <div className="flex gap-2">
            {colorsTray.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setActiveColorTrayIdx(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                  idx === activeColorTrayIdx
                    ? `${color.bg} ${color.border} scale-105 shadow-md shadow-slate-100 text-slate-900 border-2`
                    : "bg-white border-slate-200 text-slate-555 hover:bg-slate-50/70 hover:border-slate-350"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${color.bg} border ${color.border}`} />
                {color.name.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* CSS Grids Board */}
        <div className="w-full overflow-x-auto custom-scrollbar p-1">
          <div 
            className="grid gap-[2.5px] bg-slate-50/50 border-2 border-slate-200 hover:border-indigo-350 p-2.5 rounded-2xl w-fit mx-auto selection:bg-transparent select-none shadow-inner transition-colors duration-300"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
            }}
          >
            {puzzle.board.map((row, r) =>
              row.map((char, c) => (
                <button
                  key={`${r},${c}`}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center font-mono font-bold text-xs sm:text-sm border-2 border-slate-200 hover:border-indigo-300 rounded-lg transition-all ${getCellColorClass(
                    r,
                    c
                  )}`}
                >
                  {char}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: REVELATORY CLUES CHECKLIST */}
      <div className="w-full lg:w-72 bg-slate-50/40 border border-slate-150 p-4.5 rounded-2xl shadow-inner flex flex-col gap-3">
        <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 border-b border-slate-200/50 pb-2">
          <Info className="w-4 h-4 text-indigo-500" />
          Conceptos por encontrar ({words.length}):
        </h5>

        <div className="space-y-2 max-h-100 overflow-y-auto custom-scrollbar pr-1">
          {sortedCluesList.map((item) => {
            const isFound = isWordFound(item.word.toUpperCase().replace(/\s+/g, ""));
            return (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  isFound
                    ? "bg-emerald-50/80 border-emerald-100 text-emerald-850 line-through decoration-emerald-400/40 decoration-2 shadow-sm"
                    : "bg-white border-slate-100/95 text-slate-650 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-bold text-xs capitalize leading-tight">
                    {item.word.toLowerCase()}
                  </span>
                  {isFound && (
                    <span className="bg-emerald-100 border border-emerald-200 text-[10px] text-emerald-700 font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3.5]" />
                      Hallado
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                  Pista: {item.pista}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
