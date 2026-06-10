/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, FormEvent } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  User,
  Lock,
  ArrowRight,
  BookOpen,
  HelpCircle,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Award,
  LogOut,
  ChevronDown
} from "lucide-react";

import { academicDB } from "./data";
import { GradeKey, PeriodKey, StudentSession, EvaluationResults } from "./types";
import { getGradeColors, shuffleArray, generateCrosswordCells } from "./utils";
import { trueFalseQuestions } from "./trueFalseQuestions";

// Modules
import { Crossword } from "./components/Crossword";
import { WordSearch } from "./components/WordSearch";
import { ConceptMatch, MatchItem } from "./components/ConceptMatch";
import { TeacherConsole } from "./components/TeacherConsole";
import { TrueFalseQuiz } from "./components/TrueFalseQuiz";
import { FloatingBackground } from "./components/FloatingBackground";

// Google Apps Script endpoint used as base
const BASE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-xw2CeK9pYvwAIX1nm7bREbZooLZeInyC6PLJKXtR0o3hcZeXW80IflniQjR5mc2B_A/exec";

export default function App() {
  // Navigation View State
  const [view, setView] = useState<"login" | "eval" | "results">("login");
  const [isTeacherView, setIsTeacherView] = useState(false);

  // Authentication Fields
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginGrade, setLoginGrade] = useState<GradeKey>("6");
  const [loginPeriod, setLoginPeriod] = useState<PeriodKey>("1");
  const [chosenAvatar, setChosenAvatar] = useState("🚀");

  // Local student records for auto grade matching
  const [allStudentsList, setAllStudentsList] = useState<any[]>([]);

  useEffect(() => {
    const loadAllStudents = async () => {
      try {
        const response = await fetch(`${BASE_SCRIPT_URL}?action=list`);
        const data = await response.json();
        if (data && data.status === "success" && data.records) {
          setAllStudentsList(data.records);
          localStorage.setItem("buho_eval_records", JSON.stringify(data.records));
        } else {
          const local = localStorage.getItem("buho_eval_records");
          if (local) {
            setAllStudentsList(JSON.parse(local));
          }
        }
      } catch (err) {
        console.warn("Could not pre-load student database on mount. Using local storage.", err);
        const local = localStorage.getItem("buho_eval_records");
        if (local) {
          setAllStudentsList(JSON.parse(local));
        }
      }
    };
    loadAllStudents();
  }, []);

  const handleStudentNameChange = (name: string) => {
    setLoginUser(name);
    if (name.trim().length >= 3) {
      const match = allStudentsList.find(
        (rec) => rec.student.toLowerCase() === name.trim().toLowerCase()
      );
      if (match && match.grade) {
        setLoginGrade(match.grade as GradeKey);
      }
    }
  };

  // Loading indicator for network actions
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);

  // Active Session State
  const [session, setSession] = useState<StudentSession | null>(null);

  // Gamified Question States for Evaluation (Loaded once session begins)
  const [crosswordAnswers, setCrosswordAnswers] = useState<{ [key: string]: string }>({});
  const [wordSearchPainted, setWordSearchPainted] = useState<Set<string>>(new Set());
  const [conceptLinks, setConceptLinks] = useState<{ [key: number]: number | null }>({});
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [openAnswers, setOpenAnswers] = useState<{ [key: number]: string }>({});
  const [tfAnswers, setTfAnswers] = useState<{ [key: number]: boolean }>({});

  // Flag to lock the entire application UI and block any saving operations on timeout
  const [isTimeOutLocked, setIsTimeOutLocked] = useState(false);

  // Dynamic Concept Association Pools (Randomized 4-item list from 10 cues)
  const [activeMatchItems, setActiveMatchItems] = useState<MatchItem[]>([]);
  const [activeShuffledWords, setActiveShuffledWords] = useState<{ id: number; word: string }[]>([]);

  // Timer: 120 minutes = 7200 seconds
  const [secondsLeft, setSecondsLeft] = useState(7200);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Final Grade Result Storage
  const [results, setResults] = useState<EvaluationResults | null>(null);

  // Computed visual parameters based on active grade
  const gradeColors = useMemo(() => {
    return getGradeColors(session?.grade || "6");
  }, [session?.grade]);

  // Handle student login / GAS validation
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser.trim() || !loginPass.trim()) {
      alert("Por favor digite todos los campos requeridos para el ingreso.");
      return;
    }

    // Direct Administrator Entry Shortcut
    if (loginUser.trim().toLowerCase() === "profesor" && loginPass.trim() === "admin123") {
      setIsTeacherView(true);
      return;
    }

    // Check if evaluation data already exists in the database list to strictly block additional saving
    const localRecords = localStorage.getItem("buho_eval_records");
    if (localRecords) {
      try {
        const recordsList = JSON.parse(localRecords);
        const hasExisting = recordsList.some(
          (rec: any) =>
            rec.student.toLowerCase() === loginUser.trim().toLowerCase() &&
            String(rec.grade) === String(loginGrade) &&
            String(rec.period) === String(loginPeriod)
        );
        if (hasExisting) {
          alert(`Acceso Denegado: El estudiante "${loginUser.trim()}" ya cuenta con una calificación registrada para el Grado ${loginGrade}° - Periodo ${loginPeriod} en la base de datos de notas. No se permite guardar datos adicionales.`);
          return;
        }
      } catch (err) {
        console.error("Error parsing records", err);
      }
    }

    setIsLoggingIn(true);
    try {
      const payload = new URLSearchParams();
      payload.append("action", "login");
      payload.append("estudiante", loginUser.trim());
      payload.append("codigo", loginPass.trim());
      payload.append("grado", loginGrade);

      const response = await fetch(BASE_SCRIPT_URL, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();
      if (data && data.status === "success") {
        const studentSession: StudentSession = {
          user: loginUser.trim(),
          code: loginPass.trim(),
          grade: loginGrade,
          period: loginPeriod,
          avatar: chosenAvatar,
        };
        setSession(studentSession);

        // Prep games layout based on academic DB
        initializeAssignmentData(loginGrade, loginPeriod);

        // Transition view
        setView("eval");
        setSecondsLeft(7200); // 120 minutes countdown
      } else {
        alert(`Ingreso Denegado: ${data.message || "Las credenciales no coinciden con la base de datos escolar."}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error de red: No se pudo verificar tu cuenta contra el servidor escolar. Por favor, reintenta.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Generate randomized subsets for concept pairing once evaluation loads
  const initializeAssignmentData = (grade: GradeKey, period: PeriodKey) => {
    const data = academicDB[grade]?.[period] || academicDB["6"]["1"];

    // Select 4 random questions indices for concept match
    let indices = Array.from({ length: data.cwWords.length }, (_, i) => i);
    indices = shuffleArray(indices).slice(0, 4);

    const matchItems: MatchItem[] = indices.map((idx) => {
      // Clean leading index digits
      const cleanedPista = data.cwPistas[idx].replace(/^\d+\.\s*/, "").replace(/^•\s*/, "");
      return {
        id: idx,
        word: data.cwWords[idx],
        pista: cleanedPista,
      };
    });

    // Slices for concept mapping values
    setActiveMatchItems(matchItems);

    const shuffledWords = shuffleArray(
      matchItems.map((item) => ({ id: item.id, word: item.word }))
    );
    setActiveShuffledWords(shuffledWords);

    // Initialize state
    const initialLinks: { [key: number]: number | null } = {};
    matchItems.forEach((item) => {
      initialLinks[item.id] = null;
    });
    setConceptLinks(initialLinks);

    // Empty student input models
    setCrosswordAnswers({});
    setWordSearchPainted(new Set());
    setQuizAnswers({});
    setOpenAnswers({});
    setTfAnswers({});
    setIsTimeOutLocked(false);
    setResults(null);
  };

  // Timer effect
  useEffect(() => {
    if (view === "eval") {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            autoSubmitOnTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view]);

  const autoSubmitOnTimeout = () => {
    alert("¡Atención! El tiempo de tu evaluación ha terminado. Se guardarán tus respuestas actuales de forma automática.");
    evaluateAndSubmit(true);
  };

  // Main single score evaluation computation (VERIFICA UNA SOLA VEZ)
  const evaluateAndSubmit = async (forced: boolean = false) => {
    if (!session) return;

    const activeTfQuestions = trueFalseQuestions[session.grade]?.[session.period] || [];

    if (!forced) {
      const hasEmptyCrossword = Object.keys(crosswordAnswers).length === 0;
      const hasEmptySopa = wordSearchPainted.size === 0;
      const hasEmptyMatch = Object.values(conceptLinks).every((v) => v === null);
      const data = academicDB[session.grade]?.[session.period] || academicDB["6"]["1"];
      const hasEmptyQuiz = Object.keys(quizAnswers).length < data.quiz.length;
      const hasEmptyTf = Object.keys(tfAnswers).length < activeTfQuestions.length;

      if (hasEmptyCrossword || hasEmptySopa || hasEmptyMatch || hasEmptyQuiz || hasEmptyTf) {
        const confirmCheck = window.confirm(
          "Aún tienes ejercicios interactivos sin resolver por completo (incluyendo los postulados de Verdadero/Falso). Si continúas, las casillas sin responder serán calificadas como incorrectas. ¿Deseas enviar tus respuestas de todas maneras?"
        );
        if (!confirmCheck) return;
      } else {
        const finalConfirm = window.confirm(
          "¿Estás seguro de que deseas finalizar tu evaluación? Tu calificación se guardará directamente de forma definitiva y no podrás corregir tus plantillas."
        );
        if (!finalConfirm) return;
      }
    }

    setIsSubmittingScore(true);

    const activeData = academicDB[session.grade]?.[session.period] || academicDB["6"]["1"];

    // 1. Crossword Score (Ratio of correctly filled cells matched with precise letter)
    const crosswordCells = generateCrosswordCells(activeData.cwWords);
    let correctCw = 0;
    crosswordCells.forEach((cell) => {
      const key = `${cell.r},${cell.c}`;
      if (crosswordAnswers[key]?.toUpperCase() === cell.letter.toUpperCase()) {
        correctCw++;
      }
    });
    const cwRawScore = crosswordCells.length > 0 ? (correctCw / crosswordCells.length) * 10 : 0;

    // 2. Word Search Score (Ratio of selected cells. Ideal painted minimum is 12 cells)
    const paintedCount = wordSearchPainted.size;
    const sopaRawScore = paintedCount >= 12 ? 10.0 : (paintedCount / 12) * 10.0;

    // 3. Connection/Concept Match Score (Each matching concept gives 2.5 points)
    let correctMatches = 0;
    Object.keys(conceptLinks).forEach((keyStr) => {
      const defId = parseInt(keyStr, 10);
      const assignedId = conceptLinks[defId];
      if (assignedId === defId) {
        correctMatches++;
      }
    });
    const matchRawScore = correctMatches * 2.5; // Up to 10 points for 4 matches

    // 4. MCQ Quiz section (Ratio of correct answers * 10 points)
    let correctQuiz = 0;
    activeData.quiz.forEach((q, idx) => {
      const answered = quizAnswers[idx];
      if (answered === q.a) {
        correctQuiz++;
      }
    });
    const quizRawScore = activeData.quiz.length > 0 ? (correctQuiz / activeData.quiz.length) * 10 : 10;

    // 5. True & False Section (Ratio of correct answers * 10 points)
    let correctTf = 0;
    activeTfQuestions.forEach((q, idx) => {
      const answered = tfAnswers[idx];
      if (answered === q.a) {
        correctTf++;
      }
    });
    const tfRawScore = activeTfQuestions.length > 0 ? (correctTf / activeTfQuestions.length) * 10 : 10;

    // Composite Cumulative Score Sum: Maximum is 50.0 points
    const sumPoints = cwRawScore + sopaRawScore + matchRawScore + quizRawScore + tfRawScore;
    let finalScore = parseFloat((sumPoints / 10).toFixed(1));

    // Caps & limits safety (Standard 1.0 - 5.0 scale)
    if (finalScore > 5.0) finalScore = 5.0;
    if (finalScore < 1.0) finalScore = 1.0;

    const finalResultsObj: EvaluationResults = {
      cwRawScore,
      sopaRawScore,
      matchRawScore,
      quizRawScore,
      tfRawScore,
      finalScore,
    };

    setResults(finalResultsObj);

    // Save record to Google Sheets / Apps Script backend
    try {
      // Direct local verification to prevent registering multiple rows for the same student session
      const local = localStorage.getItem("buho_eval_records");
      const list = local ? JSON.parse(local) : [];
      const alreadyHasScore = list.some(
        (rec: any) =>
          rec.student.toLowerCase() === session.user.toLowerCase() &&
          String(rec.grade) === String(session.grade) &&
          String(rec.period) === String(session.period)
      );

      if (!alreadyHasScore) {
        const payload = new URLSearchParams();
        payload.append("action", "save");
        payload.append("estudiante", session.user);
        payload.append("grado", session.grade);
        payload.append("periodo", session.period);
        payload.append("puntaje", finalScore.toFixed(1));

        const response = await fetch(BASE_SCRIPT_URL, {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const resData = await response.json();
        if (resData && resData.status === "success") {
          const date = new Date();
          const formattedDate = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
            date.getMonth() + 1 < 10 ? "0" : ""
          }${date.getMonth() + 1}/${date.getFullYear()} ${
            date.getHours() < 10 ? "0" : ""
          }${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;

          list.push({
            grade: session.grade,
            period: session.period,
            student: session.user,
            score: finalScore.toFixed(1),
            timestamp: formattedDate,
          });
          localStorage.setItem("buho_eval_records", JSON.stringify(list));
        } else {
          // Fallback if sheets API returned non-success
          throw new Error("API reports non-success");
        }
      }
    } catch (err) {
      console.warn("Could not save to Google Sheet backend, writing locally.", err);
      // Fail-safe storage check to avoid duplicates here too
      const local = localStorage.getItem("buho_eval_records");
      const list = local ? JSON.parse(local) : [];
      const alreadyHasScore = list.some(
        (rec: any) =>
          rec.student.toLowerCase() === session.user.toLowerCase() &&
          String(rec.grade) === String(session.grade) &&
          String(rec.period) === String(session.period)
      );
      if (!alreadyHasScore) {
        const date = new Date();
        const formattedDate = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
          date.getMonth() + 1 < 10 ? "0" : ""
        }${date.getMonth() + 1}/${date.getFullYear()} ${
          date.getHours() < 10 ? "0" : ""
        }${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;

        list.push({
          grade: session.grade,
          period: session.period,
          student: session.user,
          score: finalScore.toFixed(1),
          timestamp: formattedDate || "Local Sync Success",
        });
        localStorage.setItem("buho_eval_records", JSON.stringify(list));
      }
    } finally {
      setIsSubmittingScore(false);
      if (forced) {
        setIsTimeOutLocked(true);
      } else {
        setView("results");
      }
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  // Format countdown clock
  const getTimerString = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Feedback recommendation text generator
  const getRecommendation = (score: number) => {
    if (score === 5.0) {
      return {
        title: "¡Logro Extraordinario!",
        body: "Has alcanzado la nota máxima perfecta de 5.0. Has demostrado un dominio absoluto y un excelente rigor de análisis ante cada reto académico.",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      };
    } else if (score >= 4.0) {
      return {
        title: "¡Nivel de Excelencia!",
        body: "¡Felicitaciones! Demuestras competencias tecnológicas admirables, deducción ágil en los acertijos y un excelente marco conceptual de la unidad.",
        color: "text-blue-700 bg-blue-50 border-blue-200",
      };
    } else if (score >= 3.0) {
      return {
        title: "Evaluación Aprobada",
        body: "Has superado el umbral básico de desempeño. Te recomendamos repasar los acertijos incorrectos para consolidar tu aprendizaje en el aula.",
        color: "text-amber-700 bg-amber-50 border-amber-200",
      };
    } else {
      return {
        title: "Necesita Refuerzo",
        body: "Aún quedan dudas por resolver en esta temática informática. No te desanimes, repasa el material pedagógico de este periodo y consulta a tu profesor.",
        color: "text-red-700 bg-red-50 border-red-200",
      };
    }
  };

  // Render teacher panel inside app layout
  if (isTeacherView) {
    return (
      <div className="min-h-screen py-6 px-4 sm:px-6 md:px-8 flex items-center justify-center font-sans tracking-tight bg-gradient-to-tr from-sky-50 via-blue-50/40 to-indigo-50/70 relative overflow-hidden">
        {/* Floating animated gradient background & particles */}
        <FloatingBackground />

        <div className="w-full max-w-5xl z-10">
          <TeacherConsole
            baseScriptUrl={BASE_SCRIPT_URL}
            onBack={() => setIsTeacherView(false)}
          />
        </div>
      </div>
    );
  }

  // Pre-sort crossword clues numerically in order paired with custom grid assigned numbers
  const crosswordPistasWithNumbers = useMemo(() => {
    if (!session) return [];
    const activeData = academicDB[session.grade]?.[session.period];
    if (!activeData) return [];
    
    const crosswordCells = generateCrosswordCells(activeData.cwWords);
    
    // Find assigned number for each word index
    const result = activeData.cwWords.map((word, idx) => {
      const startCell = crosswordCells.find(c => c.wordIdx === idx && c.isStart);
      const wordNum = startCell ? startCell.wordNum : (idx + 1);
      const rawPista = activeData.cwPistas[idx] || "Pista temática informática...";
      // Clean leading digit labels e.g. "1. Hardware" -> "Hardware"
      const cleanedPista = rawPista.replace(/^\d+[\.\s]*/, "").replace(/^•\s*/, "");
      return {
        wordNum,
        pista: cleanedPista,
        word
      };
    });
    
    // Sort numerically by the crossword cell number
    return result.sort((a, b) => a.wordNum - b.wordNum);
  }, [session?.grade, session?.period]);

  // Alphabetically sorted answer list for the crossword word bank
  const crosswordAnswersListAlphabetical = useMemo(() => {
    if (!session) return [];
    const activeData = academicDB[session.grade]?.[session.period];
    if (!activeData) return [];
    return [...activeData.cwWords].map(w => w.toUpperCase()).sort((a, b) => a.localeCompare(b));
  }, [session?.grade, session?.period]);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 md:px-8 flex items-center justify-center font-sans tracking-tight bg-gradient-to-tr from-sky-50 via-blue-50/40 to-indigo-50/70 relative overflow-hidden">
      {/* Floating animated gradient background & particles matching login or session grade */}
      <FloatingBackground grade={session ? session.grade : loginGrade} />

      <div className="w-full max-w-4xl select-none z-10 text-slate-800">
        
        {/* VIEW 1: AUTH LOGIN CARD */}
        {view === "login" && (
          <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 rounded-[32px] shadow-[0_20px_40px_-5px_rgba(139,92,246,0.08),0_10px_20px_-10px_rgba(139,92,246,0.06)] hover:border-purple-400 hover:shadow-[0_25px_50px_-5px_rgba(139,92,246,0.12),0_15px_25px_-10px_rgba(139,92,246,0.08)] transition-all duration-500 p-10">
            {/* Mascot Buho Section */}
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-100/90 border-2 border-purple-250/80 rounded-3xl shadow-lg flex items-center justify-center text-6xl hover:scale-105 transition-transform duration-300">
                🦉
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest scale-90 shadow-md">
                  Buho
                </span>
              </div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-sky-655 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                evaluaciones_BUHO
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Sistemas Interactivos de Evaluación Tecnológica Escolar
              </p>
            </div>

            <form id="student-login-form" onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-2">
                  Nombres y Apellidos:
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                  <input
                    id="student-name-input"
                    type="text"
                    required
                    value={loginUser}
                    onChange={(e) => handleStudentNameChange(e.target.value)}
                    placeholder="Ej. David Alejandro Sanchez"
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-3xl bg-slate-50 text-slate-700 font-semibold outline-none transition-all duration-300 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100/60 placeholder-slate-400 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-2">
                  Código de Estudiante / Contraseña:
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    id="student-code-input"
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Tu primer apellido (Contraseña)"
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-3xl bg-slate-50 text-slate-700 font-semibold outline-none transition-all duration-300 hover:border-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100/60 placeholder-slate-400 text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-2">
                    Grado Escolar:
                  </label>
                  <div className="relative">
                    <select
                      id="student-grade-select"
                      value={loginGrade}
                      onChange={(e) => setLoginGrade(e.target.value as GradeKey)}
                      className="w-full appearance-none px-4 py-3.5 border-2 border-slate-200 rounded-2xl text-slate-705 bg-white font-bold outline-none hover:border-purple-350 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm cursor-pointer whitespace-nowrap shadow-sm"
                    >
                      <option value="6">Sexto (6°)</option>
                      <option value="7">Séptimo (7°)</option>
                      <option value="8">Octavo (8°)</option>
                      <option value="9">Noveno (9°)</option>
                      <option value="10">Décimo (10°)</option>
                      <option value="11">Undécimo (11°)</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5 pl-2">
                    Periodo Académico:
                  </label>
                  <div className="relative">
                    <select
                      id="student-period-select"
                      value={loginPeriod}
                      onChange={(e) => setLoginPeriod(e.target.value as PeriodKey)}
                      className="w-full appearance-none px-4 py-3.5 border-2 border-slate-200 rounded-2xl text-slate-705 bg-white font-bold outline-none hover:border-purple-350 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 transition-all text-sm cursor-pointer shadow-sm"
                    >
                      <option value="1">Periodo I</option>
                      <option value="2">Periodo II</option>
                      <option value="3">Periodo III</option>
                      <option value="4">Periodo IV</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5 text-center">
                  Elige tu Avatar de Evaluación:
                </label>
                <div className="flex gap-4.5 justify-center">
                  {["🚀", "💻", "⚡", "🔬", "🤖"].map((avatar) => {
                     const isSelected = chosenAvatar === avatar;
                     return (
                       <button
                         key={avatar}
                         type="button"
                         onClick={() => setChosenAvatar(avatar)}
                         className={`w-16 h-16 rounded-3xl text-3xl flex items-center justify-center transition-all duration-300 border-2 ${
                           isSelected
                             ? "border-purple-550 bg-gradient-to-br from-purple-50 via-white to-indigo-50 ring-2 ring-purple-200 scale-110 shadow-lg shadow-purple-100/60"
                             : "border-slate-200 bg-white hover:bg-slate-50 hover:border-purple-300 hover:scale-105 cursor-pointer hover:shadow-sm"
                         }`}
                       >
                         {avatar}
                       </button>
                     );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full py-4 text-base font-black shadow-xl shadow-blue-100/70 hover:scale-[1.025] hover:shadow-blue-200/80 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:scale-100 disabled:shadow-none"
              >
                {isLoggingIn ? "Autenticando..." : "Ingresar a Evaluación"}
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            {/* Quick entry portal disclaimer for teachers */}
            <div className="mt-8 border-t border-slate-100 pt-5 text-center">
              <button
                type="button"
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600 tracking-wide underline uppercase cursor-pointer transition-colors"
                onClick={() => {
                  setLoginUser("profesor");
                  setLoginPass("admin123");
                }}
              >
                Ingreso Rápido de Administrador (Profesor / Ver Notas)
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: ACTIVE EVALUATION FRAME */}
        {view === "eval" && session && (
          isTimeOutLocked ? (
            <div className="bg-white border border-rose-200 rounded-[32px] shadow-xl p-8 max-w-md mx-auto text-center flex flex-col gap-5 animate-fade-in">
              <div className="w-16 h-16 bg-rose-50 border border-rose-100/50 rounded-2xl flex items-center justify-center text-4xl text-rose-600 shadow-sm mx-auto relative animate-pulse">
                🔒
              </div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">PLATAFORMA CERRADA</h1>
              <p className="text-rose-600 text-xs font-bold uppercase tracking-wider">
                ¡Límite de Tiempo de Evaluación Expirado!
              </p>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                La plataforma escolar ha cerrado tu sesión debido al agotamiento del temporizador de 120 minutos. 
                Tus respuestas registradas de forma parcial han sido consolidadas y enviadas de forma segura a la base de datos de calificaciones académicas.
              </p>

              {results && (
                <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl text-center shadow-sm">
                  <span className="text-[10px] font-black text-rose-500 tracking-wider uppercase block mb-1">Tu Nota de Cierre:</span>
                  <span className="text-3xl font-black text-rose-600">
                    {results.finalScore.toFixed(1)}
                  </span>
                  <span className="text-xs font-bold text-rose-400 ml-1">/ 5.0</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setView("login");
                  setSession(null);
                  setIsTimeOutLocked(false);
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-colors shadow-sm focus:outline-none cursor-pointer"
              >
                Cerrar Sesión e Ir al Inicio
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-purple-200/90 rounded-[32px] shadow-2xl hover:border-purple-400 hover:shadow-purple-100/20 overflow-hidden p-6 sm:p-8 flex flex-col gap-8 animate-fade-in transition-all duration-300">
              {/* Visual Top Header metadata bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-purple-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-50 border-2 border-purple-200/60 rounded-2xl flex items-center justify-center text-3xl shadow-inner shadow-purple-50">
                    {session.avatar}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
                      {session.user}
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 border-2 border-purple-200 bg-purple-50 text-purple-700 rounded-full shadow-sm">
                        Grado {session.grade}°
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-405 font-bold tracking-wide uppercase flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      Periodo {session.period} • Escuela Tecnológica
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 bg-slate-50 border-2 border-purple-150 px-4 py-2 rounded-2xl self-stretch sm:self-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-550">
                    <Clock className="w-4 h-4 text-purple-500" />
                    TIEMPO DISPONIBLE:
                  </div>
                  <span className="text-lg font-black font-mono text-purple-600 select-all tracking-wider leading-none">
                    {getTimerString()}
                  </span>
                </div>
              </div>

              {/* Academics Topic Alert Badge */}
              <div className="p-4 rounded-2xl border-2 flex items-center gap-3 bg-white border-purple-200 shadow-sm">
                <div className="p-2.5 bg-slate-50 border border-purple-100 rounded-xl shadow-sm text-slate-800 text-lg leading-none">🦉</div>
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    Temática Central de la Unidad:
                  </span>
                  <span className="text-sm font-black text-purple-700">
                    {academicDB[session.grade]?.[session.period]?.topic || "Asignatura Tecnológica"}
                  </span>
                </div>
              </div>

              {/* SECTIONS LAYOUTS */}

              {/* SECTION 1: CROSSWORD */}
              <div className="flex flex-col gap-4 border-2 border-purple-200/90 hover:border-purple-400 bg-slate-50/20 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-100/10 transition-all duration-350">
                <div className="flex items-start gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center border-2 border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                    01
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Crucigrama Temático Interactivo</h4>
                    <p className="text-slate-500 text-xs leading-normal">Completa las casillas rellenando las letras entrelazadas. Usa las flechas de dirección de tu teclado para moverte rápido!</p>
                  </div>
                </div>

                <Crossword
                  words={academicDB[session.grade]?.[session.period]?.cwWords || []}
                  answers={crosswordAnswers}
                  setAnswers={setCrosswordAnswers}
                  isSubmitted={false}
                />

                {/* Banco de Palabras del Crucigrama (Mostrar las palabras buscadas de forma ordenada) */}
                <div className="bg-white p-4 border-2 border-purple-200/85 rounded-xl shadow-sm flex flex-col gap-2.5">
                  <h5 className="text-[11px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
                    ✨ Banco de Palabras (Conceptos a buscar):
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {crosswordAnswersListAlphabetical.map((word, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100/60 hover:bg-purple-100 border border-purple-200/80 px-2.5 py-1 rounded-full text-xs font-bold text-purple-800 tracking-wide uppercase transition-colors select-none"
                      >
                        {word.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collapsed/List of Crossword hints */}
                <div className="bg-white p-4 border-2 border-purple-200/80 rounded-xl mt-2 shadow-sm">
                  <h5 className="text-xs font-black text-slate-700 mb-2.5 uppercase tracking-wide">Pistas del Crucigrama ({crosswordPistasWithNumbers.length} conceptos ordenados):</h5>
                  <ul className="space-y-1.5 text-slate-500 text-xs leading-relaxed max-h-56 overflow-y-auto custom-scrollbar pr-1">
                    {crosswordPistasWithNumbers.map((item, idx) => (
                      <li key={idx} className="flex gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-150 hover:border-purple-300 hover:bg-white transition-all">
                        <span className="font-black text-purple-500 min-w-[20px]">{item.wordNum}.</span>
                        <span className="font-semibold text-slate-650">{item.pista}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION 2: WORD SEARCH */}
              <div className="flex flex-col gap-4 border-2 border-purple-200/90 hover:border-purple-400 bg-slate-50/20 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-100/10 transition-all duration-350">
                <div className="flex items-start gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center border-2 border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                    02
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Sopa de Letras Interactiva</h4>
                    <p className="text-slate-500 text-xs leading-normal">Elige un tono de nuestra paleta superior y haz clic sobre las letras en la grilla para pintar los conceptos correspondientes a la unidad.</p>
                  </div>
                </div>

                <WordSearch
                  words={academicDB[session.grade]?.[session.period]?.sopaWords || []}
                  pistas={academicDB[session.grade]?.[session.period]?.sopaPistas || []}
                  paintedCells={wordSearchPainted}
                  setPaintedCells={setWordSearchPainted}
                  isSubmitted={false}
                  gradeColorAccent="purple"
                />
              </div>

              {/* SECTION 3: CONCEPT MATCH */}
              <div className="flex flex-col gap-4 border-2 border-purple-200/90 hover:border-purple-400 bg-slate-50/20 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-100/10 transition-all duration-350">
                <div className="flex items-start gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center border-2 border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                    03
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Asociación y Correspondencia de Conceptos</h4>
                    <p className="text-slate-500 text-xs leading-normal">Asocia cada concepto conceptual con su definición. Haz clic en un término de la barra superior y luego en su casilla de destino.</p>
                  </div>
                </div>

                <ConceptMatch
                  matchItems={activeMatchItems}
                  shuffledWords={activeShuffledWords}
                  conceptLinks={conceptLinks}
                  setConceptLinks={setConceptLinks}
                  isSubmitted={false}
                />
              </div>

              {/* SECTION 4: MULTIPLE CHOICE AND OPEN ANALYSIS */}
              <div className="flex flex-col gap-4 border-2 border-purple-200/90 hover:border-purple-400 bg-slate-50/20 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-100/10 transition-all duration-350">
                <div className="flex items-start gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center border-2 border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                    04
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Cuestionario Académico y Análisis Crítico</h4>
                    <p className="text-slate-500 text-xs leading-normal">Contesta las preguntas de opción múltiple y redacta un análisis breve según la pregunta teórica.</p>
                  </div>
                </div>

                {/* MCQs */}
                <div className="space-y-5">
                  {(academicDB[session.grade]?.[session.period]?.quiz || []).map((question, idx) => (
                    <div key={idx} className="p-5 bg-white border-2 border-purple-100 hover:border-purple-300 rounded-2xl transition-all duration-300 shadow-sm">
                      <h5 className="font-bold text-slate-700 text-xs flex items-center gap-1.5 mb-3 leading-snug">
                        <HelpCircle className="w-4.5 h-4.5 text-purple-500 shrink-0" />
                        Pregunta MCQ {idx + 1}: {question.q}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {question.o.map((option, oIdx) => {
                          const isChosen = quizAnswers[idx] === option;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setQuizAnswers((p) => ({ ...p, [idx]: option }))}
                              className={`p-3 text-left border-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                                isChosen
                                  ? "bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-100 font-bold scale-[1.01]"
                                  : "bg-white hover:bg-slate-50 text-slate-650 border-slate-200 hover:border-purple-305"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Open analysis */}
                  {(academicDB[session.grade]?.[session.period]?.open || []).map((qOpen, idx) => (
                    <div key={idx} className="p-5 bg-white border-2 border-purple-100 hover:border-purple-300 rounded-2xl transition-all duration-300 shadow-sm">
                      <h5 className="font-bold text-slate-700 text-xs flex items-center gap-1.5 mb-3 leading-snug">
                        <BookOpen className="w-4.5 h-4.5 text-purple-500 shrink-0" />
                        Pregunta de Redacción {idx + 1}: [Análisis Técnico] {qOpen.q}
                      </h5>

                      <textarea
                        rows={3}
                        value={openAnswers[idx] || ""}
                        onChange={(e) => setOpenAnswers((p) => ({ ...p, [idx]: e.target.value }))}
                        placeholder="Redacta de manera clara tu análisis técnico conceptual aquí..."
                        className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 text-xs font-semibold text-slate-700 bg-white transition-all"
                      />
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mt-1.5">
                        <span>Argumentación crítica escolar</span>
                        <span>{(openAnswers[idx] || "").length} caracteres</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: TRUE OR FALSE QUESTIONS */}
              <div className="flex flex-col gap-4 border-2 border-purple-200/90 hover:border-purple-400 bg-slate-50/20 p-5 rounded-2xl hover:shadow-xl hover:shadow-purple-100/10 transition-all duration-350">
                <div className="flex items-start gap-3 border-b-2 border-purple-100 pb-3">
                  <div className="w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center border-2 border-purple-200 bg-purple-50 text-purple-700 shadow-sm">
                    05
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Postulados Académicos de Verdadero o Falso</h4>
                    <p className="text-slate-500 text-xs leading-normal">Determina la veracidad de cada postulado de análisis según los conceptos técnicos del periodo.</p>
                  </div>
                </div>

                <TrueFalseQuiz
                  questions={trueFalseQuestions[session.grade]?.[session.period] || []}
                  answers={tfAnswers}
                  onChange={(idx, val) => setTfAnswers((prev) => ({ ...prev, [idx]: val }))}
                  disabled={isSubmittingScore}
                />
              </div>

              {/* UNIFIED SUBMISSION (VERIFICA EN UN SOLO CODIGO) */}
              <div className="border-t-2 border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-500 max-w-sm leading-relaxed">
                    Al enviar la evaluación interactiva, el sistema escolar procesará el total de tus respuestas (incluyendo el módulo de Verdadero/Falso) y emitirá tu boletín final.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => evaluateAndSubmit(false)}
                  disabled={isSubmittingScore}
                  className="px-8 py-4 text-white text-sm font-black rounded-2xl shadow-md shadow-indigo-100/60 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 hover:from-sky-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-200/50 transition-all flex items-center justify-center gap-2 tracking-wide font-display disabled:bg-slate-300 cursor-pointer w-full sm:w-auto hover:scale-[1.025]"
                >
                  {isSubmittingScore ? "Enviando Calificación..." : "Verificar y Enviar Examen"}
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                </button>
              </div>
            </div>
          )
        )}

        {/* VIEW 3: REPORT CARD CALIFICACIÓN FINAL RESULT */}
        {view === "results" && session && results && (
          <div className="bg-white border-2 border-indigo-200/95 rounded-[32px] shadow-2xl p-8 max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in hover:border-indigo-400 transition-all duration-300">
            {/* Visual Header Congrats status */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 text-3xl">
                <Award className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight font-display">¡Evaluación Completada!</h1>
                <p className="text-slate-500 text-xs font-semibold">Tus respuestas han sido evaluadas y registradas en la planilla de notas.</p>
              </div>
            </div>

            {/* Main score visual card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border-2 border-indigo-150 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-inner">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{session.avatar}</span>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-850">{session.user}</h4>
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Grado {session.grade}° • Periodo {session.period}</p>
                </div>
              </div>

              {/* Tally badge */}
              <div className="bg-white border-2 border-indigo-300 px-6 py-4 rounded-2xl text-center shadow-md shadow-indigo-50 min-w-[140px]">
                <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block mb-1">Tu Nota Final:</span>
                <span className={`text-4xl font-black tracking-tight ${results.finalScore >= 3.0 ? "text-indigo-600" : "text-rose-600"}`}>
                  {results.finalScore.toFixed(1)}
                </span>
                <span className="text-xs font-bold text-slate-400 ml-1">/ 5.0</span>
              </div>
            </div>

            {/* Performance Level and personalized suggestion */}
            {(() => {
              const rec = getRecommendation(results.finalScore);
              return (
                <div className={`p-4.5 border-2 rounded-2xl flex gap-3 ${rec.color}`}>
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wide leading-none mb-1">{rec.title}</h5>
                    <p className="text-xs font-semibold leading-relaxed">{rec.body}</p>
                  </div>
                </div>
              );
            })()}

            {/* Section Breakdown and results check */}
            <div className="space-y-3">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Desglose de Resultados:</h5>
              
              {/* Row Crossword */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/40 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-2xl text-xs font-bold transition-all shadow-sm">
                <span className="text-slate-600">1. Crucigrama Interactivo</span>
                <span className="font-bold text-slate-850 font-mono">{(results.cwRawScore).toFixed(1)} / 10 pts</span>
              </div>

              {/* Row Word Search */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/40 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-2xl text-xs font-bold transition-all shadow-sm">
                <span className="text-slate-600">2. Sopa de Letras</span>
                <span className="font-bold text-slate-855 font-mono">{(results.sopaRawScore).toFixed(1)} / 10 pts</span>
              </div>

              {/* Row Link Match */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/40 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-2xl text-xs font-bold transition-all shadow-sm">
                <span className="text-slate-600">3. Asociación de Conceptos</span>
                <span className="font-bold text-slate-850 font-mono">{(results.matchRawScore).toFixed(1)} / 10 pts</span>
              </div>

              {/* Row MCQ */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/40 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-2xl text-xs font-bold transition-all shadow-sm">
                <span className="text-slate-600">4. Cuestionario de Opción Múltiple</span>
                <span className="font-bold text-slate-850 font-mono">{(results.quizRawScore).toFixed(1)} / 10 pts</span>
              </div>

              {/* Row True/False */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50/40 border border-slate-200 hover:border-indigo-300 hover:bg-white rounded-2xl text-xs font-bold transition-all shadow-sm">
                <span className="text-slate-600">5. Juicios de Verdadero o Falso</span>
                <span className="font-bold text-slate-850 font-mono">{(results.tfRawScore).toFixed(1)} / 10 pts</span>
              </div>
            </div>

            {/* Check responses details view toggle or exit */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => {
                  setView("login");
                  setSession(null);
                  setResults(null);
                }}
                className="flex-grow bg-slate-800 text-white font-bold py-3.5 px-4 rounded-2xl text-xs hover:bg-slate-900 transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión e Ir a Inicio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
