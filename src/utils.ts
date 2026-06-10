/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GradeKey } from "./types";

export interface CrosswordCell {
  r: number;
  c: number;
  letter: string;
  wordIdx: number;
  wordNum: number;
  isStart: boolean;
  across: boolean;
}

/**
 * Returns customized colors and classes per student grade level to provide
 * visual rhythm and rhythm variation under academic principles.
 */
export function getGradeColors(grade: GradeKey) {
  const configs: Record<
    GradeKey,
    { badge: string; bg: string; border: string; text: string; accent: string; btn: string }
  > = {
    "6": {
      badge: "bg-indigo-50 text-indigo-805 border-2 border-indigo-200 shadow-sm",
      bg: "bg-indigo-50/40",
      border: "border-indigo-200",
      text: "text-indigo-700",
      accent: "indigo",
      btn: "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:shadow-indigo-300"
    },
    "7": {
      badge: "bg-emerald-50 text-emerald-805 border-2 border-emerald-200 shadow-sm",
      bg: "bg-emerald-50/40",
      border: "border-emerald-200",
      text: "text-emerald-700",
      accent: "emerald",
      btn: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:shadow-emerald-300"
    },
    "8": {
      badge: "bg-cyan-50 text-cyan-805 border-2 border-cyan-200 shadow-sm",
      bg: "bg-cyan-50/40",
      border: "border-cyan-200",
      text: "text-cyan-700",
      accent: "cyan",
      btn: "bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:shadow-cyan-300"
    },
    "9": {
      badge: "bg-amber-50 text-amber-855 border-2 border-amber-200 shadow-sm",
      bg: "bg-amber-50/50",
      border: "border-amber-200",
      text: "text-amber-700",
      accent: "amber",
      btn: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:shadow-amber-300"
    },
    "10": {
      badge: "bg-purple-50 text-purple-805 border-2 border-purple-200 shadow-sm",
      bg: "bg-purple-50/40",
      border: "border-purple-200",
      text: "text-purple-700",
      accent: "purple",
      btn: "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:shadow-purple-300"
    },
    "11": {
      badge: "bg-rose-50 text-rose-805 border-2 border-rose-220 shadow-sm",
      bg: "bg-rose-50/40",
      border: "border-rose-200",
      text: "text-rose-700",
      accent: "rose",
      btn: "bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:shadow-rose-300"
    }
  };

  return configs[grade] || configs["6"];
}

/**
 * Perform a non-destructive Fisher-Yates array shuffle.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a dynamic, intersecting grid layout crossword cell matrix.
 * Lays words orthogonally with crossings, returning the flat array of valid character grids.
 */
