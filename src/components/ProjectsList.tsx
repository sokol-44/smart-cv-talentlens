/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState, useMemo } from "react";
import { Project, LocalBookmarks, LocalNotes } from "../types";
import { FolderGit2, Search, ExternalLink, Calendar, MessageSquare, Save, Settings, Award, Edit3, X, Layers, Code, Wrench, AlignLeft } from "lucide-react";
import { translate } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the ProjectsList component.
 *
 * @interface ProjectsListProps
 */
interface ProjectsListProps {
  projects: Project[];
  highlightedProjectId?: string | null;
  onNavigateToCompany?: (companyName: string) => void;
  bookmarks: LocalBookmarks;
  onToggleBookmark: (id: string) => void;
  notes: LocalNotes;
  onSaveNote: (id: string, textPl: string, textEn: string) => void;
  onEditProject: (project: Project) => void;
  lang: "pl" | "en";
  tooltips: Record<string, string>;
  onSaveTooltip: (key: string, val: string) => void;
  isAdmin?: boolean;
}

/**
 * Component for listing main projects with tag filtering, full text search,
 * recruiter note-taking, and modal edit access.
 *
 * @param {ProjectsListProps} props - Component props.
 * @returns {JSX.Element} The rendered projects list view.
 */
export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  highlightedProjectId = null,
  onNavigateToCompany,
  bookmarks,
  onToggleBookmark,
  notes,
  onSaveNote,
  onEditProject,
  lang,
  tooltips,
  onSaveTooltip,
  isAdmin = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("start_desc");
  const [activeNoteProjId, setActiveNoteProjId] = useState<string | null>(null);
  const [noteTextPl, setNoteTextPl] = useState("");
  const [noteTextEn, setNoteTextEn] = useState("");
  const [editingTooltip, setEditingTooltip] = useState<{ key: string; label: string; text: string } | null>(null);

  const handleOpenNote = (id: string) => {
    setActiveNoteProjId(id);
    setNoteTextPl(notes[id]?.pl || "");
    setNoteTextEn(notes[id]?.en || "");
  };

  const handleSaveNote = (id: string) => {
    onSaveNote(id, noteTextPl, noteTextEn);
    setActiveNoteProjId(null);
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

  // Helper to parse dates for sorting (MM.YYYY or YYYY)
  const parseDateString = (dateStr: string, isEnd = false): Date => {
    if (!dateStr || dateStr.toLowerCase().trim() === "obecnie" || dateStr.toLowerCase().trim() === "present" || dateStr.toLowerCase().trim() === "") {
      return new Date();
    }
    const parts = dateStr.split(".");
    if (parts.length === 2) {
      const month = parseInt(parts[0], 10) - 1;
      const year = parseInt(parts[1], 10);
      return new Date(year, month, isEnd ? 28 : 1);
    }
    if (/^\d{4}$/.test(dateStr)) {
      const year = parseInt(dateStr, 10);
      return new Date(year, isEnd ? 11 : 0, isEnd ? 31 : 1);
    }
    return new Date(0);
  };

  const getProjectDurationMs = (p: Project): number => {
    const start = parseDateString(p.date.start, false);
    const end = parseDateString(p.date.end, true);
    return end.getTime() - start.getTime();
  };

  // Get list of all technologies used in projects for filtering
  const allProjectTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => techs.add(t)));
    return Array.from(techs).sort();
  }, [projects]);

  // Filter projects by search term & technology tag
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const translatedName = p.name;
      const translatedOpis = p.description[lang] || p.description.pl || p.description.en || "";
      const translatedFirms = p.company.join(", ");

      const matchesSearch =
        translatedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translatedOpis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translatedFirms.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTech =
        selectedTech === "all" ||
        p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech, lang]);

  // Sort projects based on selected sortBy criteria
  const sortedProjects = useMemo(() => {
    const cloned = [...filteredProjects];
    if (sortBy === "default") {
      return cloned;
    }
    cloned.sort((a, b) => {
      if (sortBy === "start_asc") {
        const dateA = parseDateString(a.date.start, false);
        const dateB = parseDateString(b.date.start, false);
        return dateA.getTime() - dateB.getTime();
      }
      if (sortBy === "start_desc") {
        const dateA = parseDateString(a.date.start, false);
        const dateB = parseDateString(b.date.start, false);
        return dateB.getTime() - dateA.getTime();
      }
      if (sortBy === "end_asc") {
        const dateA = parseDateString(a.date.end, true);
        const dateB = parseDateString(b.date.end, true);
        return dateA.getTime() - dateB.getTime();
      }
      if (sortBy === "end_desc") {
        const dateA = parseDateString(a.date.end, true);
        const dateB = parseDateString(b.date.end, true);
        return dateB.getTime() - dateA.getTime();
      }
      if (sortBy === "duration_asc") {
        return getProjectDurationMs(a) - getProjectDurationMs(b);
      }
      if (sortBy === "duration_desc") {
        return getProjectDurationMs(b) - getProjectDurationMs(a);
      }
      return 0;
    });
    return cloned;
  }, [filteredProjects, sortBy]);

  return (
    <div className="space-y-6" id="projects-list-container">
      {/* Header and Filter bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-emerald-600" />
            {translate("Główne Projekty", lang)}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {translate("Filtruj i przeszukuj systemy, które Michał rozwijał i projektował.", lang)}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Text Search */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={translate("Szukaj w projektach...", lang)}
              className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tech Select */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{translate("Wszystkie technologie", lang)}</option>
            {allProjectTechs.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 font-medium"
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

      {/* Grid of projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedProjects.map((p) => {
          const hasNote = !!(notes[p.id]?.pl || notes[p.id]?.en);

          return (
            <div
              key={p.id}
              id={`project-card-${p.id}`}
              className={`bg-white rounded-2xl border transition-all duration-500 flex flex-col justify-between overflow-hidden animate-fade-in ${
                highlightedProjectId === p.id
                  ? "border-emerald-500 ring-2 ring-emerald-500/50 bg-emerald-50/10 shadow-lg scale-[1.01]"
                  : "border-slate-100 shadow-xs hover:shadow-md"
              }`}
            >
              <div className="p-5 md:p-6">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5 group hover:text-emerald-600 transition">
                      {p.name}
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-emerald-600 inline-block transition animate-pulse"
                          title={translate("Przejdź do strony projektu", lang)}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                        {translate("Firma:", lang)}
                      </span>
                      <div className="flex flex-wrap gap-1 font-mono">
                        {p.company.map((companyName) => (
                          <span
                            key={companyName}
                            onClick={() => {
                              if (onNavigateToCompany) {
                                onNavigateToCompany(companyName);
                              }
                            }}
                            className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-200 cursor-pointer transition hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 inline-block"
                            title={`${translate("Kliknij, aby przejść do firmy", lang)}: ${companyName}`}
                          >
                            {companyName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side controls */}
                  {isAdmin && (
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenNote(p.id)}
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
                        onClick={() => onEditProject(p)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 text-slate-400 transition cursor-pointer"
                        title={translate("Edytuj dane", lang)}
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Date indicator */}
                <div className="mb-4 inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {p.date.start} – {p.date.end || translate("obecnie", lang)}
                  </span>
                </div>

                {/* Recruiter Note showing */}
                {isAdmin && hasNote && activeNoteProjId !== p.id && (
                  <div className="mb-4 p-2.5 bg-emerald-50/50 border border-emerald-100/60 rounded-xl text-xs text-slate-700">
                    <span className="font-bold text-emerald-700 font-mono text-[10px] uppercase block mb-0.5">{translate("NOTATKA:", lang)}</span>
                    <p className="italic leading-relaxed">{notes[p.id]?.[lang] || notes[p.id]?.pl || notes[p.id]?.en}</p>
                    <button
                      onClick={() => handleOpenNote(p.id)}
                      className="text-[10px] text-emerald-600 hover:underline font-mono mt-1 cursor-pointer animate-pulse"
                    >
                      {translate("Edytuj", lang)} [x]
                    </button>
                  </div>
                )}

                {/* Note Editor */}
                {isAdmin && activeNoteProjId === p.id && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
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
                        onClick={() => setActiveNoteProjId(null)}
                        className="px-2 py-0.5 text-xs text-slate-500 hover:underline cursor-pointer"
                      >
                        {translate("Anuluj", lang)}
                      </button>
                      <button
                        onClick={() => handleSaveNote(p.id)}
                        className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{translate("Zapisz", lang)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
                    {translate("Opis", lang)}
                  </h4>
                  <div className="text-xs text-slate-600 leading-relaxed bg-slate-50/40 p-2.5 rounded-xl border border-slate-100/50">
                    <SupplementaryText text={p.description ? (p.description[lang] || p.description.pl || p.description.en || "") : ""} />
                  </div>
                </div>

                {/* Notable Features */}
                {p.notableFeatures && (p.notableFeatures[lang] || p.notableFeatures.pl || p.notableFeatures.en) && (p.notableFeatures[lang] || p.notableFeatures.pl || p.notableFeatures.en)!.length > 0 && (
                  <div className="mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <h4 className="text-[10px] font-mono font-bold text-amber-700 uppercase flex items-center gap-1 mb-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {translate("Wyróżniające elementy", lang)}
                    </h4>
                    <ul className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
                      {(p.notableFeatures[lang] || p.notableFeatures.pl || p.notableFeatures.en)!.map((item, idx) => {
                        const achKey = `${p.id}-achievement-${idx}`;
                        const hasTooltip = !!tooltips[achKey];
                        const tooltipVal = tooltips[achKey];

                        return (
                          <li key={idx} className="group/ach flex items-start gap-1.5 relative">
                            <span className="text-amber-500 font-bold select-none">•</span>
                            <div className="flex-1">
                              <SupplementaryText text={item} />
                              {hasTooltip && (
                                <div className="mt-0.5 text-[10px] text-amber-800 bg-amber-50 border border-amber-100/50 px-2 py-0.5 rounded italic w-fit">
                                  {tooltipVal}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleOpenTooltipEdit(achKey, item)}
                              className="opacity-0 group-hover/ach:opacity-100 transition p-0.5 text-slate-400 hover:text-amber-700 rounded hover:bg-slate-100 cursor-pointer shrink-0"
                              title={translate("Dodaj / edytuj krótki komentarz", lang)}
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom technology tags */}
              <div className="px-5 pb-5 md:px-6 md:pb-6 mt-auto">
                <div className="pt-3 border-t border-slate-100">
                  <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    {translate("Wykorzystane technologie", lang)}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.map((tech) => {
                      const techKey = `${p.id}-tech-${tech}`;
                      const hasTooltip = !!tooltips[techKey];
                      const tooltipVal = tooltips[techKey];

                      return (
                        <div
                          key={tech}
                          className="relative group/tech inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-900 text-slate-600 rounded text-[10px] font-mono border border-slate-200/50 cursor-help"
                        >
                          <span>{translate(tech, lang)}</span>
                          {hasTooltip && (
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" title={tooltipVal} />
                          )}

                          {/* Hover floating box */}
                          {hasTooltip && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tech:block z-50 w-44 bg-slate-900 text-white text-[10px] p-2 rounded shadow-md leading-normal font-sans text-center">
                              {tooltipVal}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                            </div>
                          )}

                          {isAdmin && (
                            <button
                              onClick={() => handleOpenTooltipEdit(techKey, tech)}
                              className="opacity-0 group-hover/tech:opacity-100 transition p-0.5 text-slate-400 hover:text-indigo-900 rounded cursor-pointer"
                              title={translate("Dodaj / edytuj komentarz do technologii", lang)}
                            >
                              <Edit3 className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Versions & Patterns inside footer */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100/60 mt-3 text-xs">
                    {/* Versions (versions) */}
                    {p.versions && Object.keys(p.versions).length > 0 && (
                      <div className="w-full sm:w-auto min-w-[150px] mt-2">
                        <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          {translate("Wersje oprogramowania", lang)}
                        </h4>
                        <div className="space-y-1 text-slate-600 font-mono text-[11px]">
                          {Object.entries(p.versions).map(([lib, vers]) => (
                            <div key={lib} className="flex gap-1.5">
                              <span className="font-semibold text-slate-700">{lib}:</span>
                              <span className="text-indigo-600 font-bold">{(vers as string[]).join(", ")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Design Patterns (designPatterns) */}
                    {p.designPatterns && p.designPatterns.length > 0 && (
                      <div className="w-full md:w-auto md:max-w-xs mt-2">
                        <h4 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Code className="w-3.5 h-3.5 text-slate-400" />
                          {translate("Wzorce projektowe", lang)}
                        </h4>
                        <div className="flex flex-wrap gap-1 text-slate-600 font-mono">
                          {p.designPatterns.map((pat) => (
                            <span key={pat} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60 text-[11px]">
                              {pat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
