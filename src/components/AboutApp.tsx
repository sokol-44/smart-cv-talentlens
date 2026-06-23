import React from "react";
import { Info, HelpCircle, Layers, Cpu, CheckCircle2, Lock, User, Terminal } from "lucide-react";
import { motion } from "motion/react";

interface AboutAppProps {
  lang: "pl" | "en";
}

export const AboutApp: React.FC<AboutAppProps> = ({ lang }) => {
  const content = {
    pl: {
      title: "O Aplikacji",
      subtitle: "Interaktywne CV i System Dopasowania Kandydata",
      purposeTitle: "Cel utworzenia",
      purposeText: "Aplikacja została stworzona w celu prezentacji kwalifikacji, bogatego doświadczenia zawodowego, dorobku projektowego oraz certyfikatów Michała Sokołowskiego w nowoczesnej, interaktywnej i wielojęzycznej formie. System został zoptymalizowany dla rekruterów i menedżerów technicznych, umożliwiając szybkie dopasowanie profilu kandydata do specyfiki konkretnych ról projektowych (DevOps, Senior Backend, Fullstack, AI Integrator).",
      creationTitle: "Sposób utworzenia i architektura",
      creationText: "Aplikacja została zbudowana jako nowoczesna aplikacja jednostronicowa (SPA) oparta na bibliotece React z szybkim systemem budowania Vite i pełnym typowaniem TypeScript. Stylizacja została oparta na nowoczesnym podejściu Tailwind CSS, zapewniając pełną responsywność i lekki interfejs. Wszystkie dane CV są wczytywane z lokalnego pliku JSON i synchronizowane w czasie rzeczywistym z lokalną bazą danych przeglądarki (Local Storage), co gwarantuje pełną prywatność i natychmiastowe działanie bez konieczności rejestracji.",
      techTitle: "Użyte technologie i wersje",
      featuresTitle: "Zaimplementowane funkcjonalności",
      manualTitle: "Krótka instrukcja obsługi",
      userManualTitle: "Dla Użytkownika / Rekrutera",
      userManualText: "Użyj selektora języków w nagłówku, aby przełączać interfejs i dane między językiem polskim (PL) a angielskim (EN). Przeglądaj zakładki, aby zobaczyć historię zatrudnienia, projekty, certyfikaty i słownik technologii. W sekcji 'Dopasowanie & Rekrutacja' wybierz jeden z gotowych profili ról lub zdefiniuj własne wymagania (tagi), aby zobaczyć automatyczny wskaźnik dopasowania kandydata wraz z uzasadnieniem.",
      adminManualTitle: "Dla Administratora (Tryb Edycji)",
      adminManualText: "Aby wejść w tryb administracyjny, kliknij ikonkę zębatki (⚙️) w stopce strony i podaj hasło autoryzacyjne. Po zalogowaniu uzyskasz dostęp do: edycji danych kandydata inline, zapisywania dwujęzycznych notatek rekrutera (osobno dla języka polskiego i angielskiego), edycji pozazawodowych pasji Michała oraz pełnego panelu administracyjnego bazy danych (eksport i import plików JSON). Konfiguracja hasła znajduje się w kodzie aplikacji.",
      pwdLocationNote: "Wskazówka bezpieczeństwa: hasło autoryzacyjne jest zdefiniowane bezpośrednio w kodzie (/src/App.tsx oraz /src/components/LocalDbAdmin.tsx). Domyślne hasła to 'admin' lub 'm_sokolowski'.",
      features: [
        "Dynamiczne i dwujęzyczne (PL/EN) filtrowanie oraz wyszukiwanie we wszystkich widokach CV.",
        "System 'Dopasowanie Kandydata do Roli' bazujący na analizie tagów i stopnia dopasowania z wizualnymi wykresami.",
        "Filtrowanie certyfikatów i szkoleń po latach oraz wyszukiwanie technologii w słowniku wraz z synonimami.",
        "Możliwość dodawania dwujęzycznych notatek i komentarzy rekrutacyjnych do każdego stanowiska, projektu i szkolenia.",
        "Możliwość oznaczania interesujących elementów 'zakładkami' w celu ich szybkiego podsumowania.",
        "Kompletny panel zarządzania lokalną bazą danych z funkcjami pobierania (eksportu) i wgrywania (importu) całego CV jako pliku JSON.",
        "Możliwość edycji opisów osobistych oraz pozazawodowych pasji wprost z poziomu panelu Admina."
      ]
    },
    en: {
      title: "About Application",
      subtitle: "Interactive CV & Candidate Role Matching System",
      purposeTitle: "Purpose of Creation",
      purposeText: "This application was built to showcase the qualifications, extensive professional experience, completed projects, and certifications of Michał Sokołowski in a modern, interactive, and bilingual format. The system is tailored for recruiters and engineering managers, allowing rapid matching of the candidate's profile against the requirements of specific project roles (DevOps, Senior Backend, Fullstack, AI Integrator).",
      creationTitle: "Creation Method & Architecture",
      creationText: "The application was developed as a modern Single Page Application (SPA) utilizing React, Vite, and TypeScript. Styling is powered by Tailwind CSS for a highly responsive, performant, and elegant user experience. All CV data is loaded from a local JSON file and synchronized in real-time with the browser's Local Storage, securing user privacy and ensuring instant responsiveness with zero login requirements.",
      techTitle: "Technologies Used & Versions",
      featuresTitle: "Implemented Features",
      manualTitle: "User & Admin Guide",
      userManualTitle: "For the User / Recruiter",
      userManualText: "Use the language toggle in the header to switch both the UI and CV content between Polish (PL) and English (EN). Navigate through tabs to browse work history, projects, certifications, and the technology dictionary. In the 'Matching & Recruitment' section, select a pre-defined role profile or customize required tags to see an instant suitability score with full technical justification.",
      adminManualTitle: "For the Administrator (Edit Mode)",
      adminManualText: "To enter administration/edit mode, click the gear (⚙️) icon in the footer and provide the authorization password. Once authenticated, you can: edit candidate data inline, save bilingual recruiter comments (separately for Polish and English), edit Michał's non-professional passions, and access the full JSON import/export suite. Password settings are configured in the codebase.",
      pwdLocationNote: "Security note: The authorization password is defined directly in the source code (/src/App.tsx and /src/components/LocalDbAdmin.tsx). Default passwords are 'admin' or 'm_sokolowski'.",
      features: [
        "Dynamic, bilingual (PL/EN) filtering and full-text search across all CV modules.",
        "Recruiter Match system with instant suitability scoring and visual charts based on selected tags.",
        "Filter certifications by year and search technologies in the dictionary, including recognized synonyms.",
        "Interactive recruiter notes and feedback comments editable inline for any job, project, or training.",
        "Bookmark system to keep track of key accomplishments during candidate evaluation.",
        "Comprehensive local database administrator panel with export and import features via local JSON files.",
        "Inline editing of personal descriptions and hobby passions directly from the authenticated interface."
      ]
    }
  };

  const t = lang === "pl" ? content.pl : content.en;

  const techStack = [
    { name: "React", version: "^18.3.1", desc: lang === "pl" ? "Główna biblioteka UI" : "Core UI Library" },
    { name: "Vite", version: "^5.4.1", desc: lang === "pl" ? "Szybkie środowisko budowania" : "Modern frontend build tool" },
    { name: "TypeScript", version: "^5.5.3", desc: lang === "pl" ? "Statyczne typowanie" : "Statically typed JavaScript" },
    { name: "Tailwind CSS", version: "^4.0.0", desc: lang === "pl" ? "Responsywny silnik stylów" : "Responsive utility-first styling" },
    { name: "Motion (Framer)", version: "^11.5.4", desc: lang === "pl" ? "Płynne animacje przejść" : "Fluid visual transitions" },
    { name: "Lucide React", version: "^0.439.0", desc: lang === "pl" ? "Wektorowy pakiet ikon" : "Vector icon pack" },
    { name: "Recharts", version: "^2.12.7", desc: lang === "pl" ? "Wykresy i wizualizacja statystyk" : "Recruiter charts & statistics" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="about-app-container"
    >
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Terminal className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-mono text-indigo-300">
            <Info className="w-3.5 h-3.5" />
            Vibe Coding Showcase
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Purpose & creation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Purpose */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <HelpCircle className="w-5 h-5" />
              </span>
              {t.purposeTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{t.purposeText}</p>
          </div>

          {/* Card 2: Creation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <Layers className="w-5 h-5" />
              </span>
              {t.creationTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{t.creationText}</p>
          </div>

          {/* Card 3: Implemented features list */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              {t.featuresTitle}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {t.features.map((feat, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="text-indigo-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Tech stack & manuals */}
        <div className="space-y-6">
          {/* Tech Stack List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              {t.techTitle}
            </h3>
            <div className="space-y-3 font-mono text-[11px]">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex justify-between items-start border-b border-slate-50 pb-2">
                  <div>
                    <span className="font-bold text-slate-800 text-xs font-sans block">{tech.name}</span>
                    <span className="text-slate-400 font-sans block mt-0.5">{tech.desc}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/50">
                    {tech.version}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guide / Manual Card */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 space-y-4">
            <h3 className="text-md font-bold text-indigo-950 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              {t.manualTitle}
            </h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="space-y-1">
                <h4 className="font-bold text-indigo-900 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  {t.userManualTitle}
                </h4>
                <p className="leading-relaxed">{t.userManualText}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-indigo-900 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-indigo-500" />
                  {t.adminManualTitle}
                </h4>
                <p className="leading-relaxed">{t.adminManualText}</p>
              </div>

              <div className="pt-2 border-t border-indigo-200/50 text-[10px] text-indigo-800 bg-indigo-50 p-2.5 rounded-lg">
                <p className="font-semibold">{t.pwdLocationNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