export function generateCrosswordCells(words: string[]): CrosswordCell[] {
  if (!words || words.length === 0) return [];

  // Remove duplicate entries (e.g., occasional database duplicates)
  const uniqueWords = Array.from(new Set(words.map(w => w.toUpperCase().trim()).filter(Boolean)));
  
  // Sort descending by length so that words with more letters anchor the layout trials first
  const sortedWords = [...uniqueWords].sort((a, b) => b.length - a.length);

  const gridRows = 20; 
  const gridCols = 20;

  let bestPlacements: { word: string; r: number; c: number; across: boolean }[] = [];
  let bestIntersectionCount = -1;
  let bestPlacedCount = -1;

  // Perform multiple randomized trial layers to get the absolute highest interconnection rate
  for (let trial = 0; trial < 15; trial++) {
    const trialWords = [sortedWords[0]];
    const remaining = sortedWords.slice(1);
    
    // Perform Fisher-Yates scatter of remaining ones per trial
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    trialWords.push(...remaining);

    const placements: { word: string; r: number; c: number; across: boolean }[] = [];
    const trialGrid = Array.from({ length: gridRows }, () => Array(gridCols).fill(""));

    // Anchor first word in the upper-mid center
    const firstWord = trialWords[0];
    const startR = 8;
    const startC = Math.max(0, Math.floor((gridCols - firstWord.length) / 2));
    
    placements.push({ word: firstWord, r: startR, c: startC, across: true });
    for (let i = 0; i < firstWord.length; i++) {
      trialGrid[startR][startC + i] = firstWord[i];
    }

    let intersections = 0;
    let placedCount = 1;

    for (let wIdx = 1; wIdx < trialWords.length; wIdx++) {
      const word = trialWords[wIdx];
      let placed = false;
      let bestPlacementForWord: { r: number; col: number; across: boolean } | null = null;
      let maxWordIntersections = -1;

      // Scan existing layouts for potential letter crossing placements
      for (const p of placements) {
        for (let iIdx = 0; iIdx < p.word.length; iIdx++) {
          const pChar = p.word[iIdx];
          const pR = p.across ? p.r : p.r + iIdx;
          const pC = p.across ? p.c + iIdx : p.c;

          for (let charIdx = 0; charIdx < word.length; charIdx++) {
            const wChar = word[charIdx];

            if (pChar === wChar) {
              const across = !p.across;
              const targetR = across ? pR : pR - charIdx;
              const targetC = across ? pC - charIdx : pC;

              if (
                targetR >= 0 &&
                targetR + (across ? 0 : word.length - 1) < gridRows &&
                targetC >= 0 &&
                targetC + (across ? word.length - 1 : 0) < gridCols
              ) {
                let collision = false;
                let wordIntersections = 0;

                for (let letterIdx = 0; letterIdx < word.length; letterIdx++) {
                  const checkR = across ? targetR : targetR + letterIdx;
                  const checkC = across ? targetC + letterIdx : targetC;
                  const activeVal = trialGrid[checkR][checkC];

                  if (activeVal !== "") {
                    if (activeVal === word[letterIdx]) {
                      wordIntersections++;
                    } else {
                      collision = true;
                      break;
                    }
                  } else {
                    // Enforce premium spacing so crossword words don't sit side-by-side
                    const neighbors = across
                      ? [[checkR - 1, checkC], [checkR + 1, checkC]]
                      : [[checkR, checkC - 1], [checkR, checkC + 1]];
                    
                    for (const [nr, nc] of neighbors) {
                      if (nr >= 0 && nr < gridRows && nc >= 0 && nc < gridCols) {
                        const cellVal = trialGrid[nr][nc];
                        if (cellVal !== "") {
                          collision = true;
                          break;
                        }
                      }
                    }
                  }
                  if (collision) break;
                }

                if (!collision && wordIntersections >= 1) {
                  if (wordIntersections > maxWordIntersections) {
                    maxWordIntersections = wordIntersections;
                    bestPlacementForWord = { r: targetR, col: targetC, across };
                  }
                }
              }
            }
          }
        }
      }

      if (bestPlacementForWord) {
        const { r: tr, col: tc, across } = bestPlacementForWord;
        placements.push({ word, r: tr, c: tc, across });
        for (let i = 0; i < word.length; i++) {
          const wr = across ? tr : tr + i;
          const wc = across ? tc + i : tc;
          trialGrid[wr][wc] = word[i];
        }
        intersections += maxWordIntersections;
        placedCount++;
        placed = true;
      }

      // Parallel row placement fallback helper
      if (!placed) {
        let candidateR = 3;
        while (candidateR < gridRows - 2) {
          const overlappingRow = placements.some(p => p.across && Math.abs(p.r - candidateR) < 3);
          if (!overlappingRow) {
            const colOffset = Math.max(0, Math.floor((gridCols - word.length) / 2));
            placements.push({ word, r: candidateR, c: colOffset, across: true });
            for (let i = 0; i < word.length; i++) {
              trialGrid[candidateR][colOffset + i] = word[i];
            }
            placedCount++;
            placed = true;
            break;
          }
          candidateR += 3;
        }
      }
    }

    if (placedCount > bestPlacedCount || (placedCount === bestPlacedCount && intersections > bestIntersectionCount)) {
      bestPlacedCount = placedCount;
      bestIntersectionCount = intersections;
      bestPlacements = placements;
    }

    // High intersection layouts can end earlier
    if (placedCount === sortedWords.length && intersections >= 5) {
      break;
    }
  }

  // Draw final optimal choice onto matrix canvas
  const finalGrid: { letter: string; wordIdx: number; wordNum: number; isStart: boolean; across: boolean }[][] = Array.from(
    { length: gridRows },
    () => Array.from({ length: gridCols }, () => ({ letter: "", wordIdx: -1, wordNum: -1, isStart: false, across: false }))
  );

  const placementsWithPositions = bestPlacements.map((p) => {
    const origIdx = words.map(w => w.toUpperCase().trim()).indexOf(p.word);
    return { ...p, origIdx };
  });

  // Assign numbers to start coordinate blocks based on natural read-scanning direction (classic NYT style!)
  const startCoords: { r: number; c: number; wordIndices: number[] }[] = [];
  placementsWithPositions.forEach((p) => {
    const existing = startCoords.find(sc => sc.r === p.r && sc.c === p.c);
    if (existing) {
      existing.wordIndices.push(p.origIdx);
    } else {
      startCoords.push({ r: p.r, c: p.c, wordIndices: [p.origIdx] });
    }
  });

  startCoords.sort((a, b) => {
    if (a.r !== b.r) return a.r - b.r;
    return a.c - b.c;
  });

  const wordIdxToNum: Record<number, number> = {};
  startCoords.forEach((coord, labelIdx) => {
    const num = labelIdx + 1;
    coord.wordIndices.forEach((wIdx) => {
      wordIdxToNum[wIdx] = num;
    });
  });

  placementsWithPositions.forEach((p) => {
    const wordNum = wordIdxToNum[p.origIdx] || 1;
    for (let i = 0; i < p.word.length; i++) {
      const cr = p.across ? p.r : p.r + i;
      const cc = p.across ? p.c + i : p.c;
      const letter = p.word[i];
      const isStart = i === 0;

      const existing = finalGrid[cr][cc];
      finalGrid[cr][cc] = {
        letter,
        wordIdx: p.origIdx,
        wordNum: isStart ? wordNum : (existing.wordNum !== -1 ? existing.wordNum : -1),
        isStart: isStart || existing.isStart,
        across: p.across
      };
    }
  });

  let minRow = gridRows;
  let maxRow = 0;
  let minCol = gridCols;
  let maxCol = 0;

  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      if (finalGrid[r][c].letter !== "") {
        if (r < minRow) minRow = r;
        if (r > maxRow) maxRow = r;
        if (c < minCol) minCol = c;
        if (c > maxCol) maxCol = c;
      }
    }
  }

  if (minRow > maxRow) return [];

  const cropMinR = Math.max(0, minRow - 1);
  const cropMaxR = Math.min(gridRows - 1, maxRow + 1);
  const cropMinC = Math.max(0, minCol - 1);
  const cropMaxC = Math.min(gridCols - 1, maxCol + 1);

  const crosswordCells: CrosswordCell[] = [];
  for (let r = cropMinR; r <= cropMaxR; r++) {
    for (let c = cropMinC; c <= cropMaxC; c++) {
      if (finalGrid[r][c].letter !== "") {
        crosswordCells.push({
          r: r - cropMinR,
          c: c - cropMinC,
          letter: finalGrid[r][c].letter,
          wordIdx: finalGrid[r][c].wordIdx,
          wordNum: finalGrid[r][c].wordNum,
          isStart: finalGrid[r][c].isStart,
          across: finalGrid[r][c].across
        });
      }
    }
  }

  return crosswordCells;
}
