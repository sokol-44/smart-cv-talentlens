/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState, useMemo } from "react";
import { Certificate, LocalBookmarks, LocalNotes } from "../types";
import { Award, Calendar, Clock, Search, MessageSquare, Save, Settings, ShieldCheck, AlignLeft, Wrench } from "lucide-react";
import { translate } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the CertificatesList component.
 *
 * @interface CertificatesListProps
 */
interface CertificatesListProps {
  certs: Certificate[];
  bookmarks: LocalBookmarks;
  onToggleBookmark: (id: string) => void;
  notes: LocalNotes;
  onSaveNote: (id: string, textPl: string, textEn: string) => void;
  onEditCert: (cert: Certificate) => void;
  lang: "pl" | "en";
  isAdmin?: boolean;
}

/**
 * Component displaying the list of additional courses and certifications with search and recruitment note functions.
 * Allows filtering and local modification of each item.
 *
 * @param {CertificatesListProps} props - Component props.
 * @returns {JSX.Element} The rendered certifications list component.
 */
export const CertificatesList: React.FC<CertificatesListProps> = ({
  certs,
  bookmarks,
  onToggleBookmark,
  notes,
  onSaveNote,
  onEditCert,
  lang,
  isAdmin = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNoteCertId, setActiveNoteCertId] = useState<string | null>(null);
  const [noteTextPl, setNoteTextPl] = useState("");
  const [noteTextEn, setNoteTextEn] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const handleOpenNote = (id: string) => {
    setActiveNoteCertId(id);
    setNoteTextPl(notes[id]?.pl || "");
    setNoteTextEn(notes[id]?.en || "");
  };

  const handleSaveNote = (id: string) => {
    onSaveNote(id, noteTextPl, noteTextEn);
    setActiveNoteCertId(null);
  };

  const parseDateString = (dateStr: string): Date => {
    if (!dateStr) return new Date(0);
    const parts = dateStr.trim().split(".");
    if (parts.length === 2) {
      const month = parseInt(parts[0], 10) - 1;
      const year = parseInt(parts[1], 10);
      return new Date(year, month, 1);
    }
    if (/^\d{4}$/.test(dateStr.trim())) {
      const year = parseInt(dateStr.trim(), 10);
      return new Date(year, 0, 1);
    }
    return new Date(0);
  };

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    certs.forEach((c) => {
      const yr = c.date.slice(-4);
      if (/^\d{4}$/.test(yr)) {
        years.add(yr);
      }
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [certs]);

  const filteredCerts = useMemo(() => {
    return certs.filter((c) => {
      const yr = c.date.slice(-4);
      const matchesYear = selectedYear === "all" || yr === selectedYear;
      if (!matchesYear) return false;

      const transName = translate(c.name, lang);
      const transInst = c.institution;
      const transInfo = c.description
        ? typeof c.description === "object"
          ? c.description[lang] || c.description.pl || ""
          : translate(c.description, lang)
        : "";

      const matchText =
        transName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transInst.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transInfo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTech =
        c.technologiesAndDuties &&
        c.technologiesAndDuties.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchText || matchTech;
    });
  }, [certs, searchTerm, selectedYear, lang]);

  const sortedCerts = useMemo(() => {
    const cloned = [...filteredCerts];
    if (sortBy === "default") {
      return cloned;
    }
    cloned.sort((a, b) => {
      if (sortBy === "start_asc" || sortBy === "end_asc") {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);
        return dateA.getTime() - dateB.getTime();
      }
      if (sortBy === "start_desc" || sortBy === "end_desc") {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);
        return dateB.getTime() - dateA.getTime();
      }
      if (sortBy === "duration_asc") {
        const durA = parseFloat(a.durationHours || "0") || 0;
        const durB = parseFloat(b.durationHours || "0") || 0;
        return durA - durB;
      }
      if (sortBy === "duration_desc") {
        const durA = parseFloat(a.durationHours || "0") || 0;
        const durB = parseFloat(b.durationHours || "0") || 0;
        return durB - durA;
      }
      return 0;
    });
    return cloned;
  }, [filteredCerts, sortBy]);

  return (
    <div className="space-y-6" id="certifications-list-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            {translate("Dodatkowe Kursy i Certyfikaty", lang)}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {translate("Lista szkoleń z zakresu AI, zarządzania projektami (PMI), systemów Linux (SUSE, LPI) i cyberbezpieczeństwa.", lang)}
          </p>
        </div>

        {/* Search & Year filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Year Filter */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-1.5 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              <option value="all">{translate("Wszystkie lata", lang)}</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={translate("Szukaj certyfikatów...", lang)}
              className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-700 font-medium cursor-pointer"
          >
            <option value="default">{translate("Sortuj według", lang)}: {translate("Domyślnie", lang)}</option>
            <option value="start_asc">{translate("Data startu (rosnąco)", lang)}</option>
            <option value="start_desc">{translate("Data startu (malejąco)", lang)}</option>
            <option value="end_asc">{translate("Data zakończenia (rosnąco)", lang)}</option>
            <option value="end_desc">{translate("Data zakończenia (malejąco)", lang)}</option>
            <option value="duration_asc">{translate("Długość trwania (rosnąco)", lang)}</option>
            <option value="duration_desc">{translate("Długość trwania (malejąco)", lang)}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCerts.map((c) => {
          const hasNote = !!(notes[c.id]?.pl || notes[c.id]?.en);

          return (
            <div
              key={c.id}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition flex flex-col justify-between animate-fade-in"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex gap-2.5 items-start">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg shrink-0 border border-purple-100 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {translate(c.name, lang)}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        {c.institution}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {isAdmin && (
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenNote(c.id)}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          hasNote
                            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400"
                        }`}
                        title={translate("Notatki dla rekrutera", lang)}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onEditCert(c)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-600 border border-slate-200 hover:border-purple-200 text-slate-400 transition cursor-pointer"
                        title={translate("Edytuj dane", lang)}
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtitle / time */}
                <div className="flex flex-wrap gap-3 mb-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {c.date}
                  </span>
                  {c.durationHours && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {c.durationHours} {lang === "pl" ? "godz." : "hrs"}
                    </span>
                  )}
                </div>

                {/* Recruiter custom notes */}
                {isAdmin && hasNote && activeNoteCertId !== c.id && (
                  <div className="mb-3 p-2 bg-emerald-50/50 border border-emerald-100/60 rounded-xl text-xs text-slate-600">
                    <span className="font-bold text-emerald-700 font-mono text-[10px]">{translate("NOTATKA:", lang)}</span>
                    <p className="italic">{notes[c.id]?.[lang] || notes[c.id]?.pl || notes[c.id]?.en}</p>
                  </div>
                )}

                {/* Custom Note Editor */}
                {isAdmin && activeNoteCertId === c.id && (
                  <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-0.5">
                        {translate("Notatki dla rekrutera", lang)} (PL)
                      </label>
                      <textarea
                        value={noteTextPl}
                        onChange={(e) => setNoteTextPl(e.target.value)}
                        placeholder="Polski komentarz..."
                        className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={1}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-0.5">
                        {translate("Notatki dla rekrutera", lang)} (EN)
                      </label>
                      <textarea
                        value={noteTextEn}
                        onChange={(e) => setNoteTextEn(e.target.value)}
                        placeholder="English comment..."
                        className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={1}
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setActiveNoteCertId(null)}
                        className="px-2 py-0.5 text-xs text-slate-500 hover:underline cursor-pointer"
                      >
                        {translate("Anuluj", lang)}
                      </button>
                      <button
                        onClick={() => handleSaveNote(c.id)}
                        className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>{translate("Zapisz", lang)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Info text */}
                {c.description && (
                  <div className="mb-3">
                    <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
                      {translate("Opis", lang)}
                    </h4>
                    <div className="text-xs text-slate-600 leading-relaxed bg-slate-50/40 p-2.5 rounded-xl border border-slate-100/50">
                      <SupplementaryText text={
                        typeof c.description === "object"
                          ? c.description[lang] || c.description.pl || c.description.en || ""
                          : translate(c.description, lang)
                      } />
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies / Tags */}
              {c.technologiesAndDuties && c.technologiesAndDuties.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    {translate("Omawiane technologie", lang)}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {c.technologiesAndDuties.map((tech) => (
                      <div
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-600 rounded text-[10px] font-mono border border-slate-200/50 transition-colors"
                      >
                        <span>{translate(tech, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
