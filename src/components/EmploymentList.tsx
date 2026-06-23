/**
 * Autor: Michał Sokołowski
 * Generator: Google AIStudio
 * Użyty model AI/LLM: Gemini 3.5 Flash (w Google AI Studio)
 * Licencja: AGPL v3
 */

import React, { useState } from "react";
import { Employment, LocalBookmarks, LocalNotes } from "../types";
import { Briefcase, Calendar, Wrench, Bookmark, MessageSquare, Save, Settings, Layers, Code, Edit3, X } from "lucide-react";
import { motion } from "motion/react";
import { translate, translateStanowisko } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the EmploymentList component.
 *
 * @interface EmploymentListProps
 */
interface EmploymentListProps {
  jobs: Employment[];
  bookmarks: LocalBookmarks;
  onToggleBookmark: (id: string) => void;
  notes: LocalNotes;
  onSaveNote: (id: string, textPl: string, textEn: string) => void;
  onEditJob: (job: Employment) => void;
  lang: "pl" | "en";
  tooltips: Record<string, string>;
  onSaveTooltip: (key: string, val: string) => void;
  isAdmin?: boolean;
}

/**
 * Component representing the candidate's employment and job history records list.
 * Supports chronological view of roles, details, core duties, technology stack,
 * specific library versions, personal notes, and fast local database editing.
 *
 * @param {EmploymentListProps} props - Component props.
 * @returns {JSX.Element} The rendered employment history component list.
 */
