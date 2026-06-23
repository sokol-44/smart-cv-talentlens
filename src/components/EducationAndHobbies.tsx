/**
 * Autor: Michał Sokołowski
 * Generator: Google AIStudio
 * Użyty model AI/LLM: Gemini 3.5 Flash (w Google AI Studio)
 * Licencja: AGPL v3
 */

import React, { useState } from "react";
import { Education } from "../types";
import { GraduationCap, Calendar, BookOpen, Compass, ShieldCheck, Edit3, Save, X } from "lucide-react";
import { translate } from "../utils/translations";
import { SupplementaryText } from "../utils/parentheses";

/**
 * Props for the EducationAndHobbies component.
 *
 * @interface EducationAndHobbiesProps
 */
interface EducationAndHobbiesProps {
  education: Education[];
  hobbies: string[];
  lang: "pl" | "en";
  pasje?: { pl: string; en: string };
  isAdmin?: boolean;
  onSavePasje?: (pl: string, en: string) => void;
  selectedYearFilter?: string;
  onYearFilterChange?: (year: string) => void;
}

/**
 * Component displaying education records and additional hobbies or interests side-by-side.
 *
 * @param {EducationAndHobbiesProps} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
export const EducationAndHobbies: React.FC<EducationAndHobbiesProps> = ({
  education,
  hobbies,
  lang,
  pasje,
  isAdmin = false,
  onSavePasje,
}) => {
  const [isEditingPasje, setIsEditingPasje] = useState(false);
  const [pasjePl, setPasjePl] = useState(pasje?.pl || "Pozazawodowe pasje Michała, od gier RPG, żeglarstwa po mikroelektronikę i ogrodnictwo.");
  const [pasjeEn, setPasjeEn] = useState(pasje?.en || "Michał's non-professional passions, from RPG games and sailing to microelectronics and gardening.");

  React.useEffect(() => {
    if (pasje) {
      setPasjePl(pasje.pl || "");
      setPasjeEn(pasje.en || "");
    }
  }, [pasje]);

  const handleSave = () => {
    if (onSavePasje) {
      onSavePasje(pasjePl, pasjeEn);
    }
    setIsEditingPasje(false);
  };

  const defaultPasjeText = lang === "pl" ? pasjePl : pasjeEn;
  const currentPasjeText = pasje ? (pasje[lang] || pasje["pl"] || pasje["en"]) : defaultPasjeText;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="education-and-hobbies-container">
      {/* Education column */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          {translate("Wykształcenie i Studia", lang)}
        </h2>

        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-sm transition animate-fade-in"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-mono border border-blue-100 uppercase font-bold">
                    {translate(edu.type, lang)}
                  </span>
                  <h3 className="font-bold text-sm text-slate-950 mt-1.5 leading-snug">
                    <SupplementaryText text={translate(edu.major, lang)} />
                  </h3>
                  <div className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {edu.institution}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-mono text-slate-600 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {edu.date.start} – {edu.date.end}
                </span>
              </div>

              {edu.confirmation && (
                <div className="mt-3 text-xs p-2.5 bg-slate-50 border border-slate-150 rounded-lg text-slate-600 flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700">{translate("Uzyskane potwierdzenie:", lang)}</span>{" "}
                    <SupplementaryText text={translate(edu.confirmation, lang)} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies / Extra activities */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-teal-600" />
            {translate("Zainteresowania, Hobby i Uprawnienia", lang)}
          </div>
        </h2>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs relative">
          {isAdmin && (
            <div className="absolute top-4 right-4 z-10">
              {!isEditingPasje ? (
                <button
                  onClick={() => setIsEditingPasje(true)}
                  className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                  title={translate("Edytuj", lang)}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={handleSave}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                    title={translate("Zapisz", lang)}
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setPasjePl(pasje?.pl || "Pozazawodowe pasje Michała, od gier RPG, żeglarstwa po mikroelektronikę i ogrodnictwo.");
                      setPasjeEn(pasje?.en || "Michał's non-professional passions, from RPG games and sailing to microelectronics and gardening.");
                      setIsEditingPasje(false);
                    }}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title={translate("Anuluj", lang)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {isEditingPasje ? (
            <div className="space-y-3 mb-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">PL:</label>
                <textarea
                  value={pasjePl}
                  onChange={(e) => setPasjePl(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs text-slate-700"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">EN:</label>
                <textarea
                  value={pasjeEn}
                  onChange={(e) => setPasjeEn(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs text-slate-700"
                  rows={2}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 mb-4 pr-8">
              {currentPasjeText}
            </p>
          )}

          <div className="grid grid-cols-1 gap-2.5">
            {hobbies.map((hobby, idx) => {
              // Translate entire hobby
              const translatedHobby = translate(hobby, lang);
              // Extract label (before colon)
              const parts = translatedHobby.split(":");
              const isLabelPresent = parts.length > 1;
              const label = parts[0];
              const content = isLabelPresent ? parts.slice(1).join(":") : translatedHobby;

              return (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 rounded-xl text-xs text-slate-700 flex items-start gap-2.5 transition"
                >
                  <span className="text-teal-500 font-bold mt-0.5">•</span>
                  <div>
                    {isLabelPresent ? (
                      <div className="leading-relaxed">
                        <strong className="text-slate-900 font-semibold">{label}:</strong>
                        <span className="text-slate-600 ml-1">
                          {content}
                        </span>
                      </div>
                    ) : (
                      <div className="leading-relaxed">
                        {translatedHobby}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
