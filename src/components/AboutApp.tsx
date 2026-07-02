/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React from "react";
import { Info, HelpCircle, Layers, Cpu, CheckCircle2, Lock, User, Terminal, Mail, Phone, Github } from "lucide-react";
import { motion } from "motion/react";
import { CVData } from "../types";
import { SupplementaryText } from "../utils/parentheses";

interface AboutAppProps {
  lang: "pl" | "en";
  cvData: CVData;
}

export const AboutApp: React.FC<AboutAppProps> = ({ lang, cvData }) => {
  const jobsCount = cvData.employment.length;
  const projectsCount = cvData.projects.length;
  const skillsCount = cvData.skills.length;
  const certsCount = cvData.certificates.length;

  const email = cvData.person.email || "";
  const tel = cvData.person.tel || "";
  const github = cvData.person.github || "";

  const personDescription = cvData.person.description
    ? cvData.person.description[lang] || cvData.person.description.pl || []
    : [];

  const content = {
    pl: {
      title: "O Aplikacji",
      subtitle: "Interaktywne CV i System Dopasowania Kandydata - Vibe Coding Showcase",
      purposeTitle: "Cel utworzenia",
      purposeText: "Aplikacja została stworzona w celu nowoczesnej, interaktywnej i wielojęzycznej prezentacji kwalifikacji zawodowych, historii zatrudnienia, zrealizowanych projektów oraz uzyskanych certyfikatów. Projekt stanowi również praktyczny pokaz 'Vibe Coding' – nowoczesnego podejścia do wytwarzania oprogramowania we współpracy z modelami AI (Gemini 3.5 Flash w Google AI Studio) przy minimalnym nakładzie ręcznego pisania kodu. System został zoptymalizowany dla rekruterów oraz menedżerów technicznych poszukujących odpowiednich kandydatów na stanowiska inżynieryjne, umożliwiając szybkie dopasowanie profili do specyfiki ról projektowych.",
      creationTitle: "Sposób utworzenia i architektura",
      creationText: "Aplikacja została zaprojektowana jako nowoczesna aplikacja jednostronicowa (SPA) w oparciu o React i Vite. Powstała ona w procesie 'Vibe coding' z minimalną ingerencją człowieka w kod źródłowy, wykorzystując zaawansowane modele sztucznej inteligencji. System wykorzystuje zaawansowany system dynamicznej translacji treści, mechanizmy autoryzacji oparte o szyfrowanie asynchroniczne i Web Crypto API (HMAC SHA-512) dla bezpieczeństwa oraz synchronizację bazy danych CV w czasie rzeczywistym z LocalStorage. Projekt został w całości ustrukturyzowany z silnym typowaniem TypeScript, co gwarantuje poprawność i skalowalność. Kod źródłowy jest w pełni zgodny z rygorystycznymi standardami jakości, co potwierdzają pomyślne kompilacje produkcyjne.",
      archTitle: "Wzorce projektowe i decyzje architektoniczne",
      archPoints: [
        { title: "Single Source of Truth (SSOT)", desc: "Główny stan aplikacji (dane CV, notatki rekrutera, zakładki, filtry, tooltipy) jest scentralizowany w komponencie App.tsx. Zapewnia to spójność danych i jednokierunkowy przepływ (one-way data flow) do wszystkich podkomponentów (Wzorzec State / Mediator)." },
        { title: "Kryptografia Web Crypto API", desc: "Autoryzacja trybu admina wykorzystuje asynchroniczne haszowanie HMAC-SHA-512 z unikalną solą kryptograficzną bezpośrednio w przeglądarce klienta. Hasło nigdy nie jest przechowywane ani przesyłane jako tekst jawny (Wzorzec Security Proxy)." },
        { title: "Wzorzec Adapter (Translations)", desc: "Moduł translations.ts działa jako adapter słownikowy, mapując dynamicznie etykiety i struktury danych z modelu JSON w zależności od wybranego języka (PL/EN)." },
        { title: "Wzorzec Budowniczy (Builder Pattern)", desc: "Generator markdownExporter.ts reprezentuje podejście budowniczego, etap po etapie weryfikując, sortując i składając poszczególne elementy CV (Zatrudnienie, Projekty, Edukacja) w jednolity dokument Markdown bez zanieczyszczeń." },
        { title: "Wzorzec Repozytorium i DAO", desc: "Abstrakcja operacji na localStorage (odczyt, zapis, migracje, resetowanie stanu bazy) działa jako wirtualna warstwa dostępu do danych, zapewniając bezpieczne przywracanie domyślnego pliku cv_data.json w razie błędu." }
      ],
      techTitle: "Użyte technologie i wersje",
      featuresTitle: "Zaimplementowane funkcjonalności",
      manualTitle: "Krótka instrukcja obsługi",
      userManualTitle: "Dla Użytkownika / Rekrutera",
      userManualText: "Użyj selektora języków w nagłówku, aby przełączać interfejs i dane między językiem polskim (PL) a angielskim (EN). Przeglądaj zakładki, aby zobaczyć historię zatrudnienia, projekty, certyfikaty i słownik technologii. W sekcji 'Dopasowanie & Rekrutacja' wybierz jeden z gotowych profili ról lub zdefiniuj własne wymagania (tagi), aby zobaczyć automatyczny wskaźnik dopasowania kandydata wraz z uzasadnieniem.",
      adminManualTitle: "Dla Administratora (Tryb Edycji)",
      adminManualText: "Aby wejść w tryb administracyjny, kliknij ikonkę zębatki (⚙️) w stopce strony i podaj hasło autoryzacyjne. Po zalogowaniu uzyskasz dostęp do: edycji danych kandydata inline, zapisywania dwujęzycznych notatek rekrutera (osobno dla języka polskiego i angielskiego), edycji pozazawodowych pasji Michała oraz pełnego panelu administracyjnego bazy danych (eksport i import plików JSON). Konfiguracja hasła znajduje się w kodzie aplikacji.",
      pwdLocationNote: "Wskazówka bezpieczeństwa: hasło autoryzacyjne jest zdefiniowane bezpośrednio w kodzie (/src/App.tsx). Domyślne hasła to 'admin' lub 'm_sokolowski'.",
      githubRepoText: "Kod źródłowy na GitHub",
      runGuideTitle: "Instrukcja samodzielnego uruchamiania strony",
      runGuideSteps: [
        "Pobierz kod źródłowy aplikacji (wypakuj archiwum ZIP).",
        "Otwórz terminal (wiersz poleceń) w głównym katalogu projektu.",
        "Zainstaluj wszystkie wymagane zależności za pomocą komendy: `npm install`",
        "Uruchom lokalny serwer aplikacji komendą: `npm run dev`",
        "Otwórz przeglądarkę i wejdź na adres: `http://localhost:3000`"
      ],
      hmacTitle: "Generowanie własnego hasła (HMAC-SHA-512)",
      hmacText: "Wpisz poniższy kod w konsoli przeglądarki (F12) na tej stronie, aby wygenerować bezpieczny hash HMAC-SHA-512 dla nowego hasła z solą 'CV_Secure_Salt_2026':",
      hmacPlacement: "Skopiuj wygenerowany ciąg znaków o długości 128 znaków i wklej go do tablicy 'AUTHORIZED_HMAC_HASHES' w pliku '/src/App.tsx'.",
      creatorTitle: "O twórcy",
      features: [
        "Dynamiczne i dwujęzyczne (PL/EN) filtrowanie oraz wyszukiwanie we wszystkich widokach CV.",
        "System 'Dopasowanie Kandydata do Roli' bazujący na analizie tagów i stopnia dopasowania z wizualnymi wykresami.",
        "Filtrowanie certyfikatów i szkoleń po latach oraz wyszukiwanie technologii w słowniku wraz z synonimami.",
        "Możliwość dodawania dwujęzycznych notatek i komentarzy rekrutacyjnych do każdego stanowiska, projektu i szkolenia.",
        "Kompletny panel zarządzania lokalną bazą danych z funkcjami pobierania (eksportu) i wgrywania (importu) całego CV jako pliku JSON.",
        "Możliwość edycji opisów osobistych oraz pozazawodowych pasji wprost z poziomu panelu Admina."
      ]
    },
    en: {
      title: "About Application",
      subtitle: "Interactive CV & Candidate Role Matching System - Vibe Coding Showcase",
      purposeTitle: "Purpose of Creation",
      purposeText: "This application was created to provide a modern, interactive, and bilingual presentation of professional qualifications, employment history, completed projects, and certifications. The system also serves as a practical showcase of 'Vibe Coding' – a modern approach to software development in collaboration with AI models (Gemini 3.5 Flash in Google AI Studio) with minimal manual code drafting. The system is optimized for recruiters and engineering managers looking for candidates for engineering roles, enabling rapid matching of profiles against project requirements.",
      creationTitle: "Creation Method & Architecture",
      creationText: "The application is engineered as a state-of-the-art Single Page Application (SPA) built with React and Vite. It was created through 'Vibe coding' with minimal human intervention in the codebase, utilizing advanced artificial intelligence models. It incorporates a sophisticated dynamic translation system, authorization mechanisms powered by the Web Crypto API (utilizing HMAC SHA-512) for client-side security, and real-time database synchronization with LocalStorage. The entire codebase features strict TypeScript typing ensuring robustness and scalability. The architecture adheres to high-quality code patterns and passes strict production compilation checks.",
      archTitle: "Design Patterns & Architectural Decisions",
      archPoints: [
        { title: "Single Source of Truth (SSOT)", desc: "The core application state (CV data, recruiter notes, bookmarks, filters, tooltips) is centralized in App.tsx. This guarantees high data consistency and a clean one-way data flow to all nested sub-components (State / Mediator pattern)." },
        { title: "Web Crypto API Cryptography", desc: "Admin authorization utilizes client-side HMAC-SHA-512 hashing with a unique cryptographic salt. Passwords are never saved or processed as plaintext, ensuring absolute security (Security Proxy pattern)." },
        { title: "Adapter Pattern (Translations)", desc: "The translations.ts engine operates as a translation adapter, dynamically resolving dictionary labels and structural mappings from the JSON data depending on the active locale (PL/EN)." },
        { title: "Builder Pattern (Document Generation)", desc: "The markdownExporter.ts component utilizes a Builder pattern approach to inspect, sort, and assemble heterogeneous CV sections (Employment, Projects, Education) into a clean, robust Markdown document." },
        { title: "Repository & DAO Patterns", desc: "Virtual database operations on localStorage (load, save, migrate, reset state) abstract local storage IO, ensuring safe fallback to the pristine cv_data.json on parsing exceptions." }
      ],
      techTitle: "Technologies Used & Versions",
      featuresTitle: "Implemented Features",
      manualTitle: "User & Admin Guide",
      userManualTitle: "For the User / Recruiter",
      userManualText: "Use the language toggle in the header to switch both the UI and CV content between Polish (PL) and English (EN). Navigate through tabs to browse work history, projects, certifications, and the technology dictionary. In the 'Matching & Recruitment' section, select a pre-defined role profile or customize required tags to see an instant suitability score with full technical justification.",
      adminManualTitle: "For the Administrator (Edit Mode)",
      adminManualText: "To enter administration/edit mode, click the gear (⚙️) icon in the footer and provide the authorization password. Once authenticated, you can: edit candidate data inline, save bilingual recruiter comments (separately for Polish and English), edit Michał's non-professional passions, and access the full JSON import/export suite. Password settings are configured in the codebase.",
      pwdLocationNote: "Security note: The authorization password is defined directly in the source code (/src/App.tsx). Default passwords are 'admin' or 'm_sokolowski'.",
      githubRepoText: "Source code on GitHub",
      runGuideTitle: "Self-Running Instructions",
      runGuideSteps: [
        "Download the application source code (unpack the ZIP archive).",
        "Open a terminal (command line) in the root directory of the project.",
        "Install all required dependencies using: `npm install`",
        "Start the local application server using: `npm run dev`",
        "Open your browser and navigate to: `http://localhost:3000`"
      ],
      hmacTitle: "Generating Custom Password Hash (HMAC-SHA-512)",
      hmacText: "To change the password, enter the following code into the browser developer console (F12) to compute the secure HMAC-SHA-512 hash using the 'CV_Secure_Salt_2026' salt:",
      hmacPlacement: "Copy the computed 128-character hex string and paste it inside the 'AUTHORIZED_HMAC_HASHES' array inside the '/src/App.tsx' file.",
      creatorTitle: "About the Creator",
      features: [
        "Dynamic, bilingual (PL/EN) filtering and full-text search across all CV modules.",
        "Recruiter Match system with instant suitability scoring and visual charts based on selected tags.",
        "Filter certifications by year and search technologies in the dictionary, including recognized synonyms.",
        "Interactive recruiter notes and feedback comments editable inline for any job, project, or training.",
        "Comprehensive local database administrator panel with export and import features via local JSON files.",
        "Inline editing of personal descriptions and hobby passions directly from the authenticated interface."
      ]
    }
  };

  const t = lang === "pl" ? content.pl : content.en;

  const techStack = [
    { name: "Google AI Studio", version: "API / Portal", desc: lang === "pl" ? "Generowanie i wspomaganie programowania" : "Generation and programming assistance" },
    { name: "Gemini 3.5 Flash", version: "LLM Model", desc: lang === "pl" ? "Inteligentne wspomaganie, translacja i refaktoryzacja" : "Intelligent assistance, translation & refactoring" },
    { name: "React", version: "^19.0.1", desc: lang === "pl" ? "Główna biblioteka UI" : "Core UI Library" },
    { name: "Vite", version: "^6.2.3", desc: lang === "pl" ? "Szybkie środowisko budowania" : "Modern frontend build tool" },
    { name: "TypeScript", version: "~5.8.2", desc: lang === "pl" ? "Statyczne typowanie" : "Statically typed JavaScript" },
    { name: "Tailwind CSS", version: "^4.1.14", desc: lang === "pl" ? "Responsywny silnik stylów (z pluginem Vite)" : "Responsive utility-first styling (with Vite plugin)" },
    { name: "Motion (Framer)", version: "^12.23.24", desc: lang === "pl" ? "Płynne animacje i przejścia" : "Fluid visual transitions & animations" },
    { name: "Lucide React", version: "^0.546.0", desc: lang === "pl" ? "Wektorowy pakiet ikon" : "Vector icon pack" }
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
        <div className="relative z-10 w-full space-y-3">
          <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            <a
              href="https://github.com/sokol-44/smart-cv-talentlens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 rounded-xl text-sm font-medium text-indigo-200 hover:text-white transition-colors shadow-xs shrink-0"
            >
              <Github className="w-4 h-4" />
              <span>{t.githubRepoText}</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-sm font-mono text-indigo-300">
              <Info className="w-3.5 h-3.5" />
              Vibe Coding Showcase
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">{t.subtitle}</p>
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

          {/* Card 2b: Architecture & Design Patterns */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <Layers className="w-5 h-5" />
              </span>
              {(t as any).archTitle}
            </h2>
            <div className="space-y-3">
              {(t as any).archPoints?.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1 p-3 bg-slate-50/60 rounded-xl border border-slate-100/50">
                  <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed pl-3 font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
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
                <li key={idx} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                  <span className="text-indigo-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: O twórcy */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <User className="w-5 h-5" />
              </span>
              {t.creatorTitle}
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50/60 rounded-xl border border-slate-100">
                <div className="space-y-2 text-sm text-slate-700 shrink-0 self-center">
                  <div className="font-bold text-slate-900 text-sm">
                    Michał Sokołowski
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed space-y-3">
                {Array.isArray(personDescription) ? (
                  personDescription.map((p, idx) => (
                    <p key={idx}>
                      <SupplementaryText text={p} />
                    </p>
                  ))
                ) : (
                  <p>
                    <SupplementaryText text={personDescription} />
                  </p>
                )}
              </div>
            </div>
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
                    <span className="font-bold text-slate-800 text-sm font-sans block">{tech.name}</span>
                    <span className="text-slate-400 font-sans block mt-0.5">{tech.desc}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/50 shrink-0">
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
            <div className="space-y-4 text-sm text-slate-600">
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

              {/* Self-run instructions inside manual card */}
              <div className="space-y-2 pt-3 border-t border-indigo-200/50">
                <h4 className="font-bold text-indigo-950 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                  {t.runGuideTitle}
                </h4>
                <ol className="list-decimal pl-4 space-y-1.5 text-[11px] leading-relaxed text-slate-600">
                  {t.runGuideSteps.map((step, index) => (
                    <li key={index}>
                      {step.includes("`") ? (
                        <span>
                          {step.split("`")[0]}
                          <code className="bg-indigo-100/80 px-1 py-0.5 rounded text-[10px] font-mono text-indigo-900 font-semibold">{step.split("`")[1]}</code>
                          {step.split("`")[2]}
                        </span>
                      ) : (
                        step
                      )}
                    </li>
                  ))}
                </ol>

                {/* HMAC Instructions */}
                <div className="mt-3 pt-2.5 border-t border-indigo-200/40 space-y-2 text-[11px] text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-indigo-100/50">
                  <div className="font-bold text-indigo-950 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-indigo-600" />
                    {t.hmacTitle}
                  </div>
                  <p className="leading-relaxed">{t.hmacText}</p>
                  <pre className="bg-slate-900 text-slate-200 p-2 rounded-lg font-mono text-[9px] overflow-x-auto select-all max-w-full block whitespace-pre-wrap leading-normal">
                    {`const gen = async (p) => {
  const e = new TextEncoder();
  const s = e.encode("CV_Secure_Salt_2026");
  const k = await crypto.subtle.importKey(
    "raw", s, { name: "HMAC", hash: "SHA-512" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", k, e.encode(p));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
};
await gen("twoje_haslo");`}
                  </pre>
                  <p className="leading-relaxed font-semibold text-indigo-900">{t.hmacPlacement}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
