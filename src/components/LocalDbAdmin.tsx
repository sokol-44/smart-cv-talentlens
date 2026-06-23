import React, { useState, useRef } from "react";
import { CVData } from "../types";
import { Database, FileJson, RefreshCw, Upload, Download, CheckCircle, AlertCircle, FileSpreadsheet, Eye, Lock } from "lucide-react";
import { motion } from "motion/react";
import { translate } from "../utils/translations";

/**
 * Props for the LocalDbAdmin component.
 *
 * @interface LocalDbAdminProps
 */
interface LocalDbAdminProps {
  cvData: CVData;
  onImportDb: (newData: CVData) => void;
  onResetDb: () => void;
  isDbModified: boolean;
  lang: "pl" | "en";
}

/**
 * Component providing local storage/database administration tools.
 * Supports viewing raw table data structures, exporting database as JSON files,
 * and importing compatible custom CV JSON structures back into the app.
 *
 * @param {LocalDbAdminProps} props - Component props.
 * @returns {JSX.Element} The rendered Database Admin panel.
 */
export const LocalDbAdmin: React.FC<LocalDbAdminProps> = ({
  cvData,
  onImportDb,
  onResetDb,
  isDbModified,
  lang,
}) => {
  const [activeTable, setActiveTable] = useState<"zatrudnienie" | "glowne_projekty" | "dodatkowe_kursy_i_certyfikaty" | "umiejetnosci">("zatrudnienie");
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password authorization state
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passError, setPassError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin" || password === "m_sokolowski") {
      setIsAuthenticated(true);
      setPassError("");
    } else {
      setPassError(lang === "pl" ? "Niepoprawne hasło!" : "Incorrect password!");
    }
  };

  // Download DB as JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `m_sokolowski_cv_database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Upload DB from JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        // Basic schema verification
        if (parsed.osoba && parsed.zatrudnienie && parsed.glowne_projekty && parsed.umiejetnosci) {
          onImportDb(parsed);
          setImportStatus({
            type: "success",
            message: lang === "pl"
              ? "Baza danych została pomyślnie zaimportowana i zsynchronizowana!"
              : "Database successfully imported and synchronized!"
          });
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          setImportStatus({
            type: "error",
            message: lang === "pl"
              ? "Nieprawidłowy schemat CV! Plik musi zawierać pola osoba, zatrudnienie, glowne_projekty."
              : "Invalid CV schema! The file must contain: osoba, zatrudnienie, glowne_projekty."
          });
        }
      } catch (err) {
        setImportStatus({
          type: "error",
          message: lang === "pl"
            ? "Wystąpił błąd podczas parsowania pliku JSON."
            : "An error occurred while parsing the JSON file."
        });
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 border border-slate-800 shadow-xl max-w-md mx-auto text-center my-12">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <Lock className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{translate("Panel Administracyjny", lang)}</h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          {lang === "pl"
            ? "Dostęp do bazy danych wymaga autoryzacji lokalnego administratora."
            : "Database access requires local administrator authorization."}
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left font-sans">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5 tracking-wider font-mono">
              {lang === "pl" ? "Hasło administratora (domyślne: admin)" : "Admin password (default: admin)"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white font-mono placeholder-slate-700"
              autoFocus
            />
          </div>

          {passError && (
            <p className="text-xs text-red-400 flex items-center gap-1.5 justify-center font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{passError}</span>
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === "pl" ? "Autoryzuj" : "Authorize"}</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Database className="w-6 h-6 text-indigo-400" />
            {translate("Lokalny Panel Administracyjny Bazy Danych", lang)}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === "pl"
              ? "Wszystkie zmiany są zapisywane asynchronicznie w lokalnym magazynie przeglądarki (magazyn typu klucz-wartość: localStorage)."
              : "All changes are saved asynchronously in the browser's local key-value store (localStorage)."}
          </p>
        </div>

        {/* Export / Import actions */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJson}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={triggerFileInput}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            id="import-db-btn"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{lang === "pl" ? "Importuj DB (.json)" : "Import DB (.json)"}</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
            id="export-db-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === "pl" ? "Eksportuj DB (.json)" : "Export DB (.json)"}</span>
          </button>
        </div>
      </div>

      {/* Import feedback notifications */}
      {importStatus && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-2.5 border ${
            importStatus.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {importStatus.type === "success" ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <p>{importStatus.message}</p>
        </div>
      )}

      {/* Schema / stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-mono">{lang === "pl" ? "Status Bazy" : "DB Status"}</div>
          <div className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isDbModified ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            {isDbModified
              ? (lang === "pl" ? "Zmieniona lokalnie" : "Modified locally")
              : (lang === "pl" ? "Początkowa (Zgodna z JSON)" : "Initial (Standard JSON)")}
          </div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-mono">{lang === "pl" ? "Kodowanie Dat" : "Date Format"}</div>
          <div className="text-sm font-bold text-slate-300 mt-1">{lang === "pl" ? "Format MM.YYYY" : "MM.YYYY format"}</div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-mono">{lang === "pl" ? "Polityka Bezpieczeństwa" : "Security Policy"}</div>
          <div className="text-sm font-bold text-slate-300 mt-1">{lang === "pl" ? "100% Offline (Brak chmury)" : "100% Offline (No Cloud)"}</div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-mono">{lang === "pl" ? "Metoda zapisu" : "Storage Method"}</div>
          <div className="text-sm font-bold text-slate-300 mt-1">{lang === "pl" ? "Klucze relacyjne (UUID-like)" : "Relational keys (UUID-like)"}</div>
        </div>
      </div>

      {/* Table selector Tabs */}
      <div className="flex border-b border-slate-800 mb-6 font-mono text-xs">
        <button
          onClick={() => setActiveTable("zatrudnienie")}
          className={`px-4 py-2.5 font-semibold border-b-2 transition cursor-pointer ${
            activeTable === "zatrudnienie"
              ? "border-indigo-400 text-indigo-300"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          tabel_zatrudnienie ({cvData.zatrudnienie.length})
        </button>
        <button
          onClick={() => setActiveTable("glowne_projekty")}
          className={`px-4 py-2.5 font-semibold border-b-2 transition cursor-pointer ${
            activeTable === "glowne_projekty"
              ? "border-indigo-400 text-indigo-300"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          tabel_glowne_projekty ({cvData.glowne_projekty.length})
        </button>
        <button
          onClick={() => setActiveTable("dodatkowe_kursy_i_certyfikaty")}
          className={`px-4 py-2.5 font-semibold border-b-2 transition cursor-pointer ${
            activeTable === "dodatkowe_kursy_i_certyfikaty"
              ? "border-indigo-400 text-indigo-300"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          tabel_certyfikaty ({cvData.dodatkowe_kursy_i_certyfikaty.length})
        </button>
        <button
          onClick={() => setActiveTable("umiejetnosci")}
          className={`px-4 py-2.5 font-semibold border-b-2 transition cursor-pointer ${
            activeTable === "umiejetnosci"
              ? "border-indigo-400 text-indigo-300"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          tabel_umiejetnosci ({cvData.umiejetnosci.length})
        </button>
      </div>

      {/* Raw Table Preview */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>{translate("Podgląd tabeli: ", lang)} {activeTable}</span>
          </div>
          <span>{lang === "pl" ? "Format: JSON Relacyjny" : "Format: Relational JSON"}</span>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 font-mono text-xs text-indigo-300">
          {activeTable === "zatrudnienie" && (
            <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(cvData.zatrudnienie, null, 2)}</pre>
          )}
          {activeTable === "glowne_projekty" && (
            <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(cvData.glowne_projekty, null, 2)}</pre>
          )}
          {activeTable === "dodatkowe_kursy_i_certyfikaty" && (
            <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(cvData.dodatkowe_kursy_i_certyfikaty, null, 2)}</pre>
          )}
          {activeTable === "umiejetnosci" && (
            <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(cvData.umiejetnosci, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};
