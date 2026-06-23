/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState, useMemo } from "react";
import { CVData } from "../types";
import { UserCheck, Sparkles, ClipboardList, Award, Folder } from "lucide-react";
import { translate } from "../utils/translations";

/**
 * Props for the RecruiterMatch component.
 *
 * @interface RecruiterMatchProps
 */
interface RecruiterMatchProps {
  cvData: CVData;
  lang: "pl" | "en";
}

/**
 * Definition of a pre-configured role preset for recruitment matching.
 *
 * @interface RolePreset
 */
interface RolePreset {
  title: string;
  tags: string[];
  description: string;
}

/**
 * Recruiter Match component.
 * Evaluates candidate CV against pre-configured role presets (Senior PHP, DevOps, Fullstack, AI Integrator)
 * or dynamically-typed custom tags, scoring their relevance and matching entities in real time.
 *
 * @param {RecruiterMatchProps} props - Component props.
 * @returns {JSX.Element} The rendered recruiter dashboard matcher.
 */
export const RecruiterMatch: React.FC<RecruiterMatchProps> = ({ cvData, lang }) => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);

  const presets = useMemo<RolePreset[]>(() => [
    {
      title: "Senior PHP / Backend Developer",
      tags: ["PHP", "Laravel", "Symfony", "Eloquent ORM", "Doctrine ORM", "MySQL", "PostgreSQL", "REST API", "SOAP API", "Redis", "SOLID", "DDD", "RabbitMQ"],
      description: lang === "pl"
        ? "Stanowisko wymagające zaawansowanego modelowania baz danych, tworzenia stabilnych systemów e-commerce/B2B w PHP (Laravel/Symfony), integracji API oraz znajomości optymalizacji zapytań."
        : "A position requiring advanced database modeling, building stable e-commerce/B2B systems in PHP (Laravel/Symfony), API integrations, and query optimization skills."
    },
    {
      title: lang === "pl" ? "Inżynier DevOps / Administrator Systemów" : "DevOps Engineer / System Admin",
      tags: ["Linux", "Ubuntu", "Debian", "Red Hat", "CentOS", "Docker", "Borg Backup", "Shell", "bash", "SSH", "QEMU", "Hyper-V", "DNS", "DKIM", "DMARC", "SPF", "ISPconfig"],
      description: lang === "pl"
        ? "Rola skupiona na zarządzaniu serwerami Linux, automatyzacji zadań skryptami bash/shell, wdrażaniu strategii kopii bezpieczeństwa, konfiguracji DNS/serwerów pocztowych oraz konteneryzacji."
        : "A role focused on managing Linux servers, automating tasks with bash/shell scripts, implementing backups, configuring DNS/mail servers, and containerization."
    },
    {
      title: "Fullstack Developer",
      tags: ["PHP", "JavaScript", "TypeScript", "Angular", "AngularJS", "Ionic Framework", "HTML", "CSS", "MySQL", "PostgreSQL", "REST API", "jQuery", "Vue.js"],
      description: lang === "pl"
        ? "Praca nad interfejsem użytkownika (Angular/Vue) zintegrowanym ze stabilnym zapleczem PHP oraz mobilnymi aplikacjami hybrydowymi (Ionic Framework/TypeScript)."
        : "Work on user interfaces (Angular/Vue) integrated with a stable PHP backend and hybrid mobile applications (Ionic Framework/TypeScript)."
    },
    {
      title: lang === "pl" ? "Integrator AI / LLM & RAG" : "AI / LLM & RAG Integrator",
      tags: ["AI", "LLM", "Vibe Coding", "Practical LLM", "Python", "deterministrycze użycie LLM", "nauczanie maszynowe", "AI Prompt"],
      description: lang === "pl"
        ? "Nowoczesna rola skupiona na integracji dużych modeli językowych (LLM) z systemami firmowymi, budowie baz RAG w oparciu o Python/Docker/Ollama oraz automatyzacji procesów biznesowych."
        : "Modern role focused on integrating large language models (LLMs) with business applications, building RAG vector stores with Python/Docker/Ollama, and automating workflows."
    }
  ], [lang]);

  const activeTags = useMemo(() => {
    return presets[selectedPreset]?.tags || [];
  }, [selectedPreset, presets]);

  const scoreDetails = useMemo(() => {
    const tagsLower = activeTags.map((t) => t.toLowerCase());
    if (tagsLower.length === 0) return { score: 0, matchingProjects: [], matchingJobs: [], matchingCerts: [] };

    const projects = cvData.projects || [];
    const employment = cvData.employment || [];
    const certificates = cvData.certificates || [];
    const skills = cvData.skills || [];

    // 1. Check matching projects
    const matchingProjects = projects.filter((p) =>
      p && p.technologie && p.technologie.some((tech) => tagsLower.includes(tech.toLowerCase()))
    );

    // 2. Check matching jobs
    const matchingJobs = employment.filter((j) =>
      j && j.technologies && j.technologies.some((tech) => tagsLower.includes(tech.toLowerCase()))
    );

    // 3. Check matching certifications
    const matchingCerts = certificates.filter((c) =>
      c && c.technologiesAndDuties && c.technologiesAndDuties.some((tech) => tagsLower.includes(tech.toLowerCase()))
    );

    // Calculate score
    const uniqueMatches = new Set<string>();
    tagsLower.forEach((tag) => {
      // check projects
      projects.forEach((p) => {
        if (p && p.technologie && p.technologie.some((tech) => tech.toLowerCase() === tag)) uniqueMatches.add(tag);
      });
      // check jobs
      employment.forEach((j) => {
        if (j && j.technologies && j.technologies.some((tech) => tech.toLowerCase() === tag)) uniqueMatches.add(tag);
      });
      // check certs
      certificates.forEach((c) => {
        if (c && c.technologiesAndDuties && c.technologiesAndDuties.some((tech) => tech.toLowerCase() === tag)) uniqueMatches.add(tag);
      });
      // check skills
      skills.forEach((s) => {
        if (s && s.name && s.name.toLowerCase() === tag) uniqueMatches.add(tag);
      });
    });

    const matchRatio = tagsLower.length > 0 ? uniqueMatches.size / tagsLower.length : 0;
    const rawScore = Math.min(100, Math.round(matchRatio * 100));

    // Dynamic advice/verdict
    let verdict = "";
    if (rawScore > 85) {
      verdict = lang === "pl"
        ? "Idealne dopasowanie! Kandydat posiada pełne, wieloletnie doświadczenie rynkowe oraz odpowiednie certyfikaty."
        : "Perfect match! The candidate has extensive, multi-year commercial experience and relevant certificates.";
    } else if (rawScore > 60) {
      verdict = lang === "pl"
        ? "Bardzo dobre dopasowanie. Kandydat posiada solidne kompetencje i szybko wdroży się w brakujące elementy."
        : "Very good match. The candidate possesses solid competencies and will quickly adapt to missing pieces.";
    } else if (rawScore > 30) {
      verdict = lang === "pl"
        ? "Dopasowanie umiarkowane. Profil kandydata częściowo pokrywa się z kryteriami roli."
        : "Moderate match. The candidate's profile partially overlaps with the role's criteria.";
    } else {
      verdict = lang === "pl"
        ? "Niskie dopasowanie techniczne do wybranych tagów."
        : "Low technical match for the selected tags.";
    }

    return {
      score: rawScore,
      matchingProjects,
      matchingJobs,
      matchingCerts,
      uniqueMatches: Array.from(uniqueMatches),
      verdict
    };
  }, [activeTags, cvData, lang]);

  return (
    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-sm" id="recruiter-match-container">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-600 rounded-xl text-white">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            {translate("Dopasowanie Kandydata do Roli", lang)}
          </h2>
          <p className="text-sm text-slate-500">
            {translate("Wybierz rolę rekrutacyjną, aby sprawdzić stopień zgodności technicznej kandydata i wygenerować raport.", lang)}
          </p>
        </div>
      </div>

      {/* Preset selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPreset(idx)}
            className={`p-3.5 rounded-2xl text-left border transition cursor-pointer ${
              selectedPreset === idx
                ? "bg-white border-indigo-600 ring-2 ring-indigo-600/10 shadow-sm"
                : "bg-white/60 hover:bg-white border-slate-200/80 text-slate-700"
            }`}
          >
            <div className="font-bold text-sm text-slate-900 mb-1">{preset.title}</div>
            <div className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">
              {preset.tags.length} {lang === "pl" ? "wymaganych technologii" : "required technologies"}
            </div>
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <h4 className="text-sm font-bold text-slate-800 mb-1">{presets[selectedPreset]?.title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed">{presets[selectedPreset]?.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 max-w-md">
          {presets[selectedPreset]?.tags.slice(0, 8).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono border border-slate-200/50">
              {tag}
            </span>
          ))}
          {presets[selectedPreset]?.tags.length > 8 && (
            <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono">
              +{presets[selectedPreset].tags.length - 8} {lang === "pl" ? "więcej" : "more"}
            </span>
          )}
        </div>
      </div>

      {/* Match report card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
        {/* Score dial */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-slate-400 text-xs uppercase font-mono tracking-wider mb-2">{lang === "pl" ? "Dopasowanie Techniczne" : "Technical Matching"}</div>
            <div className="relative flex items-center justify-center mb-3">
              <div className="text-5xl font-bold text-white tracking-tight">{scoreDetails.score}%</div>
            </div>
            <div className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono border border-indigo-500/30">
              {scoreDetails.uniqueMatches.length} / {activeTags.length} {lang === "pl" ? "zaliczonych tagów" : "matching tags"}
            </div>
          </div>
        </div>

        {/* Verdict and listing */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-900 text-base">{lang === "pl" ? "Analiza systemowa" : "System analysis"}</h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-4 font-medium">
              {scoreDetails.verdict}
            </p>

            {/* List of actual validated credentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5 text-blue-500" />
                  {lang === "pl" ? "Powiązane Projekty" : "Linked Projects"} ({scoreDetails.matchingProjects.length})
                </h4>
                {scoreDetails.matchingProjects.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{lang === "pl" ? "Brak idealnie pasujących projektów." : "No perfectly matching projects."}</p>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {scoreDetails.matchingProjects.slice(0, 5).map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-slate-50 rounded-lg border border-slate-100 animate-fade-in">
                        <span className="font-medium text-slate-700 truncate max-w-[180px]">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.date.start}</span>
                      </div>
                    ))}
                    {scoreDetails.matchingProjects.length > 5 && (
                      <div className="text-[10px] text-slate-400 italic text-center mt-1">
                        + {scoreDetails.matchingProjects.length - 5} {lang === "pl" ? "kolejnych projektów" : "more projects"}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                  {lang === "pl" ? "Potwierdzona Nauka & Szkolenia" : "Confirmed Learning & Training"} ({scoreDetails.matchingCerts.length})
                </h4>
                {scoreDetails.matchingCerts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{lang === "pl" ? "Brak certyfikatu z tymi technologiami." : "No certs with these technologies."}</p>
                ) : (
                  <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                    {scoreDetails.matchingCerts.slice(0, 5).map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-slate-50 rounded-lg border border-slate-100 animate-fade-in">
                        <span className="font-medium text-slate-700 truncate max-w-[180px]">{c.name}</span>
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                      </div>
                    ))}
                    {scoreDetails.matchingCerts.length > 5 && (
                      <div className="text-[10px] text-slate-400 italic text-center mt-1">
                        + {scoreDetails.matchingCerts.length - 5} {lang === "pl" ? "dodatkowych szkoleń" : "additional courses"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <ClipboardList className="w-4 h-4 text-slate-300" />
              {lang === "pl" ? "Relacje sprawdzane w czasie rzeczywistym" : "Relations verified in real-time"}
            </span>
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md">
              {lang === "pl" ? "Doświadczony DevOps / Lead Programista PHP" : "Experienced DevOps / Lead PHP Developer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
