/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState, useEffect } from "react";
import { Employment, Project, Certificate, Education } from "../types";
import { X, Save, Calendar, Tag, Briefcase, Award, FolderGit2, GraduationCap } from "lucide-react";
import { translate } from "../utils/translations";

/**
 * Props for the EditModals component.
 *
 * @interface EditModalsProps
 */
interface EditModalsProps {
  jobToEdit: Employment | null;
  projectToEdit: Project | null;
  certToEdit: Certificate | null;
  educationToEdit: Education | null;
  onClose: () => void;
  onSaveJob: (job: Employment) => void;
  onSaveProject: (project: Project) => void;
  onSaveCert: (cert: Certificate) => void;
  onSaveEducation: (edu: Education) => void;
  lang: "pl" | "en";
}

/**
 * Modals container component that provides editing forms for employment records (Employment),
 * projects (Project), and certifications (Certificate). Handles state initialization from the selected
 * item and processes form submissions.
 *
 * @param {EditModalsProps} props - Component props.
 * @returns {JSX.Element} The rendered EditModals component containing conditional overlay forms.
 */
export const EditModals: React.FC<EditModalsProps> = ({
  jobToEdit,
  projectToEdit,
  certToEdit,
  educationToEdit,
  onClose,
  onSaveJob,
  onSaveProject,
  onSaveCert,
  onSaveEducation,
  lang,
}) => {
  // Job Form State
  const [jobFirma, setJobFirma] = useState("");
  const [jobStanowisko, setJobStanowisko] = useState("");
  const [jobStart, setJobStart] = useState("");
  const [jobEnd, setJobEnd] = useState("");
  const [jobDescriptionPl, setJobDescriptionPl] = useState("");
  const [jobDescriptionEn, setJobDescriptionEn] = useState("");
  const [jobObowiazkiPl, setJobObowiazkiPl] = useState("");
  const [jobObowiazkiEn, setJobObowiazkiEn] = useState("");
  const [jobTechs, setJobTechs] = useState("");

  // Project Form State
  const [projNazwa, setProjNazwa] = useState("");
  const [projFirma, setProjFirma] = useState("");
  const [projStart, setProjStart] = useState("");
  const [projEnd, setProjEnd] = useState("");
  const [projOpisPl, setProjOpisPl] = useState("");
  const [projOpisEn, setProjOpisEn] = useState("");
  const [projFeaturesPl, setProjFeaturesPl] = useState("");
  const [projFeaturesEn, setProjFeaturesEn] = useState("");
  const [projTechs, setProjTechs] = useState("");
  const [projUrl, setProjUrl] = useState("");

  // Certificate Form State
  const [certNazwa, setCertNazwa] = useState("");
  const [certInstytucja, setCertInstytucja] = useState("");
  const [certData, setCertData] = useState("");
  const [certGodziny, setCertGodziny] = useState("");
  const [certOpis, setCertOpis] = useState("");
  const [certTechs, setCertTechs] = useState("");

  // Education Form State
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduType, setEduType] = useState("");
  const [eduMajor, setEduMajor] = useState("");
  const [eduStart, setEduStart] = useState("");
  const [eduEnd, setEduEnd] = useState("");
  const [eduConfirmation, setEduConfirmation] = useState("");
  const [eduDescriptionPl, setEduDescriptionPl] = useState("");
  const [eduDescriptionEn, setEduDescriptionEn] = useState("");

  useEffect(() => {
    if (jobToEdit) {
      setJobFirma(jobToEdit.company);
      setJobStanowisko(Array.isArray(jobToEdit.position) ? jobToEdit.position.map(s => translate(s, lang)).join(", ") : typeof jobToEdit.position === "object" ? (lang === "pl" ? jobToEdit.position.pl : jobToEdit.position.en) : translate(jobToEdit.position, lang));
      setJobStart(jobToEdit.date.start);
      setJobEnd(jobToEdit.date.end || "");
      setJobDescriptionPl(jobToEdit.description?.pl || "");
      setJobDescriptionEn(jobToEdit.description?.en || "");
      setJobObowiazkiPl((jobToEdit.duties?.pl || []).join("\n"));
      setJobObowiazkiEn((jobToEdit.duties?.en || []).join("\n"));
      setJobTechs(jobToEdit.technologies.join(", "));
    }
  }, [jobToEdit, lang]);

  useEffect(() => {
    if (projectToEdit) {
      setProjNazwa(projectToEdit.name);
      setProjFirma(projectToEdit.company.join(", "));
      setProjStart(projectToEdit.date.start);
      setProjEnd(projectToEdit.date.end || "");
      setProjOpisPl(projectToEdit.description?.pl || "");
      setProjOpisEn(projectToEdit.description?.en || "");
      setProjFeaturesPl((projectToEdit.notableFeatures?.pl || []).join("\n"));
      setProjFeaturesEn((projectToEdit.notableFeatures?.en || []).join("\n"));
      setProjTechs(projectToEdit.technologies ? projectToEdit.technologies.join(", ") : "");
      setProjUrl(projectToEdit.url || "");
    }
  }, [projectToEdit, lang]);

  useEffect(() => {
    if (certToEdit) {
      setCertNazwa(translate(certToEdit.name, lang));
      setCertInstytucja(certToEdit.institution);
      setCertData(certToEdit.date);
      setCertGodziny(certToEdit.durationHours || "");
      setCertOpis(
        certToEdit.description
          ? typeof certToEdit.description === "object"
            ? certToEdit.description[lang] || certToEdit.description.pl || ""
            : translate(certToEdit.description, lang)
          : ""
      );
      setCertTechs(certToEdit.technologiesAndDuties ? certToEdit.technologiesAndDuties.join(", ") : "");
    }
  }, [certToEdit, lang]);

  useEffect(() => {
    if (educationToEdit) {
      setEduInstitution(educationToEdit.institution);
      setEduType(educationToEdit.type);
      setEduMajor(educationToEdit.major);
      setEduStart(educationToEdit.date.start);
      setEduEnd(educationToEdit.date.end || "");
      setEduConfirmation(educationToEdit.confirmation || "");
      setEduDescriptionPl(educationToEdit.description?.pl || "");
      setEduDescriptionEn(educationToEdit.description?.en || "");
    }
  }, [educationToEdit]);

  if (!jobToEdit && !projectToEdit && !certToEdit && !educationToEdit) return null;

  // Date Validator helper
  const isValidDate = (dateStr: string) => {
    if (dateStr.toLowerCase() === "obecnie" || dateStr === "") return true;
    const regex = /^\d{2}\.\d{4}$/;
    return regex.test(dateStr);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobToEdit) return;

    if (!isValidDate(jobStart) || !isValidDate(jobEnd)) {
      alert(lang === "pl"
        ? "Proszę wpisać datę w formacie MM.YYYY (np. 09.2015) lub pozostawić pustą ('obecnie')"
        : "Please write the date in MM.YYYY format (e.g. 09.2015) or leave blank ('present')"
      );
      return;
    }

    const updated: Employment = {
      ...jobToEdit,
      company: jobFirma,
      position: jobStanowisko.split(",").map((s) => s.trim()),
      date: { start: jobStart, end: jobEnd || "obecnie" },
      description: {
        pl: jobDescriptionPl.trim(),
        en: jobDescriptionEn.trim()
      },
      duties: {
        pl: jobObowiazkiPl.split("\n").map((o) => o.trim()).filter((o) => o.length > 0),
        en: jobObowiazkiEn.split("\n").map((o) => o.trim()).filter((o) => o.length > 0)
      },
      technologies: jobTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
    };
    onSaveJob(updated);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectToEdit) return;

    if (!isValidDate(projStart) || !isValidDate(projEnd)) {
      alert(lang === "pl"
        ? "Proszę wpisać datę w formacie MM.YYYY (np. 09.2015)"
        : "Please write the date in MM.YYYY format (e.g. 09.2015)"
      );
      return;
    }

    const updated: Project = {
      ...projectToEdit,
      name: projNazwa,
      company: projFirma.split(",").map((f) => f.trim()),
      date: { start: projStart, end: projEnd },
      description: {
        pl: projOpisPl.trim(),
        en: projOpisEn.trim(),
      },
      technologies: projTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
      url: projUrl || undefined,
      notableFeatures: {
        pl: projFeaturesPl.split("\n").map((f) => f.trim()).filter((f) => f.length > 0),
        en: projFeaturesEn.split("\n").map((f) => f.trim()).filter((f) => f.length > 0),
      }
    };
    onSaveProject(updated);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certToEdit) return;

    const updated: Certificate = {
      ...certToEdit,
      name: certNazwa,
      institution: certInstytucja,
      date: certData,
      durationHours: certGodziny || undefined,
      description: typeof certToEdit.description === "object"
        ? {
            ...certToEdit.description,
            [lang]: certOpis
          }
        : certOpis || undefined,
      technologiesAndDuties: certTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
    };
    onSaveCert(updated);
  };

  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!educationToEdit) return;

    if (!isValidDate(eduStart) || !isValidDate(eduEnd)) {
      alert(lang === "pl"
        ? "Proszę wpisać datę w formacie MM.YYYY (np. 09.2015)"
        : "Please write the date in MM.YYYY format (e.g. 09.2015)"
      );
      return;
    }

    const updated: Education = {
      ...educationToEdit,
      institution: eduInstitution,
      type: eduType,
      major: eduMajor,
      date: { start: eduStart, end: eduEnd },
      confirmation: eduConfirmation || undefined,
      description: {
        pl: eduDescriptionPl.trim(),
        en: eduDescriptionEn.trim(),
      },
    };
    onSaveEducation(updated);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto" id="edit-modals-overlay">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 font-sans font-bold text-slate-900 text-base">
            {jobToEdit && (
              <>
                <Briefcase className="w-5 h-5 text-indigo-500" />
                <span>{lang === "pl" ? "Edycja Zatrudnienia" : "Edit Employment"} - {jobFirma}</span>
              </>
            )}
            {projectToEdit && (
              <>
                <FolderGit2 className="w-5 h-5 text-emerald-500" />
                <span>{lang === "pl" ? "Edycja Projektu" : "Edit Project"} - {projNazwa}</span>
              </>
            )}
            {certToEdit && (
              <>
                <Award className="w-5 h-5 text-purple-500" />
                <span>{lang === "pl" ? "Edycja Certyfikatu" : "Edit Certificate"} - {certNazwa}</span>
              </>
            )}
            {educationToEdit && (
              <>
                <GraduationCap className="w-5 h-5 text-blue-500" />
                <span>{lang === "pl" ? "Edycja Wykształcenia" : "Edit Education"} - {eduInstitution}</span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Scrollable Form */}
        <div className="p-6 overflow-y-auto text-sm text-slate-700 flex-1">
          {/* JOB FORM */}
          {jobToEdit && (
            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Firma / Pracodawca" : "Company / Employer"}</label>
                <input
                  type="text"
                  value={jobFirma}
                  onChange={(e) => setJobFirma(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Stanowisko (rozdzielaj przecinkami)" : "Position (separate with commas)"}</label>
                <input
                  type="text"
                  value={jobStanowisko}
                  onChange={(e) => setJobStanowisko(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Rozpoczęcie (MM.YYYY)" : "Start date (MM.YYYY)"}
                  </label>
                  <input
                    type="text"
                    value={jobStart}
                    onChange={(e) => setJobStart(e.target.value)}
                    placeholder="np. 09.2015"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Zakończenie (MM.YYYY / obecnie)" : "End date (MM.YYYY / currently)"}
                  </label>
                  <input
                    type="text"
                    value={jobEnd}
                    onChange={(e) => setJobEnd(e.target.value)}
                    placeholder="np. 10.2025"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Technologie (rozdzielaj przecinkami)" : "Technologies (separate with commas)"}
                </label>
                <input
                  type="text"
                  value={jobTechs}
                  onChange={(e) => setJobTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">
                  {lang === "pl" ? "Opis stanowiska (PL)" : "Role description (PL)"}
                </label>
                <textarea
                  value={jobDescriptionPl}
                  onChange={(e) => setJobDescriptionPl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">
                  {lang === "pl" ? "Opis stanowiska (EN)" : "Role description (EN)"}
                </label>
                <textarea
                  value={jobDescriptionEn}
                  onChange={(e) => setJobDescriptionEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">
                  {lang === "pl" ? "Obowiązki (PL, każdy w nowej linii)" : "Duties (PL, each in a new line)"}
                </label>
                <textarea
                  value={jobObowiazkiPl}
                  onChange={(e) => setJobObowiazkiPl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">
                  {lang === "pl" ? "Obowiązki (EN, każdy w nowej linii)" : "Duties (EN, each in a new line)"}
                </label>
                <textarea
                  value={jobObowiazkiEn}
                  onChange={(e) => setJobObowiazkiEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  rows={3}
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-semibold cursor-pointer"
                >
                  {translate("Anuluj", lang)}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{translate("Zapisz", lang)}</span>
                </button>
              </div>
            </form>
          )}

          {/* PROJECT FORM */}
          {projectToEdit && (
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Nazwa Projektu" : "Project Name"}</label>
                <input
                  type="text"
                  value={projNazwa}
                  onChange={(e) => setProjNazwa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Firmy / Freelancerzy (przecinek)" : "Companies / Freelancers (comma)"}</label>
                <input
                  type="text"
                  value={projFirma}
                  onChange={(e) => setProjFirma(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Rozpoczęcie (MM.YYYY)" : "Start date (MM.YYYY)"}
                  </label>
                  <input
                    type="text"
                    value={projStart}
                    onChange={(e) => setProjStart(e.target.value)}
                    placeholder="np. 03.2024"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Zakończenie (MM.YYYY / obecnie)" : "End date (MM.YYYY / currently)"}
                  </label>
                  <input
                    type="text"
                    value={projEnd}
                    onChange={(e) => setProjEnd(e.target.value)}
                    placeholder="np. 10.2025"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "URL projektu (opcjonalny)" : "Project URL (optional)"}</label>
                <input
                  type="url"
                  value={projUrl}
                  onChange={(e) => setProjUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Technologie (rozdzielaj przecinkami)" : "Technologies (separate with commas)"}
                </label>
                <input
                  type="text"
                  value={projTechs}
                  onChange={(e) => setProjTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Opis projektu (PL)" : "Project description (PL)"}</label>
                <textarea
                  value={projOpisPl}
                  onChange={(e) => setProjOpisPl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Opis projektu (EN)" : "Project description (EN)"}</label>
                <textarea
                  value={projOpisEn}
                  onChange={(e) => setProjOpisEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Wyróżniające elementy (PL, każda linia to jeden element)" : "Notable features (PL, each line is one item)"}</label>
                <textarea
                  value={projFeaturesPl}
                  onChange={(e) => setProjFeaturesPl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Wyróżniające elementy (EN, każda linia to jeden element)" : "Notable features (EN, each line is one item)"}</label>
                <textarea
                  value={projFeaturesEn}
                  onChange={(e) => setProjFeaturesEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                  rows={3}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-semibold cursor-pointer"
                >
                  {translate("Anuluj", lang)}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{translate("Zapisz", lang)}</span>
                </button>
              </div>
            </form>
          )}

          {/* CERTIFICATE FORM */}
          {certToEdit && (
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Nazwa Szkolenia / Certyfikatu" : "Course / Certificate Name"}</label>
                <input
                  type="text"
                  value={certNazwa}
                  onChange={(e) => setCertNazwa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Instytucja certyfikująca" : "Certifying institution"}</label>
                <input
                  type="text"
                  value={certInstytucja}
                  onChange={(e) => setCertInstytucja(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Data certyfikatu (MM.YYYY / YYYY)" : "Certificate date (MM.YYYY / YYYY)"}
                  </label>
                  <input
                    type="text"
                    value={certData}
                    onChange={(e) => setCertData(e.target.value)}
                    placeholder="np. 06.2026"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    {lang === "pl" ? "Czas trwania (godziny)" : "Duration (hours)"}
                  </label>
                  <input
                    type="number"
                    value={certGodziny}
                    onChange={(e) => setCertGodziny(e.target.value)}
                    placeholder="np. 140"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Powiązane tagi / technologie (przecinek)" : "Linked tags / technologies (comma)"}
                </label>
                <input
                  type="text"
                  value={certTechs}
                  onChange={(e) => setCertTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Dodatkowe informacje" : "Additional information"}</label>
                <textarea
                  value={certOpis}
                  onChange={(e) => setCertOpis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-semibold cursor-pointer"
                >
                  {translate("Anuluj", lang)}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{translate("Zapisz", lang)}</span>
                </button>
              </div>
            </form>
          )}

          {/* EDUCATION FORM */}
          {educationToEdit && (
            <form onSubmit={handleSaveEducation} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Instytucja / Uczelnia" : "Institution / University"}</label>
                <input
                  type="text"
                  value={eduInstitution}
                  onChange={(e) => setEduInstitution(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Typ studiów / szkoły" : "Type of studies / school"}</label>
                <input
                  type="text"
                  value={eduType}
                  onChange={(e) => setEduType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Kierunek / Profil" : "Major / Profile"}</label>
                <input
                  type="text"
                  value={eduMajor}
                  onChange={(e) => setEduMajor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Start (MM.YYYY)" : "Start (MM.YYYY)"}
                  </label>
                  <input
                    type="text"
                    value={eduStart}
                    onChange={(e) => setEduStart(e.target.value)}
                    placeholder="np. 09.2010"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lang === "pl" ? "Koniec (MM.YYYY)" : "End (MM.YYYY)"}
                  </label>
                  <input
                    type="text"
                    value={eduEnd}
                    onChange={(e) => setEduEnd(e.target.value)}
                    placeholder="np. 05.2011"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Potwierdzenie / Dyplom" : "Confirmation / Diploma"}</label>
                <input
                  type="text"
                  value={eduConfirmation}
                  onChange={(e) => setEduConfirmation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Opis (PL)</label>
                <textarea
                  value={eduDescriptionPl}
                  onChange={(e) => setEduDescriptionPl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Description (EN)</label>
                <textarea
                  value={eduDescriptionEn}
                  onChange={(e) => setEduDescriptionEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700"
                  rows={3}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-semibold cursor-pointer"
                >
                  {translate("Anuluj", lang)}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{translate("Zapisz", lang)}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
