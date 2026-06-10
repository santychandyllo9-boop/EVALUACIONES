/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GradeKey = "6" | "7" | "8" | "9" | "10" | "11";
export type PeriodKey = "1" | "2" | "3" | "4";

export interface StudentSession {
  user: string;
  code: string;
  grade: GradeKey;
  period: PeriodKey;
  avatar: string;
}

export interface EvaluationResults {
  cwRawScore: number;
  sopaRawScore: number;
  matchRawScore: number;
  quizRawScore: number;
  tfRawScore: number;
  finalScore: number;
}
