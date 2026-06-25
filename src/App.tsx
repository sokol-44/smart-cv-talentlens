/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import { useState, useEffect, useMemo } from "react";
import { CVData, Employment, Project, Certificate, Education, LocalBookmarks, LocalNotes } from "./types";

import { Header } from "./components/Header";
import { TechDictionary } from "./components/TechDictionary";
import { EmploymentList } from "./components/EmploymentList";
import { ProjectsList } from "./components/ProjectsList";
import { CertificatesList } from "./components/CertificatesList";
import { EducationAndHobbies } from "./components/EducationAndHobbies";
import { RecruiterMatch } from "./components/RecruiterMatch";
import { LocalDbAdmin } from "./components/LocalDbAdmin";
import { EditModals } from "./components/EditModals";
import { AboutApp } from "./components/AboutApp";

import {
  UserCheck,
  Briefcase,
  FolderGit2,
  Award,
  Tag,
  Database,
  CheckCircle,
  Info,
  Settings,
  Globe,
} from "lucide-react";

import { initialCVData } from "./initialData";

// Design Decision: Storage keys are normalized to remove user identifiers and protect confidentiality.
// Design Pattern: Client-side Key-Value Registry/Repository pattern for localStorage names.
const STORAGE_KEY = "cv_interactive_db";
const NOTES_KEY = "cv_interactive_notes";
const BOOKMARKS_KEY = "cv_interactive_bookmarks";
const MODIFIED_KEY = "cv_interactive_modified";
const LANG_KEY = "cv_interactive_lang";
const TOOLTIPS_KEY = "cv_interactive_tooltips";

// Design Decision: To comply with secure authentication requirements, we store only HMAC-SHA-512 hashes
// instead of plain text credentials. Salt: "CV_Secure_Salt_2026".
// "admin" -> 2dc63462621dcc9137ec79ca432f43ed2412cd91861bef3e3320927edd467ee46bebfb101a724089e6a91a40ebfacb3cef3a03da4c7573b26c4e9019c4faa608
// "sokolowski" -> 4f751a439c9d56e299a6ffd7bc80378b04b397861c0474a02d7bc37d3de8beb01b13e738cc51b6911cacc1d79e2819e555994e52441ee8ea3fb2b68c6621aa5b
export const AUTHORIZED_HMAC_HASHES = [
  "2dc63462621dcc9137ec79ca432f43ed2412cd91861bef3e3320927edd467ee46bebfb101a724089e6a91a40ebfacb3cef3a03da4c7573b26c4e9019c4faa608",
  "4f751a439c9d56e299a6ffd7bc80378b04b397861c0474a02d7bc37d3de8beb01b13e738cc51b6911cacc1d79e2819e555994e52441ee8ea3fb2b68c6621aa5b"
];

/**
 * Verifies if the provided password matches any authorized HMAC-SHA-512 hashes.
 * This function uses the browser's native Web Crypto API for secure hashing.
 * Design Pattern: Strategy/Security verification delegate.
 *
 * @param {string} password - The plain text password to verify.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const saltBytes = encoder.encode("CV_Secure_Salt_2026");
    const passwordBytes = encoder.encode(password);

    // Import salt for HMAC signature generation
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      saltBytes,
      { name: "HMAC", hash: { name: "SHA-512" } },
      false,
      ["sign"]
    );

    // Generate HMAC signature of the password
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      passwordBytes
    );

    // Convert cryptographic signature array buffer to a hex string
    const hashArray = Array.from(new Uint8Array(signature));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Verify if computed hash exists in authorized collection
    const isValid = AUTHORIZED_HMAC_HASHES.includes(hashHex);
    return isValid;
  } catch (error) {
    // Explanation: Log cryptographic or environment exceptions without disrupting normal execution.
    console.error("Cryptographic verification failed:", error);
    return false;
  }
}

import { translate } from "./utils/translations";

/**
 * Main application component.
 * Manages the state of CV data, user-added notes, bookmarked entries, active tabs, and modals.
 * Handles persistence to local storage and provides interfaces for CRUD operations on CV sub-entities.
 *
 * @returns {JSX.Element} The rendered React app layout.
 */
