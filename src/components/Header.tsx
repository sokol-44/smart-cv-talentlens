/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React from "react";
import { Person, Employment, Project, Certificate, Skill } from "../types";
import { Github, Linkedin, Briefcase, Award, FolderGit2, GraduationCap, RefreshCw, Globe, Mail, Phone } from "lucide-react";
import { translate } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the Header component.
 *
 * @interface HeaderProps
 */
interface HeaderProps {
  person: Person;
  stats: {
    jobsCount: number;
    projectsCount: number;
    skillsCount: number;
    certsCount: number;
  };
  onResetDb: () => void;
  isDbModified: boolean;
  lang: "pl" | "en";
  employment: Employment[];
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
  onToggleLang?: (lang: "pl" | "en") => void;
}

/**
 * Top dashboard and header component.
 * Displays profile details (name, title, contact, profiles), brief statistics,
 * and standard action buttons like database reset if local data is modified.
 *
 * @param {HeaderProps} props - Component props.
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header: React.FC<HeaderProps> = ({
  person,
  stats,
  onResetDb,
  isDbModified,
  lang,
  employment,
  projects,
  certificates,
  skills,
  onToggleLang
}) => {
  return (
    <header className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden" id="header-section-container">
      {/* Subtle glowing background effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white mb-2">
            {person.firstName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{person.lastName}</span>
          </h1>

          <p className="text-slate-400 text-lg mb-4 font-sans max-w-2xl leading-relaxed">
            <SupplementaryText text={translate("Inżynier oprogramowania z ponad 20-letnim doświadczeniem w tworzeniu systemów na dużą skalę, administracji Linux, DevOps oraz strategiach backupowych.", lang)} />
          </p>

          {/* Social Links & Portfolio Button */}
          <div className="flex flex-wrap gap-3 mb-6">
            {person.portfolio && (
              <a
                href={person.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition text-sm font-semibold rounded-xl text-white shadow-md cursor-pointer"
                id="header-portfolio-btn"
              >
                <Globe className="w-4 h-4" />
                <span>{translate("Portfolio", lang)}</span>
              </a>
            )}
            {person.github && (
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-xl border border-slate-700/60 text-slate-200 cursor-pointer"
                id="header-github-btn"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub</span>
              </a>
            )}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-xl border border-slate-700/60 text-slate-200 cursor-pointer"
                id="header-linkedin-btn"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            )}
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-xl border border-slate-700/60 text-slate-200 cursor-pointer"
                id="header-email-btn"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{translate("E-mail", lang)}</span>
              </a>
            )}
            {person.tel && (
              <a
                href={`tel:${person.tel}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 transition text-sm font-medium rounded-xl border border-slate-700/60 text-slate-200 cursor-pointer"
                id="header-tel-btn"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                <span>{translate("Tel", lang)}</span>
              </a>
            )}

            {isDbModified && (
              <button
                onClick={onResetDb}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition text-sm font-medium rounded-xl border border-amber-500/40 cursor-pointer"
                title={translate("Przywróć początkowe dane z pliku JSON", lang)}
                id="header-reset-db-btn"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{translate("Resetuj Bazę Danych", lang)}</span>
              </button>
            )}
          </div>
        </div>

        {/* Local DB Status Panel with Language Selector Above Statistics */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl w-full md:w-auto md:min-w-[300px]">
          <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-400 mb-4 border-b border-slate-800 pb-2.5">
            <span className="flex items-center gap-1 text-slate-300 font-semibold uppercase tracking-wider text-[10px]">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{translate("Język / Language", lang)}</span>
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => onToggleLang?.("pl")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                  lang === "pl" ? "bg-blue-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                }`}
              >
                PL
              </button>
              <button
                onClick={() => onToggleLang?.("en")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                  lang === "en" ? "bg-blue-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            {/* Box "Etaty" with hover list tooltip */}
            <div className="relative group/box bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700/60 transition cursor-help">
              <div className="text-slate-500 text-[10px] uppercase flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-blue-400" />
                {translate("Etaty", lang)}
              </div>
              <div className="text-lg font-bold text-slate-200 mt-0.5">{stats.jobsCount}</div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2.5 right-1/2 translate-x-1/2 hidden group-hover/box:block z-50 w-64 bg-slate-950 border border-slate-800 text-white text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed font-sans pointer-events-none animate-fade-in">
                <div className="font-bold border-b border-slate-850 pb-1 mb-1.5 text-blue-400 uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  <span>{translate("Lista firm i stanowisk", lang)}:</span>
                </div>
                <ul className="list-disc pl-3.5 space-y-1 max-h-40 overflow-y-auto text-slate-300">
                  {employment.map((j) => (
                    <li key={j.id}>
                      <span className="font-medium text-white">{j.company}</span>
                      <span className="text-slate-400 text-[9px]"> ({Array.isArray(j.position) ? j.position.join(", ") : typeof j.position === "object" ? (lang === "pl" ? j.position.pl : j.position.en) : translate(j.position, lang)})</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute top-full right-1/2 translate-x-1/2 border-4 border-transparent border-t-slate-950" />
              </div>
            </div>

            {/* Box "Projekty" with hover list tooltip */}
            <div className="relative group/box bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700/60 transition cursor-help">
              <div className="text-slate-500 text-[10px] uppercase flex items-center gap-1">
                <FolderGit2 className="w-3 h-3 text-emerald-400" />
                {translate("Projekty", lang)}
              </div>
              <div className="text-lg font-bold text-slate-200 mt-0.5">{stats.projectsCount}</div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2.5 right-1/2 translate-x-1/2 hidden group-hover/box:block z-50 w-64 bg-slate-950 border border-slate-800 text-white text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed font-sans pointer-events-none animate-fade-in">
                <div className="font-bold border-b border-slate-850 pb-1 mb-1.5 text-emerald-400 uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <FolderGit2 className="w-3 h-3" />
                  <span>{translate("Główne realizowane projekty", lang)}:</span>
                </div>
                <ul className="list-disc pl-3.5 space-y-1 max-h-40 overflow-y-auto text-slate-300">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <span className="font-medium text-white">{p.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute top-full right-1/2 translate-x-1/2 border-4 border-transparent border-t-slate-950" />
              </div>
            </div>

            {/* Box "Certyfikaty" with hover list tooltip */}
            <div className="relative group/box bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700/60 transition cursor-help">
              <div className="text-slate-500 text-[10px] uppercase flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-400" />
                {translate("Certyfikaty", lang)}
              </div>
              <div className="text-lg font-bold text-slate-200 mt-0.5">{stats.certsCount}</div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2.5 right-1/2 translate-x-1/2 hidden group-hover/box:block z-50 w-64 bg-slate-950 border border-slate-800 text-white text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed font-sans pointer-events-none animate-fade-in">
                <div className="font-bold border-b border-slate-850 pb-1 mb-1.5 text-purple-400 uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>{translate("Uzyskane certyfikaty", lang)}:</span>
                </div>
                <ul className="list-disc pl-3.5 space-y-1 max-h-40 overflow-y-auto text-slate-300">
                  {certificates.map((c) => (
                    <li key={c.id}>
                      <span className="font-medium text-white">{c.name}</span>
                      {c.institution && <span className="text-slate-400 text-[9px]"> ({c.institution})</span>}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-full right-1/2 translate-x-1/2 border-4 border-transparent border-t-slate-950" />
              </div>
            </div>

            {/* Box "Umiejętności" with hover list tooltip */}
            <div className="relative group/box bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700/60 transition cursor-help">
              <div className="text-slate-500 text-[10px] uppercase flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-amber-400" />
                {translate("Umiejętności", lang)}
              </div>
              <div className="text-lg font-bold text-slate-200 mt-0.5">{stats.skillsCount}</div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-2.5 right-1/2 translate-x-1/2 hidden group-hover/box:block z-50 w-64 bg-slate-950 border border-slate-800 text-white text-[10px] p-3 rounded-xl shadow-2xl leading-relaxed font-sans pointer-events-none animate-fade-in">
                <div className="font-bold border-b border-slate-850 pb-1 mb-1.5 text-amber-400 uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>{translate("Wszystkie umiejętności", lang)}:</span>
                </div>
                <ul className="list-disc pl-3.5 space-y-1 max-h-40 overflow-y-auto text-slate-300">
                  {skills.map((s, idx) => (
                    <li key={idx}>
                      <span className="font-medium text-white">{s.name}</span>
                      <span className="text-slate-400 text-[9px]"> ({translate(s.proficiencyLevel, lang)})</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute top-full right-1/2 translate-x-1/2 border-4 border-transparent border-t-slate-950" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded about me side scroller: "Kandydat o sobie" with all description elements */}
      <div className="mt-6 pt-6 border-t border-slate-800/80">
        <h3 className="text-xs font-mono font-semibold text-blue-400 mb-3 uppercase tracking-wider">
          {translate("Kandydat o sobie", lang)}
        </h3>
        
        {/* Horizontal scrollbar-thin side scroller container */}
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {((person.description && person.description[lang]) || []).map((bullet, idx) => (
            <div
              key={idx}
              className="min-w-[280px] md:min-w-[340px] max-w-[360px] flex-shrink-0 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 text-sm text-slate-300 animate-fade-in"
            >
              <p className="leading-relaxed text-xs">
                <SupplementaryText text={bullet} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
