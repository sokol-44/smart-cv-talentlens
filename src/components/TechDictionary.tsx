/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState, useMemo } from "react";
import { TechDictionaries, CVData, TechDictionaryElement } from "../types";
import { Search, Tag, Server, Code, HardDrive, Cloud, Layers, Terminal, Cpu, CheckCircle2, Award, Briefcase, FolderGit2, Edit3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translate } from "../utils/translations";

/**
 * Props for the TechDictionary component.
 *
 * @interface TechDictionaryProps
 */
interface TechDictionaryProps {
  cvData: CVData;
  onTagClick?: (tag: string) => void;
  lang: "pl" | "en";
  isAdmin?: boolean;
  onUpdateCvData?: (newCvData: CVData) => void;
}

/**
 * Technology Dictionary component.
 * Lists, categorizes, and explains all technologies mentioned across the CV,
 * providing real-time usages lookup (projects, employments, and certs) when a tag is clicked.
 *
 * @param {TechDictionaryProps} props - Component props.
 * @returns {JSX.Element} The rendered TechDictionary component.
 */
export const TechDictionary: React.FC<TechDictionaryProps> = ({
  cvData,
  onTagClick,
  lang,
  isAdmin = false,
  onUpdateCvData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Build the dictionary computed from the flat skills array dynamically
  const dictionary = useMemo<TechDictionaries>(() => {
    const categories: TechDictionaries = {
      programmingLanguages: [],
      frameworksAndLibraries: [],
      databasesAndStorage: [],
      cloudToolsAndPlatforms: [],
      operatingSystemsAndAdmin: [],
      apiProtocolsAndIntegrations: [],
      networkAndServerServices: [],
      otherTools: [],
    };

    cvData.skills.forEach((skill) => {
      const cat = (skill.skillType || "otherTools") as keyof TechDictionaries;
      if (categories[cat]) {
        categories[cat].push({
          name: skill.name,
          synonyms: skill.synonyms || [],
        });
      }
    });

    return categories;
  }, [cvData.skills]);

  // States for Technology Editor
  const [editingTag, setEditingTag] = useState<TechDictionaryElement | null>(null);
  const [editingCategory, setEditingCategory] = useState<keyof TechDictionaries | null>(null);
  const [editLevel, setEditLevel] = useState<string>("brak");
  const [editCustomLevel, setEditCustomLevel] = useState<string>("");
  const [editSynonyms, setEditSynonyms] = useState<string>("");

  // Opens the edit modal and populates it with the technology's current settings
  const handleOpenEditModal = (tagObj: TechDictionaryElement, category: keyof TechDictionaries) => {
    setEditingTag(tagObj);
    setEditingCategory(category);
    setEditSynonyms(tagObj.synonyms ? tagObj.synonyms.join(", ") : "");

    const existingSkill = cvData.skills.find(s => s.name.toLowerCase() === tagObj.name.toLowerCase());
    if (existingSkill) {
      const level = existingSkill.proficiencyLevel;
      if (level) {
        if (["zaawansowany", "średni", "podstawowy", "zasłyszany"].includes(level)) {
          setEditLevel(level);
          setEditCustomLevel("");
        } else {
          setEditLevel("custom");
          setEditCustomLevel(level);
        }
      } else {
        setEditLevel("brak");
        setEditCustomLevel("");
      }
    } else {
      setEditLevel("brak");
      setEditCustomLevel("");
    }
  };

  // Saves the edited values to the global CV data
  const handleSaveEdit = () => {
    if (!editingTag || !editingCategory || !onUpdateCvData) return;

    const updatedCvData = JSON.parse(JSON.stringify(cvData)) as CVData;

    // Parse synonyms from comma-separated list
    const newSynonyms = editSynonyms
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const targetLevel = editLevel === "custom" ? editCustomLevel.trim() : editLevel;
    const existingSkillIndex = updatedCvData.skills.findIndex(
      s => s.name.toLowerCase() === editingTag.name.toLowerCase()
    );

    if (existingSkillIndex !== -1) {
      updatedCvData.skills[existingSkillIndex] = {
        ...updatedCvData.skills[existingSkillIndex],
        synonyms: newSynonyms,
        skillType: editingCategory,
      };
      if (targetLevel === "brak" || targetLevel === "") {
        delete updatedCvData.skills[existingSkillIndex].proficiencyLevel;
      } else {
        updatedCvData.skills[existingSkillIndex].proficiencyLevel = targetLevel;
      }
    } else {
      const newSkill: any = {
        name: editingTag.name,
        skillType: editingCategory,
        synonyms: newSynonyms,
      };
      if (targetLevel !== "brak" && targetLevel !== "") {
        newSkill.proficiencyLevel = targetLevel;
      }
      updatedCvData.skills.push(newSkill);
    }

    onUpdateCvData(updatedCvData);
    setEditingTag(null);
    setEditingCategory(null);
  };

  // Friendly display names for dictionary categories
  const categoryMeta: Record<keyof TechDictionaries, { label: string; icon: any; color: string }> = {
    programmingLanguages: { label: translate("Języki programowania", lang), icon: Code, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    frameworksAndLibraries: { label: translate("Frameworki i biblioteki", lang), icon: Layers, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    databasesAndStorage: { label: translate("Bazy danych i Storage", lang), icon: HardDrive, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    cloudToolsAndPlatforms: { label: translate("Narzędzia i Chmura", lang), icon: Cloud, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    operatingSystemsAndAdmin: { label: translate("OS i Administracja", lang), icon: Terminal, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    apiProtocolsAndIntegrations: { label: translate("API i Integracje", lang), icon: Server, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    networkAndServerServices: { label: translate("Usługi sieciowe i Serwery", lang), icon: Cpu, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    otherTools: { label: translate("Inne narzędzia / GIT", lang), icon: Tag, color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  };

  // Build list of all tags grouped by category
  const categories = Object.keys(dictionary) as Array<keyof TechDictionaries>;

  // Filter based on search and active category
  const filteredTagsByCategory = useMemo(() => {
    const result: Partial<Record<keyof TechDictionaries, TechDictionaryElement[]>> = {};
    for (const cat of categories) {
      if (activeCategory && activeCategory !== cat) continue;
      const tags = dictionary[cat].filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.synonyms && t.synonyms.some((syn) => syn.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      if (tags.length > 0) {
        result[cat] = tags;
      }
    }
    return result;
  }, [dictionary, searchTerm, activeCategory, categories]);

  // Relational finder: what is connected to the selected tag
  const tagConnections = useMemo(() => {
    if (!selectedTag) return null;
    const tagLower = selectedTag.toLowerCase();

    // 1. Find jobs where tag is listed
    const jobs = cvData.employment.filter((job) =>
      job.technologies.some((t) => t.toLowerCase() === tagLower) ||
      (job.duties && (
        (job.duties.pl && job.duties.pl.some((o) => o.toLowerCase().includes(tagLower))) ||
        (job.duties.en && job.duties.en.some((o) => o.toLowerCase().includes(tagLower)))
      )) ||
      (job.description && (
        (job.description.pl && job.description.pl.toLowerCase().includes(tagLower)) ||
        (job.description.en && job.description.en.toLowerCase().includes(tagLower))
      ))
    );

    // 2. Find projects where tag is listed
    const projects = cvData.projects.filter((p) =>
      p.technologies.some((t) => t.toLowerCase() === tagLower) ||
      p.description.toLowerCase().includes(tagLower)
    );

    // 3. Find certifications where tag is listed in "technologiesAndDuties"
    const certs = cvData.certificates.filter((c) =>
      (c.technologiesAndDuties && c.technologiesAndDuties.some((t) => t.toLowerCase() === tagLower)) ||
      c.name.toLowerCase().includes(tagLower) ||
      (c.description && c.description.toLowerCase().includes(tagLower))
    );

    // 4. Find defined skill level
    const skillRating = cvData.skills.find((s) => s.name.toLowerCase() === tagLower);

    return { jobs, projects, certs, skillRating };
  }, [selectedTag, cvData]);

  // Helper to find connections of a tag for the hover tooltip list
  const getConnectionsSummary = (tag: string) => {
    const lower = tag.toLowerCase();

    const jobs = cvData.employment
      .filter((job) => job.technologies.some((t) => t.toLowerCase() === lower))
      .map((j) => j.company);

    const projects = cvData.projects
      .filter((p) => p.technologies.some((t) => t.toLowerCase() === lower))
      .map((p) => p.name);

    return { jobs, projects };
  };

  // Helper to get skill icon & rating info for a tag
  const getSkillRatingInfo = (tag: string) => {
    const lower = tag.toLowerCase();
    const rating = cvData.skills.find((s) => s.name.toLowerCase() === lower);
    if (!rating || !rating.proficiencyLevel) {
      return {
        level: null,
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />,
        color: "text-slate-500",
      };
    }

    const level = rating.proficiencyLevel.toLowerCase();
    if (level.includes("zaawansowan") || level.includes("advanc")) {
      return {
        level: translate("Stopień zaawansowania", lang) + ": " + translate(rating.proficiencyLevel, lang),
        icon: <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-100 animate-pulse" />,
        color: "text-amber-700 font-bold",
      };
    } else if (level.includes("średn") || level.includes("intermed")) {
      return {
        level: translate("Stopień zaawansowania", lang) + ": " + translate(rating.proficiencyLevel, lang),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />,
        color: "text-blue-700 font-medium",
      };
    } else if (level.includes("podstawow") || level.includes("basic")) {
      return {
        level: translate("Stopień zaawansowania", lang) + ": " + translate(rating.proficiencyLevel, lang),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
        color: "text-emerald-600 font-medium",
      };
    } else if (level.includes("zasłyszan") || level.includes("heard")) {
      return {
        level: translate("Stopień zaawansowania", lang) + ": " + translate(rating.proficiencyLevel, lang),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />,
        color: "text-slate-500 font-medium",
      };
    } else {
      return {
        level: translate("Stopień zaawansowania", lang) + ": " + translate(rating.proficiencyLevel, lang),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />,
        color: "text-slate-600",
      };
    }
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm" id="tech-dictionary-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-indigo-500" />
            {translate("Słownik Technologii i Narzędzi", lang)}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {translate("Kliknij dowolną technologię, aby sprawdzić powiązane projekty, firmy i certyfikaty.", lang)}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={translate("Szukaj technologii...", lang)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Level & Icons Legend */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl animate-fade-in" id="tech-legend">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Skill Levels next to elements */}
          <div>
            <span className="font-bold text-slate-700 block mb-2 font-mono uppercase tracking-wider text-[10px]">
              {lang === "pl" ? "Ikonki przy konkretnych elementach (Poziomy znajomości):" : "Icons next to elements (Knowledge Levels):"}
            </span>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 fill-amber-100 animate-pulse" />
                <span className="font-semibold text-slate-700">{translate("Poziom zaawansowany / ekspert", lang)}</span>
                <span className="text-slate-400 font-mono text-[10px]">{lang === "pl" ? "(Codzienne użycie, zaawansowane mechanizmy)" : "(Daily usage, advanced mechanisms)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                <span className="font-semibold text-slate-700">{translate("Poziom średniozaawansowany", lang)}</span>
                <span className="text-slate-400 font-mono text-[10px]">{lang === "pl" ? "(Samodzielna praca i wdrażanie rozwiązań)" : "(Independent work and implementation)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-700">{translate("Poziom podstawowy", lang)}</span>
                <span className="text-slate-400 font-mono text-[10px]">{lang === "pl" ? "(Podstawowa modyfikacja, rozumienie kodu)" : "(Basic modification, code understanding)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-700">{translate("Słyszał", lang)}</span>
                <span className="text-slate-400 font-mono text-[10px]">{lang === "pl" ? "(Wie o narzędziu, ale nie używał go w praktyce)" : "(Knows about the tool but has not used it in practice)"}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Category Group Icons */}
          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
            <span className="font-bold text-slate-700 block mb-2 font-mono uppercase tracking-wider text-[10px]">
              {lang === "pl" ? "Ikony kategorii technologicznych:" : "Technology Category Icons:"}
            </span>
            <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{translate("Języki programowania", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>{translate("Frameworki i biblioteki", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{translate("Bazy danych i Storage", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>{translate("Narzędzia i Chmura", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{translate("OS i Administracja", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{translate("API i Integracje", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>{translate("Usługi sieciowe i Serwery", lang)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{translate("Inne narzędzia / GIT", lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
            activeCategory === null
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
          }`}
        >
          {translate("Wszystkie kategorie", lang)}
        </button>
        {categories.map((cat) => {
          const meta = categoryMeta[cat];
          const Icon = meta.icon;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(filteredTagsByCategory).map(([catKey, val]) => {
          const key = catKey as keyof TechDictionaries;
          const meta = categoryMeta[key];
          const Icon = meta.icon;
          const tags = val as TechDictionaryElement[];

          return (
            <div key={key} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <div className={`p-1.5 rounded-lg border ${meta.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-mono font-bold text-slate-700 tracking-wider uppercase">
                  {meta.label}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {tags?.map((tagObj) => {
                  const tag = tagObj.name;
                  const skillRating = getSkillRatingInfo(tag);
                  const connections = getConnectionsSummary(tag);
                  const hasConnections = connections.jobs.length > 0 || connections.projects.length > 0;

                  return (
                    <div key={tag} className="relative group/tag inline-block">
                      {isAdmin ? (
                        <button
                          onClick={() => handleSelectTag(tag)}
                          className={`flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 text-xs rounded-lg border transition duration-150 cursor-pointer ${
                            selectedTag === tag
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                              : "bg-white hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 border-slate-200/60"
                          }`}
                        >
                          {skillRating.icon}
                          <span>{translate(tag, lang)}</span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEditModal(tagObj, key);
                            }}
                            className="p-1 hover:bg-indigo-100 hover:text-indigo-600 rounded ml-1 transition text-slate-400 cursor-pointer inline-flex items-center"
                            title={lang === "pl" ? "Edytuj cechy" : "Edit characteristics"}
                          >
                            <Edit3 className="w-3 h-3" />
                          </span>
                        </button>
                      ) : (
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border bg-white text-slate-700 border-slate-200/60 shadow-xs cursor-default"
                        >
                          {skillRating.icon}
                          <span>{translate(tag, lang)}</span>
                        </div>
                      )}

                      {/* Tooltip containing workplace and projects where used */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover/tag:block z-50 w-52 bg-slate-950 text-white text-[10px] p-3 rounded-xl shadow-lg leading-relaxed font-sans border border-slate-800 animate-fade-in pointer-events-none">
                        <div className="font-bold text-indigo-300 border-b border-slate-800 pb-1 mb-1.5 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          <span>{translate(tag, lang)}</span>
                        </div>
                        
                        {tagObj.synonyms && tagObj.synonyms.length > 0 && (
                          <div className="mb-2 text-slate-400 text-[9px] leading-tight">
                            <span className="font-semibold text-slate-300">{translate("Synonimy:", lang)}</span> {tagObj.synonyms.join(", ")}
                          </div>
                        )}

                        {skillRating.level && (
                          <div className="mb-2 text-amber-400 italic font-mono text-[9px]">
                            {skillRating.level}
                          </div>
                        )}

                        {hasConnections ? (
                          <div className="space-y-1.5">
                            {connections.jobs.length > 0 && (
                              <div>
                                <span className="text-slate-400 font-semibold block">{translate("Miejsca pracy:", lang)}</span>
                                <ul className="list-disc pl-3.5 text-[9px] text-slate-200">
                                  {connections.jobs.map((job, idx) => (
                                    <li key={idx}>{job}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {connections.projects.length > 0 && (
                              <div>
                                <span className="text-slate-400 font-semibold block">{translate("Projekty:", lang)}</span>
                                <ul className="list-disc pl-3.5 text-[9px] text-slate-200">
                                  {connections.projects.map((proj, idx) => (
                                    <li key={idx}>{proj}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-slate-400 italic text-[9px]">
                            {translate("Ogólna znajomość / Baza wiedzy", lang)}
                          </div>
                        )}

                        {/* Arrow tooltip tail */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Relational details drawer when a tag is selected */}
      <AnimatePresence>
        {selectedTag && tagConnections && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-5 bg-indigo-50/60 border border-indigo-100/80 rounded-2xl text-slate-800 animate-fade-in"
          >
            <div className="flex items-center justify-between mb-4 border-b border-indigo-100/50 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-sm">
                  {selectedTag}
                </span>
                {tagConnections.skillRating && tagConnections.skillRating.proficiencyLevel && (
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>{translate("Deklarowany poziom:", lang)}</span>
                    <span className="font-bold uppercase px-1.5 py-0.5 bg-indigo-200/50 text-indigo-800 rounded-md">
                      {translate(tagConnections.skillRating.proficiencyLevel, lang)}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-mono hover:underline cursor-pointer"
              >
                {translate("Zamknij panel [x]", lang)}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {/* Linked Jobs */}
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100/40 shadow-xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {translate("Powiązane zatrudnienie", lang)} ({tagConnections.jobs.length})
                </h4>
                {tagConnections.jobs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{translate("Brak bezpośrednich wpisów etatowych.", lang)}</p>
                ) : (
                  <ul className="space-y-2">
                    {tagConnections.jobs.map((job, i) => (
                      <li key={i} className="text-xs border-l-2 border-indigo-300 pl-2">
                        <div className="font-semibold text-slate-800">{job.company}</div>
                        <div className="text-slate-500 text-[10px]">
                          {Array.isArray(job.position) ? job.position.map(s => translate(s, lang)).join(", ") : translate(job.position, lang)} ({job.date.start} - {job.date.end || translate("obecnie", lang)})
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Linked Projects */}
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100/40 shadow-xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-slate-400" />
                  {translate("Powiązane projekty", lang)} ({tagConnections.projects.length})
                </h4>
                {tagConnections.projects.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{translate("Brak powiązanych projektów w bazie.", lang)}</p>
                ) : (
                  <ul className="space-y-2">
                    {tagConnections.projects.map((p, i) => (
                      <li key={i} className="text-xs border-l-2 border-indigo-300 pl-2">
                        <div className="font-semibold text-slate-800">{p.name}</div>
                        <div className="text-slate-500 text-[10px]">{p.date.start} - {p.date.end || translate("obecnie", lang)}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Linked Certifications */}
              <div className="bg-white p-3.5 rounded-xl border border-indigo-100/40 shadow-xs">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  {translate("Certyfikaty i szkolenia", lang)} ({tagConnections.certs.length})
                </h4>
                {tagConnections.certs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">{translate("Brak szkoleń powiązanych z tagiem.", lang)}</p>
                ) : (
                  <ul className="space-y-2">
                    {tagConnections.certs.map((c, i) => (
                      <li key={i} className="text-xs border-l-2 border-indigo-300 pl-2">
                        <div className="font-semibold text-slate-800">{c.name}</div>
                        <div className="text-slate-500 text-[10px]">{c.institution} • {c.date}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit technology characteristics modal for logged-in users */}
      <AnimatePresence>
        {editingTag && editingCategory && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <Edit3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {lang === "pl" ? "Edytuj cechy technologii" : "Edit technology characteristics"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === "pl" ? "Słownik technologii i narzędzi" : "Technology dictionary & tools"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Tech Name (Read-Only) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    {lang === "pl" ? "Nazwa technologii:" : "Technology name:"}
                  </label>
                  <input
                    type="text"
                    value={editingTag.name}
                    disabled
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                </div>

                {/* Proficiency Level Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    {lang === "pl" ? "Stopień zaawansowania:" : "Proficiency level:"}
                  </label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="brak">
                      {lang === "pl" ? "Brak / Usuń z umiejętności" : "None / Remove from skills"}
                    </option>
                    <option value="zaawansowany">
                      {lang === "pl" ? "zaawansowany" : "advanced"}
                    </option>
                    <option value="średni">
                      {lang === "pl" ? "średni" : "intermediate"}
                    </option>
                    <option value="podstawowy">
                      {lang === "pl" ? "podstawowy" : "basic"}
                    </option>
                    <option value="zasłyszany">
                      {lang === "pl" ? "zasłyszany" : "heard of"}
                    </option>
                    <option value="custom">
                      {lang === "pl" ? "Inny / Własny..." : "Other / Custom..."}
                    </option>
                  </select>
                </div>

                {/* Custom Level Text Input (shown only if 'custom' is selected) */}
                {editLevel === "custom" && (
                  <div className="animate-fade-in">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      {lang === "pl" ? "Wpisz własny stopień zaawansowania:" : "Type custom proficiency level:"}
                    </label>
                    <input
                      type="text"
                      value={editCustomLevel}
                      onChange={(e) => setEditCustomLevel(e.target.value)}
                      placeholder={lang === "pl" ? "np. ekspert, upper-intermediate" : "e.g. expert, upper-intermediate"}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* Synonyms list */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    {lang === "pl" ? "Synonimy (rozdzielone przecinkami):" : "Synonyms (comma-separated):"}
                  </label>
                  <input
                    type="text"
                    value={editSynonyms}
                    onChange={(e) => setEditSynonyms(e.target.value)}
                    placeholder={lang === "pl" ? "np. JS, ES6, JavaScript" : "e.g. JS, ES6, JavaScript"}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    {lang === "pl"
                      ? "Synonimy pomagają rekruterom wyszukiwać tę technologię za pomocą różnych haseł."
                      : "Synonyms help recruiters search for this technology using different terms."}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTag(null);
                    setEditingCategory(null);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:underline cursor-pointer font-medium"
                >
                  {lang === "pl" ? "Anuluj" : "Cancel"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  {lang === "pl" ? "Zapisz" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