export default function App() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [notes, setNotes] = useState<LocalNotes>({});
  const [bookmarks, setBookmarks] = useState<LocalBookmarks>({});
  const [isDbModified, setIsDbModified] = useState(false);
  const [activeTab, setActiveTab] = useState<"match" | "jobs" | "projects" | "certs" | "dictionary" | "about" | "admin">("match");
  const [lang, setLang] = useState<"pl" | "en">(() => {
    try {
      const storedLang = localStorage.getItem(LANG_KEY) as "pl" | "en" | null;
      if (storedLang === "pl" || storedLang === "en") {
        return storedLang;
      }
    } catch (e) {
      console.warn("Could not read language from localStorage:", e);
    }

    try {
      if (typeof navigator !== "undefined" && navigator.languages) {
        const hasPolish = navigator.languages.some(
          (l) => typeof l === "string" && l.toLowerCase().startsWith("pl")
        );
        if (!hasPolish) {
          return "en";
        }
      }
    } catch (e) {
      console.warn("Could not detect browser languages:", e);
    }

    return "pl";
  });
  const [tooltips, setTooltips] = useState<Record<string, string>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [highlightedJobId, setHighlightedJobId] = useState<string | null>(null);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);

  const handleNavigateToJob = (jobId: string) => {
    setActiveTab("jobs");
    setHighlightedJobId(jobId);
    setTimeout(() => {
      const el = document.getElementById(`job-card-${jobId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
    setTimeout(() => {
      setHighlightedJobId(null);
    }, 2500);
  };

  const handleNavigateToProject = (projectId: string) => {
    setActiveTab("projects");
    setHighlightedProjectId(projectId);
    setTimeout(() => {
      const el = document.getElementById(`project-card-${projectId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
    setTimeout(() => {
      setHighlightedProjectId(null);
    }, 2500);
  };

  const handleNavigateToCompany = (companyName: string) => {
    if (!cvData) return;
    const matchedJob = cvData.employment.find(
      (job) => job.company.toLowerCase() === companyName.toLowerCase()
    );
    if (matchedJob) {
      handleNavigateToJob(matchedJob.id);
    }
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Modals state
  const [editingJob, setEditingJob] = useState<Employment | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);

  /**
   * Helper utility to migrate legacy recruiter notes into modern localized translation objects.
   * Design Pattern: Adapter/Data Transformer pattern.
   * Design Decision: Standardizes plain string notes to { pl, en } structures to support multi-language routing seamlessly.
   *
   * @param {string | null} rawNotesStr - Stringified JSON representing recruiter notes.
   * @param {any} [parsedCvDataNotes] - Parsed recruiter notes from the CV dataset directly.
   * @returns {LocalNotes} The updated localized notes representation.
   */
  const migrateNotes = (rawNotesStr: string | null, parsedCvDataNotes?: any): LocalNotes => {
    let result: LocalNotes = {};
    
    /* if block comment: prioritize database-integrated recruiter notes if available */
    if (parsedCvDataNotes && typeof parsedCvDataNotes === "object") {
      Object.keys(parsedCvDataNotes).forEach((k) => {
        const val = parsedCvDataNotes[k];
        if (typeof val === "string") {
          result[k] = { pl: val, en: "" };
        } else if (val && typeof val === "object" && ("pl" in val || "en" in val)) {
          result[k] = val;
        }
      });
      return result;
    }
    
    /* if block comment: fallback to loading raw client-side local notes from localStorage */
    if (rawNotesStr) {
      try {
        const parsed = JSON.parse(rawNotesStr);
        Object.keys(parsed).forEach((k) => {
          const val = parsed[k];
          if (typeof val === "string") {
            result[k] = { pl: val, en: "" };
          } else if (val && typeof val === "object" && ("pl" in val || "en" in val)) {
            result[k] = val;
          }
        });
      } catch (e) {
        // Explanation: Silently catch and log local storage corruption. 
        // We use an empty fallback object to avoid disrupting user experience with high-level application crashes.
        console.warn("Recruiter notes parsing error in migrateNotes:", e);
      }
    }
    return result;
  };

  // Initialize data from local database (localStorage) or local project JSON (1)
  useEffect(() => {
    const storedDb = localStorage.getItem(STORAGE_KEY);
    const storedNotes = localStorage.getItem(NOTES_KEY);
    const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    const storedModified = localStorage.getItem(MODIFIED_KEY);
    const storedLang = localStorage.getItem(LANG_KEY) as "pl" | "en" | null;
    const storedTooltips = localStorage.getItem(TOOLTIPS_KEY);

    /* if block comment: restores user preferred language choice if stored */
    if (storedLang) {
      setLang(storedLang);
    }

    /* if block comment: restores inline annotations and recruiter tooltips */
    if (storedTooltips) {
      try {
        setTooltips(JSON.parse(storedTooltips));
      } catch (e) {
        // Explanation: Ignore JSON parsing error of corrupted local state tooltips and start fresh
        console.warn("Corrupted tooltips local storage reset.");
      }
    }

    /* if block comment: load or fallback database initialization flow */
    if (storedDb) {
      try {
        const parsed = JSON.parse(storedDb);
        // Ensure all required sections are present and are arrays
        if (
          parsed &&
          parsed.person &&
          Array.isArray(parsed.employment) &&
          Array.isArray(parsed.projects) &&
          Array.isArray(parsed.skills) &&
          Array.isArray(parsed.certificates) &&
          Array.isArray(parsed.education) &&
          Array.isArray(parsed.additionalSkillsAndHobbies) &&
          parsed.techDictionaries
        ) {
          // Merge newly added person fields (like portfolio, email, tel, and descriptions)
          const mergedPerson = {
            ...initialCVData.person,
            ...parsed.person,
            title: parsed.person.title || initialCVData.person.title,
            description: {
              pl: parsed.person.description?.pl || initialCVData.person.description.pl,
              en: parsed.person.description?.en || initialCVData.person.description.en
            }
          };

          // Merge newly added education fields (like descriptions)
          const mergedEducation = parsed.education.map((edu: any, index: number) => {
            const initialEdu = initialCVData.education[index] || {};
            return {
              ...initialEdu,
              ...edu
            };
          });

          // Merge newly added projects fields (like descriptions)
          const mergedProjects = parsed.projects.map((proj: any) => {
            const initialProj = initialCVData.projects.find((p) => p.id === proj.id) as any || {};
            const finalDesc = (proj.description && typeof proj.description === "object" && (proj.description.pl || proj.description.en))
              ? proj.description
              : initialProj.description;
            return {
              ...initialProj,
              ...proj,
              description: finalDesc
            };
          });

          // Merge newly added certificates fields (like descriptions)
          const mergedCertificates = parsed.certificates.map((cert: any) => {
            const initialCert = initialCVData.certificates.find((c) => c.id === cert.id) as any || {};
            const finalDesc = (cert.description && typeof cert.description === "object" && (cert.description.pl || cert.description.en))
              ? cert.description
              : initialCert.description;
            return {
              ...initialCert,
              ...cert,
              description: finalDesc
            };
          });

          // Merge newly added employment fields (like descriptions)
          const mergedEmployment = parsed.employment.map((job: any) => {
            const initialJob = initialCVData.employment.find((j) => j.id === job.id) as any || {};
            const finalDesc = (job.description && typeof job.description === "object" && (job.description.pl || job.description.en))
              ? job.description
              : initialJob.description;
            return {
              ...initialJob,
              ...job,
              description: finalDesc
            };
          });

          const mergedParsed = {
            ...initialCVData,
            ...parsed,
            person: mergedPerson,
            education: mergedEducation,
            projects: mergedProjects,
            certificates: mergedCertificates,
            employment: mergedEmployment,
            additionalSkillsAndHobbies: initialCVData.additionalSkillsAndHobbies
          };

          setCvData(mergedParsed);
          setNotes(migrateNotes(storedNotes, parsed.recruiterNotes));
        } else {
          // If incomplete schema is present, reset it with initial data from JSON
          setCvData(initialCVData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCVData));
          setNotes(migrateNotes(null, initialCVData.recruiterNotes));
        }
      } catch (e) {
        // Explanation: Fallback to bundled initialCVData if stored JSON is unparseable or corrupted
        setCvData(initialCVData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCVData));
        setNotes(migrateNotes(null, initialCVData.recruiterNotes));
      }
    } else {
      /* else block comment: no local DB found, initialize from pristine imported data */
      setCvData(initialCVData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCVData));
      setNotes(migrateNotes(null, initialCVData.recruiterNotes));
    }

    /* if block comment: restore bookmarked items for the active recruitment pipeline */
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (e) {
        // Explanation: Silently catch bookmarks parse failure to prevent app load crashes
      }
    }

    /* if block comment: sets the visual indicator of whether local DB has custom overrides */
    if (storedModified) {
      setIsDbModified(storedModified === "true");
    }
  }, []);

  // Toggle language
  const handleToggleLang = (newLang: "pl" | "en") => {
    setLang(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  // Save Tooltip Comment
  const handleSaveTooltip = (key: string, val: string) => {
    const updated = { ...tooltips, [key]: val };
    setTooltips(updated);
    localStorage.setItem(TOOLTIPS_KEY, JSON.stringify(updated));
  };

  // Save updates to localStorage helper
  const updateLocalData = (newCvData: CVData) => {
    setCvData(newCvData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCvData));
    setIsDbModified(true);
    localStorage.setItem(MODIFIED_KEY, "true");
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    const updated = { ...bookmarks, [id]: !bookmarks[id] };
    setBookmarks(updated);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  };

  // Save Recruiter Note
  const handleSaveNote = (id: string, textPl: string, textEn: string) => {
    const updatedNotes = { ...notes, [id]: { pl: textPl, en: textEn } };
    setNotes(updatedNotes);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));

    /* if block comment: propagate recruiter notes change to live CV memory model */
    if (cvData) {
      updateLocalData({
        ...cvData,
        recruiterNotes: updatedNotes,
      });
    }
  };

  // Save passions
  const handleSavePasje = (pl: string, en: string) => {
    /* if block comment: update candidate passions state safely */
    if (cvData) {
      updateLocalData({
        ...cvData,
        person: {
          ...cvData.person,
          passions: { pl, en },
        },
      });
    }
  };

  // Save headline
  const handleSaveHeadline = (pl: string, en: string) => {
    if (cvData) {
      updateLocalData({
        ...cvData,
        person: {
          ...cvData.person,
          title: { pl, en },
        },
      });
    }
  };

  // CRUD Save operations
  const handleSaveJob = (updatedJob: Employment) => {
    if (!cvData) return;
    const updatedJobs = cvData.employment.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    updateLocalData({ ...cvData, employment: updatedJobs });
    setEditingJob(null);
  };

  const handleSaveProject = (updatedProj: Project) => {
    if (!cvData) return;
    const updatedProjs = cvData.projects.map((p) => (p.id === updatedProj.id ? updatedProj : p));
    updateLocalData({ ...cvData, projects: updatedProjs });
    setEditingProject(null);
  };

  const handleSaveCert = (updatedCert: Certificate) => {
    if (!cvData) return;
    const updatedCerts = cvData.certificates.map((c) => (c.id === updatedCert.id ? updatedCert : c));
    updateLocalData({ ...cvData, certificates: updatedCerts });
    setEditingCert(null);
  };

  const handleSaveEducation = (updatedEdu: Education) => {
    if (!cvData || editingEducationIndex === null) return;
    const updatedEdus = cvData.education.map((e, idx) => (idx === editingEducationIndex ? updatedEdu : e));
    updateLocalData({ ...cvData, education: updatedEdus });
    setEditingEducation(null);
    setEditingEducationIndex(null);
  };

  // Reset database using the local project JSON file (1)
  const handleResetDb = () => {
    const confirmMsg = translate("Czy na pewno chcesz przywrócić domyślne CV z pliku JSON? Wszystkie wprowadzone modyfikacje zostaną usunięte.", lang);
    /* if block comment: confirmation dialog check for destructive db resets */
    if (window.confirm(confirmMsg)) {
      setCvData(initialCVData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCVData));
      setNotes({});
      localStorage.setItem(NOTES_KEY, JSON.stringify({}));
      setBookmarks({});
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify({}));
      setTooltips({});
      localStorage.setItem(TOOLTIPS_KEY, JSON.stringify({}));
      setIsDbModified(false);
      localStorage.setItem(MODIFIED_KEY, "false");
    }
  };

  // Import uploaded JSON CV
  const handleImportDb = (newData: CVData) => {
    setCvData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setIsDbModified(true);
    localStorage.setItem(MODIFIED_KEY, "true");
  };

  // Calculate stats for Header dashboard
  const dbStats = useMemo(() => {
    if (!cvData) return { jobsCount: 0, projectsCount: 0, skillsCount: 0, certsCount: 0 };
    return {
      jobsCount: cvData.employment.length,
      projectsCount: cvData.projects.length,
      skillsCount: cvData.skills.length,
      certsCount: cvData.certificates.length,
    };
  }, [cvData]);

  if (!cvData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-mono text-sm text-slate-500">
        Inicjalizacja lokalnej bazy danych...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-8 print:p-0">
        {/* Language selector block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-xs print:hidden gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 block">
                {lang === "pl" ? "Wybierz język prezentacji" : "Select presentation language"}
              </span>
              <span className="text-xs text-slate-400 block font-sans">
                {lang === "pl" ? "Zmień język całego dokumentu CV i narzędzi rekrutacyjnych" : "Change the language of the entire CV document and recruitment tools"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => handleToggleLang("pl")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer text-center ${
                lang === "pl"
                  ? "bg-blue-600 text-white shadow-md border border-blue-600"
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200"
              }`}
            >
              Polski (PL)
            </button>
            <button
              onClick={() => handleToggleLang("en")}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer text-center ${
                lang === "en"
                  ? "bg-blue-600 text-white shadow-md border border-blue-600"
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200"
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>

        {/* Dynamic header and summary statistics card */}
        <Header
          person={cvData.person}
          stats={dbStats}
          onResetDb={handleResetDb}
          isDbModified={isDbModified}
          lang={lang}
          employment={cvData.employment}
          projects={cvData.projects}
          certificates={cvData.certificates}
          skills={cvData.skills}
          onToggleLang={handleToggleLang}
          isAdmin={isAdmin}
          onSaveHeadline={handleSaveHeadline}
        />

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 py-1 scrollbar-none print:hidden">
          <button
            onClick={() => setActiveTab("match")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "match"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{translate("Dopasowanie & Rekrutacja", lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "jobs"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{translate("Zatrudnienie", lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "projects"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>{translate("Projekty", lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab("certs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "certs"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{translate("Szkolenia & Edukacja", lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab("dictionary")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "dictionary"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{translate("Słownik Technologii", lang)}</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer shrink-0 ${
              activeTab === "about"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>{translate("O aplikacji", lang)}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <main className="space-y-8 min-h-[400px]">
          {activeTab === "match" && (
            <section className="print:block space-y-8 animate-fade-in">
              <RecruiterMatch cvData={cvData} lang={lang} />
              {/* Also display bookmarks summary here for the recruiter */}
              {Object.keys(bookmarks).some((k) => bookmarks[k]) && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 print:block">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                    {translate("Wybrane i zapisane sekcje (Zakładki rekrutacyjne)", lang)}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {translate("Poniższe elementy zostały zaznaczone jako istotne podczas analizy CV:", lang)}
                  </p>
                  <div className="space-y-3">
                    {cvData.employment.filter((j) => bookmarks[j.id]).map((j) => (
                      <div key={j.id} className="p-3 bg-white border border-amber-200/50 rounded-xl text-xs flex justify-between items-center">
                        <div>
                          <strong className="text-slate-800">{Array.isArray(j.position) ? j.position.map(s => translate(s, lang)).join(", ") : typeof j.position === "object" ? (lang === "pl" ? j.position.pl : j.position.en) : translate(j.position, lang)}</strong> w <span className="font-semibold text-slate-600">{j.company}</span>
                        </div>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-mono px-2 py-0.5 rounded">{translate("Zatrudnienie", lang)}</span>
                      </div>
                    ))}
                    {cvData.projects.filter((p) => bookmarks[p.id]).map((p) => (
                      <div key={p.id} className="p-3 bg-white border border-amber-200/50 rounded-xl text-xs flex justify-between items-center">
                        <div>
                          {translate("Projekt", lang)} <strong className="text-slate-800">{p.name}</strong>
                        </div>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-mono px-2 py-0.5 rounded">{translate("Projekt", lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === "jobs" && (
            <section className="print:block animate-fade-in">
              <EmploymentList
                jobs={cvData.employment}
                projects={cvData.projects}
                onNavigateToProject={handleNavigateToProject}
                highlightedJobId={highlightedJobId}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                notes={notes}
                onSaveNote={handleSaveNote}
                onEditJob={(job) => setEditingJob(job)}
                lang={lang}
                tooltips={tooltips}
                onSaveTooltip={handleSaveTooltip}
                isAdmin={isAdmin}
              />
            </section>
          )}

          {activeTab === "projects" && (
            <section className="print:block animate-fade-in">
              <ProjectsList
                projects={cvData.projects}
                highlightedProjectId={highlightedProjectId}
                onNavigateToCompany={handleNavigateToCompany}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                notes={notes}
                onSaveNote={handleSaveNote}
                onEditProject={(p) => setEditingProject(p)}
                lang={lang}
                tooltips={tooltips}
                onSaveTooltip={handleSaveTooltip}
                isAdmin={isAdmin}
              />
            </section>
          )}

          {activeTab === "certs" && (
            <section className="print:block space-y-12 animate-fade-in">
              <CertificatesList
                certs={cvData.certificates}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                notes={notes}
                onSaveNote={handleSaveNote}
                onEditCert={(c) => setEditingCert(c)}
                lang={lang}
                isAdmin={isAdmin}
              />
              <hr className="border-slate-200" />
              <EducationAndHobbies
                education={cvData.education}
                hobbies={cvData.additionalSkillsAndHobbies}
                lang={lang}
                pasje={cvData.person.passions}
                isAdmin={isAdmin}
                onSavePasje={handleSavePasje}
                onEditEducation={(edu, index) => {
                  setEditingEducation(edu);
                  setEditingEducationIndex(index);
                }}
                employment={cvData.employment}
              />
            </section>
          )}

          {activeTab === "dictionary" && (
            <section className="print:hidden animate-fade-in">
              <TechDictionary
                dictionary={cvData.techDictionaries}
                cvData={cvData}
                lang={lang}
              />
            </section>
          )}

          {activeTab === "about" && (
            <section className="print:block animate-fade-in">
              <AboutApp lang={lang} cvData={cvData} />
            </section>
          )}

          {activeTab === "admin" && isAdmin && (
            <section className="print:hidden animate-fade-in">
              <LocalDbAdmin
                cvData={cvData}
                onImportDb={handleImportDb}
                onResetDb={handleResetDb}
                isDbModified={isDbModified}
                lang={lang}
                onBackToEdit={() => setActiveTab("match")}
              />
            </section>
          )}
        </main>

        {/* Footer info block */}
        <footer className="pt-8 pb-12 border-t border-slate-200 text-center text-xs text-slate-400 print:hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Michał Sokołowski. {translate("Wszystkie prawa zastrzeżone.", lang)}</p>
          
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200/50 shadow-xs">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="font-semibold text-[10px] tracking-wide">ADMIN MODE</span>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    if (activeTab === "admin") {
                      setActiveTab("match");
                    }
                  }}
                  className="text-indigo-650 hover:text-indigo-800 transition cursor-pointer font-bold text-[10px]"
                >
                  {lang === "pl" ? "Wyloguj" : "Logout"}
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setActiveTab("admin")}
                  className="text-indigo-650 hover:text-indigo-800 font-bold text-[10px] underline cursor-pointer"
                >
                  {translate("Baza danych", lang)}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title="Database Admin Access"
                id="admin-gear-button"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Admin Password Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Settings className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{translate("Logowanie Administratora", lang)}</h3>
                <p className="text-[11px] text-slate-400">{translate("Podaj hasło, aby wejść w tryb edycji.", lang)}</p>
              </div>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const isOk = await verifyAdminPassword(loginPassword);
              /* if block comment: checks if the password verification was successful */
              if (isOk) {
                setIsAdmin(true);
                setShowLoginModal(false);
                setLoginPassword("");
                setLoginError("");
              } else {
                setLoginError(lang === "pl" ? "Niepoprawne hasło!" : "Incorrect password!");
              }
            }} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={translate("Hasło...", lang)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                {loginError && <p className="text-[10px] text-red-500 mt-1 font-semibold">{loginError}</p>}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginPassword("");
                    setLoginError("");
                  }}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:underline cursor-pointer"
                >
                  {translate("Anuluj", lang)}
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                >
                  {translate("Zaloguj", lang)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Modals */}
      <EditModals
        jobToEdit={editingJob}
        projectToEdit={editingProject}
        certToEdit={editingCert}
        educationToEdit={editingEducation}
        onClose={() => {
          setEditingJob(null);
          setEditingProject(null);
          setEditingCert(null);
          setEditingEducation(null);
          setEditingEducationIndex(null);
        }}
        onSaveJob={handleSaveJob}
        onSaveProject={handleSaveProject}
        onSaveCert={handleSaveCert}
        onSaveEducation={handleSaveEducation}
        lang={lang}
      />
    </div>
  );
}
