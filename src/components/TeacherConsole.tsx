/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from "react";
import {
  GraduationCap,
  Calendar,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Download,
  Trash2,
  RefreshCw,
  TrendingUp,
  Award,
  ChevronLeft
} from "lucide-react";
import { GradeKey, PeriodKey } from "../types";

interface TeacherConsoleProps {
  baseScriptUrl: string;
  onBack: () => void;
}

interface GradeRecord {
  grade: GradeKey;
  period: PeriodKey;
  student: string;
  score: string;
  timestamp?: string;
}

export function TeacherConsole({ baseScriptUrl, onBack }: TeacherConsoleProps) {
  const [records, setRecords] = useState<GradeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGrade, setFilterGrade] = useState<"ALL" | GradeKey>("ALL");
  const [filterPeriod, setFilterPeriod] = useState<"ALL" | PeriodKey>("ALL");

  // Load records from endpoint or local store fallback
  const fetchRecords = async () => {
    setIsLoading(true);
    setErrorInfo(null);
    try {
      const response = await fetch(`${baseScriptUrl}?action=list`);
      const data = await response.json();
      if (data && data.status === "success" && data.records) {
        setRecords(data.records);
        // Persist local duplicate backup
        localStorage.setItem("buho_eval_records", JSON.stringify(data.records));
      } else {
        throw new Error(data.message || "Failed to parse records list");
      }
    } catch (err: any) {
      console.warn("API Error. Loading local backup localstorage records instead.", err);
      const local = localStorage.getItem("buho_eval_records");
      if (local) {
        setRecords(JSON.parse(local));
      } else {
        setErrorInfo("No fue posible comunicarse con el servidor de Sheets y no se detectaron copias locales.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [baseScriptUrl]);

  // Derived filtered listing
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchName = rec.student.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGrade = filterGrade === "ALL" ? true : String(rec.grade) === String(filterGrade);
      const matchPeriod = filterPeriod === "ALL" ? true : String(rec.period) === String(filterPeriod);
      return matchName && matchGrade && matchPeriod;
    });
  }, [records, searchQuery, filterGrade, filterPeriod]);

  // Aggregate computations
  const stats = useMemo(() => {
    const total = filteredRecords.length;
    if (total === 0) {
      return { total: 0, average: 0, passingCount: 0, passingPct: 0 };
    }

    let sum = 0;
    let passing = 0;
    filteredRecords.forEach((r) => {
      const num = parseFloat(r.score) || 0;
      sum += num;
      if (num >= 3.0) {
        passing++;
      }
    });

    const average = parseFloat((sum / total).toFixed(2));
    const passingPct = Math.round((passing / total) * 100);

    return { total, average, passingCount: passing, passingPct };
  }, [filteredRecords]);

  // Specific single or batch deletion
  const handleDeleteRecord = (student: string, grade: GradeKey, period: PeriodKey) => {
    const confirmVal = window.confirm(
      `¿Está absolutamente seguro de que desea eliminar la calificación de "${student}" para Grado Enlace ${grade}° (Periodo ${period})?`
    );
    if (!confirmVal) return;

    const key = `${student}_${grade}_${period}`.toLowerCase();
    const updated = records.filter(
      (rec) =>
        `${rec.student}_${rec.grade}_${rec.period}`.toLowerCase() !== key
    );
    setRecords(updated);
    localStorage.setItem("buho_eval_records", JSON.stringify(updated));
    alert("Calificación borrada exitosamente con éxito de modo local. Por favor, guarde una copia local.");
  };

  const handleClearAll = () => {
    const confirmVal = window.confirm(
      "¡Atención Peligro! Se vaciará por completo la planilla de almacenamiento. ¿Deseas borrar TODOS los registros almacenados?"
    );
    if (!confirmVal) return;

    setRecords([]);
    localStorage.setItem("buho_eval_records", JSON.stringify([]));
    alert("Planilla vaciada localmente.");
  };

  // Convert array records to local CSV spreadsheet download action
  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      alert("No existen filas actualmente para exportar.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    // Header
    csvContent += "Estudiante,Grado,Periodo,Nota,Timestamp\n";

    filteredRecords.forEach((rec) => {
      // Escape commas & special characters
      const cleanName = rec.student.replace(/"/g, '""');
      const stamp = rec.timestamp || "";
      csvContent += `"${cleanName}","${rec.grade}","${rec.period}","${rec.score}","${stamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", encodedUri);
    downloadAnchor.setAttribute("download", "Planilla_Notas_Buho.csv");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] shadow-xl p-6 sm:p-8 flex flex-col gap-6 animate-fade-in w-full text-slate-800">
      
      {/* Top action header trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors shrink-0 text-slate-600 outline-none cursor-pointer"
            title="Volver a autenticación"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
              🦉 Consola de Control de Profesor
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Planilla y Visualizador de Calificaciones Escolares
            </p>
          </div>
        </div>

        {/* Action utility hooks */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={fetchRecords}
            disabled={isLoading}
            className="py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Sincronizar
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Descargar CSV
          </button>
        </div>
      </div>

      {/* DASHBOARD GAUGES BENTO CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total stats */}
        <div className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Evaluaciones:</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-slate-850 font-mono">{stats.total}</span>
            <span className="text-[10px] text-slate-405 font-semibold bg-slate-100 py-0.5 px-1.5 rounded-md">Alumnos</span>
          </div>
        </div>

        {/* Global Average score banner */}
        <div className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Nota Promedio:</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-slate-850 font-mono">
              {stats.average === 0 ? "0.0" : stats.average.toFixed(2)}
            </span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
        </div>

        {/* Approving checklist count */}
        <div className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Alumnos Aprobados:</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-emerald-600 font-mono">{stats.passingCount}</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">Suficientes</span>
          </div>
        </div>

        {/* Percent passing Gauge block */}
        <div className="bg-slate-50/50 border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">% de Aprobación:</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-black text-indigo-600 font-mono">
              {stats.passingPct}%
            </span>
            <div className="w-12 h-2.5 bg-slate-200 rounded-full overflow-hidden shrink-0">
              <div 
                className="h-full bg-indigo-650 rounded-full" 
                style={{ width: `${stats.passingPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS COLUMN ROW */}
      <div className="bg-slate-50/50 border border-slate-150 p-4 rounded-2xl flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        
        {/* Name input filter */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre de estudiante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none hover:border-slate-300 focus:border-indigo-550 transition-colors"
          />
        </div>

        {/* Filtering category hooks selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-[11px] font-bold text-slate-450 uppercase">Grado:</span>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value as any)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500"
            >
              <option value="ALL">Todos los grados</option>
              <option value="6">Sexto (6°)</option>
              <option value="7">Séptimo (7°)</option>
              <option value="8">Octavo (8°)</option>
              <option value="9">Noveno (9°)</option>
              <option value="10">Décimo (10°)</option>
              <option value="11">Undécimo (11°)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-450 uppercase">Periodo:</span>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value as any)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500"
            >
              <option value="ALL">Todos los periodos</option>
              <option value="1">Periodo I</option>
              <option value="2">Periodo II</option>
              <option value="3">Periodo III</option>
              <option value="4">Periodo IV</option>
            </select>
          </div>
        </div>
      </div>

      {/* ERROR PANELS INFO */}
      {errorInfo && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-700 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="font-semibold">{errorInfo} Se están visualizando únicamente las copias locales.</p>
        </div>
      )}

      {/* DETAILED DATA TABLE REPRESENTATION LISTING */}
      <div className="w-full overflow-hidden border border-slate-150 rounded-2xl shadow-inner bg-white">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-3 px-4">Estudiante</th>
                <th className="py-3 px-4">Grado</th>
                <th className="py-3 px-4">Periodo</th>
                <th className="py-3 px-4 text-center">Nota Final (1.0-5.0)</th>
                <th className="py-3 px-4">Fecha de Registro</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    Ninguna calificación coincide con los criterios de búsqueda actuales.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec, index) => {
                  const scoreVal = parseFloat(rec.score) || 0.0;
                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {rec.student}
                      </td>
                      <td className="py-3.5 px-4 text-slate-550 font-bold">
                        Grado {rec.grade}°
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-bold">
                        Periodo {rec.period}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold">
                        <span
                          className={`py-1 px-3 rounded-full font-mono text-[11px] font-black ${
                            scoreVal >= 4.0
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                              : scoreVal >= 3.0
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-150"
                              : "bg-rose-50 text-rose-700 border border-rose-150"
                          }`}
                        >
                          {scoreVal.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-semibold font-mono text-[10px]">
                        {rec.timestamp || "Local Sync"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord(rec.student, rec.grade, rec.period)}
                          className="p-1 px-2.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all font-semibold inline-flex items-center gap-1 cursor-pointer"
                          title="Eliminar este registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clear Database trigger hook */}
      {records.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[10px] font-black tracking-wider uppercase text-rose-500/80 hover:text-rose-600 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Vaciar Planilla General de Alumnos
          </button>
        </div>
      )}

    </div>
  );
}