export const EmploymentList: React.FC<EmploymentListProps> = ({
  jobs,
  bookmarks,
  onToggleBookmark,
  notes,
  onSaveNote,
  onEditJob,
  lang,
  tooltips,
  onSaveTooltip,
  isAdmin = false,
}) => {
  const [activeNoteJobId, setActiveNoteJobId] = useState<string | null>(null);
  const [noteTextPl, setNoteTextPl] = useState("");
  const [noteTextEn, setNoteTextEn] = useState("");
  const [editingTooltip, setEditingTooltip] = useState<{ key: string; label: string; text: string } | null>(null);

  const handleOpenNote = (id: string) => {
    setActiveNoteJobId(id);
    setNoteTextPl(notes[id]?.pl || "");
    setNoteTextEn(notes[id]?.en || "");
  };

  const handleSaveNote = (id: string) => {
    onSaveNote(id, noteTextPl, noteTextEn);
    setActiveNoteJobId(null);
  };

  const handleOpenTooltipEdit = (key: string, label: string) => {
    setEditingTooltip({
      key,
      label,
      text: tooltips[key] || "",
    });
  };

  const handleSaveTooltipClick = () => {
    if (editingTooltip) {
      onSaveTooltip(editingTooltip.key, editingTooltip.text);
      setEditingTooltip(null);
    }
  };

  return (
    <div className="space-y-6" id="employment-list-container">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          {translate("Doświadczenie Zawodowe (Zatrudnienie)", lang)}
        </h2>
        <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md border border-slate-200/50">
          {translate("Uporządkowane chronologicznie", lang)}
        </span>
      </div>

      <div className="relative border-l border-slate-200 ml-3 md:ml-4 pl-6 md:pl-8 space-y-8">
        {jobs.map((job) => {
          const hasNote = !!(notes[job.id]?.pl || notes[job.id]?.en);

          return (
            <div key={job.id} className="relative group">
              {/* Timeline marker icon */}
              <div className="absolute -left-[39px] md:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-indigo-50 border-2 border-indigo-500 flex items-center justify-center text-indigo-600 shadow-xs z-10">
                <Briefcase className="w-3 h-3" />
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-xs hover:shadow-md transition animate-fade-in">
                {/* Job Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      {translateStanowisko(job.position, lang)}
                    </h3>
                    <div className="text-sm font-semibold text-slate-700 mt-0.5">{job.company}</div>
                  </div>

                  {/* Actions & Dates */}
                  <div className="flex flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-mono text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {job.date.start} – {job.date.end || translate("obecnie", lang)}
                    </span>

                    {isAdmin && (
                      <div className="flex gap-1.5">
                        {/* Notes indicator button */}
                        <button
                          onClick={() => handleOpenNote(job.id)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            hasNote
                              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600"
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400"
                          }`}
                          title={translate("Notatki dla rekrutera", lang)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>

                        {/* Edit job button */}
                        <button
                          onClick={() => onEditJob(job)}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 text-slate-400 transition cursor-pointer"
                          title={translate("Edytuj dane", lang)}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recruiter Custom Notes displaying */}
                {isAdmin && hasNote && activeNoteJobId !== job.id && (
                  <div className="mb-4 p-3 bg-emerald-50/50 border border-emerald-100/60 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                    <span className="font-semibold text-emerald-700 font-mono">{translate("NOTATKA:", lang)}</span>
                    <p className="italic leading-relaxed">{notes[job.id]?.[lang] || notes[job.id]?.pl || notes[job.id]?.en}</p>
                    <button
                      onClick={() => handleOpenNote(job.id)}
                      className="ml-auto text-[10px] text-emerald-600 hover:underline font-mono cursor-pointer animate-pulse"
                    >
                      {translate("Edytuj", lang)} [x]
                    </button>
                  </div>
                )}

                {/* Note Editor */}
                {isAdmin && activeNoteJobId === job.id && (
                  <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">
                        {translate("Notatki dla rekrutera", lang)} (PL)
                      </label>
                      <textarea
                        value={noteTextPl}
                        onChange={(e) => setNoteTextPl(e.target.value)}
                        placeholder="Wpisz polską notatkę..."
                        className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={1}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">
                        {translate("Notatki dla rekrutera", lang)} (EN)
                      </label>
                      <textarea
                        value={noteTextEn}
                        onChange={(e) => setNoteTextEn(e.target.value)}
                        placeholder="Wpisz angielską notatkę..."
                        className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        rows={1}
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setActiveNoteJobId(null)}
                        className="px-2.5 py-1 text-xs text-slate-500 hover:underline cursor-pointer"
                      >
                        {translate("Anuluj", lang)}
                      </button>
                      <button
                        onClick={() => handleSaveNote(job.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{translate("Zapisz", lang)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Job Duties / Responsibilities */}
                <div className="mb-4">
                  <h4 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
                    {translate("Obowiązki i zadania", lang)}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {job.duties.map((duty, idx) => {
                      const dutyKey = `${job.id}-duty-${idx}`;
                      const hasTooltip = !!tooltips[dutyKey];
                      const tooltipVal = tooltips[dutyKey];

                      return (
                        <li key={idx} className="group/duty flex items-start gap-2 relative">
                          <span className="text-indigo-400 font-mono mt-1 text-xs select-none">■</span>
                          <div className="flex-1 leading-relaxed">
                            <SupplementaryText text={translate(duty, lang)} />
                            
                            {/* Hover floating comment/tooltip */}
                            {hasTooltip && (
                              <div className="mt-1 text-xs text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2 py-1 rounded-md italic flex items-center gap-1 w-fit max-w-lg">
                                <MessageSquare className="w-3 h-3 text-indigo-400 shrink-0" />
                                <span>{tooltipVal}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick add/edit tooltip icon visible on hover */}
                          <button
                            onClick={() => handleOpenTooltipEdit(dutyKey, translate(duty, lang))}
                            className="opacity-0 group-hover/duty:opacity-100 transition p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-slate-100 cursor-pointer shrink-0 self-center"
                            title={translate("Dodaj / edytuj krótki komentarz", lang)}
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Dynamic Metadata Section */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50 text-xs">
                  {/* Technologies */}
                  <div className="w-full">
                    <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      {translate("Wykorzystane technologie", lang)}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.technologies.map((tech) => {
                        const techKey = `${job.id}-tech-${tech}`;
                        const hasTooltip = !!tooltips[techKey];
                        const tooltipVal = tooltips[techKey];

                        return (
                          <div key={tech} className="relative group/tech inline-flex items-center gap-1 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-700 hover:text-indigo-900 border border-indigo-100/40 rounded-lg px-2.5 py-1 font-mono font-medium transition cursor-help">
                            <span>{tech}</span>

                            {/* Bullet icon indicating custom tooltip exists */}
                            {hasTooltip && (
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" title={tooltipVal} />
                            )}

                            {/* Absolute styled hover tooltip box */}
                            {hasTooltip && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tech:block z-50 w-48 bg-slate-900 text-white text-[11px] p-2 rounded-lg shadow-lg leading-normal font-sans text-center">
                                {tooltipVal}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                              </div>
                            )}

                            <button
                              onClick={() => handleOpenTooltipEdit(techKey, tech)}
                              className="opacity-0 group-hover/tech:opacity-100 transition p-0.5 text-indigo-400 hover:text-indigo-900 rounded cursor-pointer"
                              title={translate("Dodaj / edytuj komentarz do technologii", lang)}
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Versions (versions) */}
                  {job.versions && Object.keys(job.versions).length > 0 && (
                    <div className="w-full md:w-auto md:max-w-xs mt-2">
                      <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        {translate("Wersje oprogramowania", lang)}
                      </h4>
                      <div className="space-y-1 text-slate-600 font-mono">
                        {Object.entries(job.versions).map(([lib, vers]) => (
                          <div key={lib} className="flex gap-1.5">
                            <span className="font-semibold text-slate-700">{lib}:</span>
                            <span className="text-indigo-600 font-bold">{(vers as string[]).join(", ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Design Patterns (designPatterns) */}
                  {job.designPatterns && job.designPatterns.length > 0 && (
                    <div className="w-full md:w-auto md:max-w-xs mt-2">
                      <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Code className="w-3.5 h-3.5 text-slate-400" />
                        {translate("Wzorce projektowe", lang)}
                      </h4>
                      <div className="flex flex-wrap gap-1 text-slate-600 font-mono">
                        {job.designPatterns.map((pat) => (
                          <span key={pat} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60 text-[11px]">
                            {pat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Techniques */}
                  {job.devMethodologies && job.devMethodologies.length > 0 && (
                    <div className="w-full mt-2">
                      <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5">
                        {translate("Metodologie i standardy", lang)}
                      </h4>
                      <div className="flex flex-wrap gap-1 font-mono">
                        {job.devMethodologies.map((techDev) => (
                          <span key={techDev} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200">
                            {techDev}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip Dialog Modal Overlay */}
      {editingTooltip && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5 uppercase font-mono">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                {translate("Komentarz / Tooltip", lang)}
              </h3>
              <button
                onClick={() => setEditingTooltip(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">
              {translate("Dla elementu:", lang)}
            </p>
            <blockquote className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600 border-l-4 border-indigo-400 italic mb-4 leading-relaxed">
              {editingTooltip.label}
            </blockquote>

            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              {translate("Treść komentarza (krótka):", lang)}
            </label>
            <input
              type="text"
              value={editingTooltip.text}
              onChange={(e) => setEditingTooltip({ ...editingTooltip, text: e.target.value })}
              placeholder={translate("Wpisz krótki komentarz, który wyświetli się w tooltipie...", lang)}
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              maxLength={150}
            />

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setEditingTooltip(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:underline cursor-pointer"
              >
                {translate("Anuluj", lang)}
              </button>
              <button
                onClick={handleSaveTooltipClick}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{translate("Zapisz", lang)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
