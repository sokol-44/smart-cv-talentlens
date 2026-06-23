import React, { useState, useEffect } from "react";
import { Zatrudnienie, Projekt, Certyfikat } from "../types";
import { X, Save, Calendar, Tag, Briefcase, Award, FolderGit2 } from "lucide-react";
import { translate } from "../utils/translations";

/**
 * Props for the EditModals component.
 *
 * @interface EditModalsProps
 */
interface EditModalsProps {
  jobToEdit: Zatrudnienie | null;
  projectToEdit: Projekt | null;
  certToEdit: Certyfikat | null;
  onClose: () => void;
  onSaveJob: (job: Zatrudnienie) => void;
  onSaveProject: (project: Projekt) => void;
  onSaveCert: (cert: Certyfikat) => void;
  lang: "pl" | "en";
}

/**
 * Modals container component that provides editing forms for employment records (Zatrudnienie),
 * projects (Projekt), and certifications (Certyfikat). Handles state initialization from the selected
 * item and processes form submissions.
 *
 * @param {EditModalsProps} props - Component props.
 * @returns {JSX.Element} The rendered EditModals component containing conditional overlay forms.
 */
export const EditModals: React.FC<EditModalsProps> = ({
  jobToEdit,
  projectToEdit,
  certToEdit,
  onClose,
  onSaveJob,
  onSaveProject,
  onSaveCert,
  lang,
}) => {
  // Job Form State
  const [jobFirma, setJobFirma] = useState("");
  const [jobStanowisko, setJobStanowisko] = useState("");
  const [jobStart, setJobStart] = useState("");
  const [jobEnd, setJobEnd] = useState("");
  const [jobObowiazki, setJobObowiazki] = useState("");
  const [jobTechs, setJobTechs] = useState("");

  // Project Form State
  const [projNazwa, setProjNazwa] = useState("");
  const [projFirma, setProjFirma] = useState("");
  const [projStart, setProjStart] = useState("");
  const [projEnd, setProjEnd] = useState("");
  const [projOpis, setProjOpis] = useState("");
  const [projTechs, setProjTechs] = useState("");
  const [projUrl, setProjUrl] = useState("");

  // Certificate Form State
  const [certNazwa, setCertNazwa] = useState("");
  const [certInstytucja, setCertInstytucja] = useState("");
  const [certData, setCertData] = useState("");
  const [certGodziny, setCertGodziny] = useState("");
  const [certOpis, setCertOpis] = useState("");
  const [certTechs, setCertTechs] = useState("");

  useEffect(() => {
    if (jobToEdit) {
      setJobFirma(jobToEdit.firma);
      setJobStanowisko(Array.isArray(jobToEdit.stanowisko) ? jobToEdit.stanowisko.map(s => translate(s, lang)).join(", ") : translate(jobToEdit.stanowisko, lang));
      setJobStart(jobToEdit.data.start);
      setJobEnd(jobToEdit.data.end || "");
      setJobObowiazki(jobToEdit.obowiazki.map(o => translate(o, lang)).join("\n"));
      setJobTechs(jobToEdit.technologie.join(", "));
    }
  }, [jobToEdit, lang]);

  useEffect(() => {
    if (projectToEdit) {
      setProjNazwa(translate(projectToEdit.nazwa, lang));
      setProjFirma(projectToEdit.firma.join(", "));
      setProjStart(projectToEdit.data.start);
      setProjEnd(projectToEdit.data.end || "");
      setProjOpis(translate(projectToEdit.opis, lang));
      setProjTechs(projectToEdit.technologie.join(", "));
      setProjUrl(projectToEdit.url || "");
    }
  }, [projectToEdit, lang]);

  useEffect(() => {
    if (certToEdit) {
      setCertNazwa(translate(certToEdit.nazwa, lang));
      setCertInstytucja(certToEdit.instytucja);
      setCertData(certToEdit.data);
      setCertGodziny(certToEdit.czas_trwania_godziny || "");
      setCertOpis(certToEdit.informacje ? translate(certToEdit.informacje, lang) : "");
      setCertTechs(certToEdit.technologie_i_obowiazki ? certToEdit.technologie_i_obowiazki.join(", ") : "");
    }
  }, [certToEdit, lang]);

  if (!jobToEdit && !projectToEdit && !certToEdit) return null;

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

    const updated: Zatrudnienie = {
      ...jobToEdit,
      firma: jobFirma,
      stanowisko: jobStanowisko.split(",").map((s) => s.trim()),
      data: { start: jobStart, end: jobEnd || "obecnie" },
      obowiazki: jobObowiazki.split("\n").map((o) => o.trim()).filter((o) => o.length > 0),
      technologie: jobTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
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

    const updated: Projekt = {
      ...projectToEdit,
      nazwa: projNazwa,
      firma: projFirma.split(",").map((f) => f.trim()),
      data: { start: projStart, end: projEnd },
      opis: projOpis,
      technologie: projTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
      url: projUrl || undefined,
    };
    onSaveProject(updated);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certToEdit) return;

    const updated: Certyfikat = {
      ...certToEdit,
      nazwa: certNazwa,
      instytucja: certInstytucja,
      data: certData,
      czas_trwania_godziny: certGodziny || undefined,
      informacje: certOpis || undefined,
      technologie_i_obowiazki: certTechs.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
    };
    onSaveCert(updated);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Firma / Pracodawca" : "Company / Employer"}</label>
                <input
                  type="text"
                  value={jobFirma}
                  onChange={(e) => setJobFirma(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Stanowisko (rozdzielaj przecinkami)" : "Position (separate with commas)"}</label>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Technologie (rozdzielaj przecinkami)" : "Technologies (separate with commas)"}
                </label>
                <input
                  type="text"
                  value={jobTechs}
                  onChange={(e) => setJobTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Obowiązki (każdy w nowej linii)" : "Duties (each in a new line)"}</label>
                <textarea
                  value={jobObowiazki}
                  onChange={(e) => setJobObowiazki(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Nazwa Projektu" : "Project Name"}</label>
                <input
                  type="text"
                  value={projNazwa}
                  onChange={(e) => setProjNazwa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Firmy / Freelancerzy (przecinek)" : "Companies / Freelancers (comma)"}</label>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "URL projektu (opcjonalny)" : "Project URL (optional)"}</label>
                <input
                  type="url"
                  value={projUrl}
                  onChange={(e) => setProjUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Technologie (rozdzielaj przecinkami)" : "Technologies (separate with commas)"}
                </label>
                <input
                  type="text"
                  value={projTechs}
                  onChange={(e) => setProjTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Opis projektu" : "Project description"}</label>
                <textarea
                  value={projOpis}
                  onChange={(e) => setProjOpis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={4}
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Nazwa Szkolenia / Certyfikatu" : "Course / Certificate Name"}</label>
                <input
                  type="text"
                  value={certNazwa}
                  onChange={(e) => setCertNazwa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Instytucja certyfikująca" : "Certifying institution"}</label>
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
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
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {lang === "pl" ? "Powiązane tagi / technologie (przecinek)" : "Linked tags / technologies (comma)"}
                </label>
                <input
                  type="text"
                  value={certTechs}
                  onChange={(e) => setCertTechs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{lang === "pl" ? "Dodatkowe informacje" : "Additional information"}</label>
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
        </div>
      </div>
    </div>
  );
};
