import React, { useState, useMemo } from "react";
import { SlownikiUzytychTechnologii, CVData, TechnologiaSlownikElement } from "../types";
import { Search, Tag, Server, Code, HardDrive, Cloud, Layers, Terminal, Cpu, Info, CheckCircle2, Award, Briefcase, FolderGit2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translate } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the TechDictionary component.
 *
 * @interface TechDictionaryProps
 */
interface TechDictionaryProps {
  slownik: SlownikiUzytychTechnologii;
  cvData: CVData;
  onTagClick?: (tag: string) => void;
  lang: "pl" | "en";
}

/**
 * Technology Dictionary component.
 * Lists, categorizes, and explains all technologies mentioned across the CV,
 * providing real-time usages lookup (projects, employments, and certs) when a tag is clicked.
 *
 * @param {TechDictionaryProps} props - Component props.
 * @returns {JSX.Element} The rendered TechDictionary component.
 */
export const TechDictionary: React.FC<TechDictionaryProps> = ({ slownik, cvData, onTagClick, lang }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Friendly display names for dictionary categories
  const categoryMeta: Record<keyof SlownikiUzytychTechnologii, { label: string; icon: any; color: string }> = {
    jezyki_programowania_i_skryptowe: { label: translate("Języki programowania", lang), icon: Code, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    frameworki_i_biblioteki: { label: translate("Frameworki i biblioteki", lang), icon: Layers, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    bazy_danych_i_przechowywanie: { label: translate("Bazy danych i Storage", lang), icon: HardDrive, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    Narzedzia_i_platformy_Cloud: { label: translate("Narzędzia i Chmura", lang), icon: Cloud, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    systemy_operacyjne_i_administracja: { label: translate("OS i Administracja", lang), icon: Terminal, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    protokoly_API_i_integracje: { label: translate("API i Integracje", lang), icon: Server, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    Uslugi_sieciowe_i_serwerowe: { label: translate("Usługi sieciowe i Serwery", lang), icon: Cpu, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    Inne_narzedzia: { label: translate("Inne narzędzia / GIT", lang), icon: Tag, color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  };

  // Build list of all tags grouped by category
  const categories = Object.keys(slownik) as Array<keyof SlownikiUzytychTechnologii>;

  // Filter based on search and active category
  const filteredTagsByCategory = useMemo(() => {
    const result: Partial<Record<keyof SlownikiUzytychTechnologii, TechnologiaSlownikElement[]>> = {};
    for (const cat of categories) {
      if (activeCategory && activeCategory !== cat) continue;
      const tags = slownik[cat].filter((t) =>
        t.nazwa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.synonimy && t.synonimy.some((syn) => syn.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      if (tags.length > 0) {
        result[cat] = tags;
      }
    }
    return result;
  }, [slownik, searchTerm, activeCategory, categories]);

  // Relational finder: what is connected to the selected tag
  const tagConnections = useMemo(() => {
    if (!selectedTag) return null;
    const tagLower = selectedTag.toLowerCase();

    // 1. Find jobs where tag is listed
    const jobs = cvData.zatrudnienie.filter((job) =>
      job.technologie.some((t) => t.toLowerCase() === tagLower) ||
      (job.obowiazki && job.obowiazki.some((o) => o.toLowerCase().includes(tagLower)))
    );

    // 2. Find projects where tag is listed
    const projects = cvData.glowne_projekty.filter((p) =>
      p.technologie.some((t) => t.toLowerCase() === tagLower) ||
      p.opis.toLowerCase().includes(tagLower)
    );

    // 3. Find certifications where tag is listed in "technologie_i_obowiazki"
    const certs = cvData.dodatkowe_kursy_i_certyfikaty.filter((c) =>
      (c.technologie_i_obowiazki && c.technologie_i_obowiazki.some((t) => t.toLowerCase() === tagLower)) ||
      c.nazwa.toLowerCase().includes(tagLower) ||
      (c.informacje && c.informacje.toLowerCase().includes(tagLower))
    );

    // 4. Find defined skill level
    const skillRating = cvData.umiejetnosci.find((s) => s.nazwa.toLowerCase() === tagLower);

    return { jobs, projects, certs, skillRating };
  }, [selectedTag, cvData]);

  // Helper to find connections of a tag for the hover tooltip list
  const getConnectionsSummary = (tag: string) => {
    const lower = tag.toLowerCase();

    const jobs = cvData.zatrudnienie
      .filter((job) => job.technologie.some((t) => t.toLowerCase() === lower))
      .map((j) => j.firma);

    const projects = cvData.glowne_projekty
      .filter((p) => p.technologie.some((t) => t.toLowerCase() === lower))
      .map((p) => p.nazwa);

    return { jobs, projects };
  };

  // Helper to get skill icon & rating info for a tag (a)
  const getSkillRatingInfo = (tag: string) => {
    const lower = tag.toLowerCase();
    const rating = cvData.umiejetnosci.find((s) => s.nazwa.toLowerCase() === lower);
    if (!rating) {
      return {
        level: null,
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
        color: "text-slate-500",
      };
    }

    const level = rating.stopien_zaawansowania.toLowerCase();
    if (level.includes("zaawansowan") || level.includes("advanc")) {
      return {
        level: translate("stopien_zaawansowania", lang) + ": " + translate(rating.stopien_zaawansowania, lang),
        icon: <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-100 animate-pulse" />,
        color: "text-amber-700 font-bold",
      };
    } else if (level.includes("średn") || level.includes("intermed")) {
      return {
        level: translate("stopien_zaawansowania", lang) + ": " + translate(rating.stopien_zaawansowania, lang),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />,
        color: "text-blue-700 font-medium",
      };
    } else {
      return {
        level: translate("stopien_zaawansowania", lang) + ": " + translate(rating.stopien_zaawansowania, lang),
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
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
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
          const key = catKey as keyof SlownikiUzytychTechnologii;
          const meta = categoryMeta[key];
          const Icon = meta.icon;
          const tags = val as TechnologiaSlownikElement[];

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
                  const tag = tagObj.nazwa;
                  const skillRating = getSkillRatingInfo(tag);
                  const connections = getConnectionsSummary(tag);
                  const hasConnections = connections.jobs.length > 0 || connections.projects.length > 0;

                  return (
                    <div key={tag} className="relative group/tag inline-block">
                      <button
                        onClick={() => handleSelectTag(tag)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition duration-150 cursor-pointer ${
                          selectedTag === tag
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white hover:bg-indigo-50 hover:text-indigo-900 text-slate-700 border-slate-200/60"
                        }`}
                      >
                        {/* Advancement level icon next to name (a) */}
                        {skillRating.icon}
                        <span>{tag}</span>
                      </button>

                      {/* Tooltip containing workplace and projects where used (b) */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover/tag:block z-50 w-52 bg-slate-950 text-white text-[10px] p-3 rounded-xl shadow-lg leading-relaxed font-sans border border-slate-800 animate-fade-in pointer-events-none">
                        <div className="font-bold text-indigo-300 border-b border-slate-800 pb-1 mb-1.5 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          <span>{tag}</span>
                        </div>
                        
                        {tagObj.synonimy && tagObj.synonimy.length > 0 && (
                          <div className="mb-2 text-slate-400 text-[9px] leading-tight">
                            <span className="font-semibold text-slate-300">{translate("Synonimy:", lang)}</span> {tagObj.synonimy.join(", ")}
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
                {tagConnections.skillRating && (
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>{translate("Deklarowany poziom:", lang)}</span>
                    <span className="font-bold uppercase px-1.5 py-0.5 bg-indigo-200/50 text-indigo-800 rounded-md">
                      {translate(tagConnections.skillRating.stopien_zaawansowania, lang)}
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
                        <div className="font-semibold text-slate-800">{job.firma}</div>
                        <div className="text-slate-500 text-[10px]">
                          {Array.isArray(job.stanowisko) ? job.stanowisko.map(s => translate(s, lang)).join(", ") : translate(job.stanowisko, lang)} ({job.data.start} - {job.data.end || translate("obecnie", lang)})
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
                        <div className="font-semibold text-slate-800">{p.nazwa}</div>
                        <div className="text-slate-500 text-[10px]">{p.data.start} - {p.data.end || translate("obecnie", lang)}</div>
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
                        <div className="font-semibold text-slate-800">{c.nazwa}</div>
                        <div className="text-slate-500 text-[10px]">{c.instytucja} • {c.data}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
