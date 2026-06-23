/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

import React, { useState } from "react";
import { Info, HelpCircle, Layers, Cpu, CheckCircle2, Lock, User, Terminal, ChevronDown, ChevronUp, MessageSquare, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AboutAppProps {
  lang: "pl" | "en";
}

interface PromptItem {
  id: string;
  titlePl: string;
  titleEn: string;
  descPl: string;
  descEn: string;
}

export const AboutApp: React.FC<AboutAppProps> = ({ lang }) => {
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);

  // List of prompts used in the project, designed to be easily updatable by AI
  const promptList: PromptItem[] = [
    {
      id: "prompt_0",
      titlePl: "Dodanie licencji AGPL v3",
      titleEn: "Adding AGPL v3 license",
      descPl: "Dodaj do projektu plik licencji z pełną treścią licencji AGPL v3. Do wszystkich plików w kodzie dodaj informację w nagłówku zawierającą: autora (Michał Sokołowski), generator (Google AIStudio), użyty model AI/LLM oraz licencję.",
      descEn: "Add a license file with the full content of the AGPL v3 license to the project. Add header comments to all source code files containing: the author (Michał Sokołowski), generator (Google AIStudio), the AI/LLM model used, and the license."
    },
    {
      id: "prompt_1",
      titlePl: "Normalizacja tekstów",
      titleEn: "Text normalization",
      descPl: "Znormalizuj teksty: zmień 'obowiązki i zadania' na 'Obowiązki i zadania', 'notatki dla rekrutera' na 'Notatki dla rekrutera', 'wykorzystane technologie' na 'Wykorzystane technologie', oraz 'zaawansowane' na 'zaawansowany' w polach poziomu umiejętności.",
      descEn: "Normalize texts: change 'obowiązki i zadania' to 'Obowiązki i zadania', 'notatki dla rekrutera' to 'Notatki dla rekrutera', 'wykorzystane technologie' to 'Wykorzystane technologie', and 'zaawansowane' to 'zaawansowany' in skill proficiency level fields."
    },
    {
      id: "prompt_2",
      titlePl: "Tłumaczenie typów i pól danych na angielski",
      titleEn: "Translating data types and fields to English",
      descPl: "Przetłumacz na język angielski nazwy typów, pól i zmiennych w projekcie. Zmień definicje interfejsów w 'types.ts' oraz dostosuj wczytywanie i mapowanie pól w bazie danych.",
      descEn: "Translate the names of types, fields, and variables in the project to English. Update the interface definitions in 'types.ts' and adjust the database loading and field mapping accordingly."
    },
    {
      id: "prompt_3",
      titlePl: "Tłumaczenie i zmiana nazwy komponentu listy zatrudnienia",
      titleEn: "Translating and renaming the employment list component",
      descPl: "Przetłumacz na angielski nazwę komponentu 'ZatrudnienieList.tsx' na 'EmploymentList.tsx', dostosuj jego zmienne wewnętrzne, typy i wykonaj bezpieczną zmianę nazwy pliku oraz powiązanych importów.",
      descEn: "Translate the name of the component 'ZatrudnienieList.tsx' to 'EmploymentList.tsx' to English, update its internal variables, types, and safely rename the file and its associated imports."
    },
    {
      id: "prompt_4",
      titlePl: "Centralizacja konfiguracji hasła administratora",
      titleEn: "Centralizing the admin password configuration",
      descPl: "Przenieś obie definicje hasła autoryzacyjnego do jednego, spójnego miejsca w kodzie, bezpośrednio do '/src/App.tsx' i przekaż je jako właściwość do komponentów podrzędnych.",
      descEn: "Move both authorization password definitions to a single, consistent location in the code, directly to '/src/App.tsx' and pass them down as properties to child components."
    },
    {
      id: "prompt_5",
      titlePl: "Przebudowa i aktualizacja strony O aplikacji",
      titleEn: "Refactoring and updating the About application page",
      descPl: "Zmodyfikuj sekcję 'O aplikacji'. Usuń wzmianki o zakładkach rekrutacyjnych, zmień 'Cel utworzenia' na uniwersalny i ogólny opis bez cech twórcy, uzupełnij technologie o Google AI Studio i model Gemini 3.5 Flash, dodaj sekcję 'O twórcy' oraz sekcję 'Użyte prompty' z instrukcją uruchamiania strony.",
      descEn: "Modify the 'About application' section. Remove mentions of recruiter bookmarks, change 'Purpose of creation' to a general and universal description without the creator's characteristics, add Google AI Studio and Gemini 3.5 Flash to technologies, add an 'About the Creator' section, and add the 'Prompts Used' accordion with self-running instructions."
    },
    {
      id: "prompt_6",
      titlePl: "Szyfrowanie hasła (Web Crypto API)",
      titleEn: "Password Hashing (Web Crypto API)",
      descPl: "Zaimplementuj bezpieczne przechowywanie hasła administratora za pomocą HMAC SHA2-512 i Web Crypto API w pliku 'App.tsx'. Funkcja testująca poprawność hasła ma znajdować się asynchronicznie w 'App.tsx', uniemożliwiając przechowywanie hasła jawnym tekstem.",
      descEn: "Implement secure admin password storage using HMAC SHA2-512 and the Web Crypto API inside 'App.tsx'. The verification function must run asynchronously within 'App.tsx', eliminating plain text password storage in the client bundle."
    },
    {
      id: "prompt_7",
      titlePl: "Normalizacja kluczy localStorage",
      titleEn: "LocalStorage Keys Normalization",
      descPl: "Zmień wartości stałych kluczy localStorage, tak aby nie zawierały ciągu 'm_sokolowski_' w celu usunięcia zbędnych powiązań personalnych z metadanymi technicznymi.",
      descEn: "Change persistent localStorage constants to prevent containing the 'm_sokolowski_' string, isolating technical state metadata from personal identifying prefixes."
    },
    {
      id: "prompt_8",
      titlePl: "Prywatność i bezpieczeństwo bazy cv_data.json",
      titleEn: "Privacy and Security of cv_data.json",
      descPl: "Przenieś plik cv_data.json z katalogu publicznego do prywatnego katalogu źródłowego 'src', aby uniemożliwić jego bezpośrednie pobieranie przez adres URL. Wczytuj dane synchronicznie i offline bezpośrednio z kodu źródłowego.",
      descEn: "Move the cv_data.json file from the public directory to a private 'src' source folder, preventing direct HTTP access via a public URL. Load the initial data synchronously and 100% offline from the bundle."
    },
    {
      id: "prompt_9",
      titlePl: "Usprawnienie kodu i komentarzy",
      titleEn: "Enhancing Code Comments & Catch Blocks",
      descPl: "Dodaj komentarze ułatwiające orientację w długich ciągach kodu (if, else, catch, switch), uzupełnij brakujące opisy w blokach catch, opisz zastosowane wzorce projektowe i powody decyzji architektonicznych oraz przetłumacz nagłówki na język angielski.",
      descEn: "Add structural navigation comments to help orientation inside long code blocks (if, else, catch, switch), document catch blocks with clear rationale comments, explain utilized design patterns, and translate header comments into English."
    }
  ];

  const content = {
    pl: {
      title: "O Aplikacji",
      subtitle: "Interaktywne CV i System Dopasowania Kandydata",
      purposeTitle: "Cel utworzenia",
      purposeText: "Aplikacja została stworzona w celu nowoczesnej, interaktywnej i wielojęzycznej prezentacji kwalifikacji zawodowych, historii zatrudnienia, zrealizowanych projektów oraz uzyskanych certyfikatów. System został zoptymalizowany dla rekruterów oraz menedżerów technicznych poszukujących odpowiednich kandydatów na stanowiska inżynieryjne, umożliwiając szybkie dopasowanie profili do specyfiki ról projektowych.",
      creationTitle: "Sposób utworzenia i architektura",
      creationText: "Aplikacja została zbudowana jako nowoczesna aplikacja jednostronicowa (SPA) oparta na bibliotece React z szybkim systemem budowania Vite i pełnym typowaniem TypeScript. Stylizacja została oparta na nowoczesnym podejściu Tailwind CSS, zapewniając pełną responsywność i lekki interfejs. Wszystkie dane CV są wczytywane z lokalnego pliku JSON i synchronizowane w czasie rzeczywistym z lokalną bazą danych przeglądarki (Local Storage), co gwarantuje pełną prywatność i natychmiastowe działanie bez konieczności rejestracji.",
      techTitle: "Użyte technologie i wersje",
      featuresTitle: "Zaimplementowane funkcjonalności",
      manualTitle: "Krótka instrukcja obsługi",
      userManualTitle: "Dla Użytkownika / Rekrutera",
      userManualText: "Użyj selektora języków w nagłówku, aby przełączać interfejs i dane między językiem polskim (PL) a angielskim (EN). Przeglądaj zakładki, aby zobaczyć historię zatrudnienia, projekty, certyfikaty i słownik technologii. W sekcji 'Dopasowanie & Rekrutacja' wybierz jeden z gotowych profili ról lub zdefiniuj własne wymagania (tagi), aby zobaczyć automatyczny wskaźnik dopasowania kandydata wraz z uzasadnieniem.",
      adminManualTitle: "Dla Administratora (Tryb Edycji)",
      adminManualText: "Aby wejść w tryb administracyjny, kliknij ikonkę zębatki (⚙️) w stopce strony i podaj hasło autoryzacyjne. Po zalogowaniu uzyskasz dostęp do: edycji danych kandydata inline, zapisywania dwujęzycznych notatek rekrutera (osobno dla języka polskiego i angielskiego), edycji pozazawodowych pasji Michała oraz pełnego panelu administracyjnego bazy danych (eksport i import plików JSON). Konfiguracja hasła znajduje się w kodzie aplikacji.",
      pwdLocationNote: "Wskazówka bezpieczeństwa: hasło autoryzacyjne jest zdefiniowane bezpośrednio w kodzie (/src/App.tsx). Domyślne hasła to 'admin' lub 'm_sokolowski'.",
      runGuideTitle: "Instrukcja samodzielnego uruchamiania strony",
      runGuideSteps: [
        "Pobierz kod źródłowy aplikacji (wypakuj archiwum ZIP).",
        "Otwórz terminal (wiersz poleceń) w głównym katalogu projektu.",
        "Zainstaluj wszystkie wymagane zależności za pomocą komendy: `npm install`",
        "Uruchom lokalny serwer aplikacji komendą: `npm run dev`",
        "Otwórz przeglądarkę i wejdź na adres: `http://localhost:3000`"
      ],
      creatorTitle: "O twórcy",
      creatorText: "Autorem oprogramowania jest Michał Sokołowski – doświadczony inżynier oprogramowania, architekt systemów i pasjonat nowych technologii z ponad 20-letnim stażem w branży IT.",
      promptsTitle: "Użyte prompty",
      promptsIntro: "Poniższa lista przedstawia kluczowe prompty i instrukcje, które zostały przekazane do modelu sztucznej inteligencji Gemini 3.5 Flash w portalu Google AI Studio w celu wygenerowania, przetłumaczenia oraz refaktoryzacji niniejszego projektu. System pozwala na szybkie i bezproblemowe rozszerzanie kodu o kolejne elementy poprzez instrukcje języka naturalnego.",
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
      subtitle: "Interactive CV & Candidate Role Matching System",
      purposeTitle: "Purpose of Creation",
      purposeText: "This application was created to provide a modern, interactive, and bilingual presentation of professional qualifications, employment history, completed projects, and certifications. The system is optimized for recruiters and engineering managers looking for candidates for engineering roles, enabling rapid matching of profiles against project requirements.",
      creationTitle: "Creation Method & Architecture",
      creationText: "The application was developed as a modern Single Page Application (SPA) utilizing React, Vite, and TypeScript. Styling is powered by Tailwind CSS for a highly responsive, performant, and elegant user experience. All CV data is loaded from a local JSON file and synchronized in real-time with the browser's Local Storage, securing user privacy and ensuring instant responsiveness with zero login requirements.",
      techTitle: "Technologies Used & Versions",
      featuresTitle: "Implemented Features",
      manualTitle: "User & Admin Guide",
      userManualTitle: "For the User / Recruiter",
      userManualText: "Use the language toggle in the header to switch both the UI and CV content between Polish (PL) and English (EN). Navigate through tabs to browse work history, projects, certifications, and the technology dictionary. In the 'Matching & Recruitment' section, select a pre-defined role profile or customize required tags to see an instant suitability score with full technical justification.",
      adminManualTitle: "For the Administrator (Edit Mode)",
      adminManualText: "To enter administration/edit mode, click the gear (⚙️) icon in the footer and provide the authorization password. Once authenticated, you can: edit candidate data inline, save bilingual recruiter comments (separately for Polish and English), edit Michał's non-professional passions, and access the full JSON import/export suite. Password settings are configured in the codebase.",
      pwdLocationNote: "Security note: The authorization password is defined directly in the source code (/src/App.tsx). Default passwords are 'admin' or 'm_sokolowski'.",
      runGuideTitle: "Self-Running Instructions",
      runGuideSteps: [
        "Download the application source code (unpack the ZIP archive).",
        "Open a terminal (command line) in the root directory of the project.",
        "Install all required dependencies using: `npm install`",
        "Start the local application server using: `npm run dev`",
        "Open your browser and navigate to: `http://localhost:3000`"
      ],
      creatorTitle: "About the Creator",
      creatorText: "The software was created by Michał Sokołowski – an experienced software engineer, systems architect, and technology enthusiast with over 20 years of experience in the IT industry.",
      promptsTitle: "Prompts Used",
      promptsIntro: "The following list shows the key prompts and instructions passed to the Gemini 3.5 Flash artificial intelligence model inside Google AI Studio to generate, translate, and refactor this project. The system allows quick and seamless extension of code with further elements using natural language instructions.",
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
    { name: "React", version: "^18.3.1", desc: lang === "pl" ? "Główna biblioteka UI" : "Core UI Library" },
    { name: "Vite", version: "^5.4.1", desc: lang === "pl" ? "Szybkie środowisko budowania" : "Modern frontend build tool" },
    { name: "TypeScript", version: "^5.5.3", desc: lang === "pl" ? "Statyczne typowanie" : "Statically typed JavaScript" },
    { name: "Tailwind CSS", version: "^4.0.0", desc: lang === "pl" ? "Responsywny silnik stylów" : "Responsive utility-first styling" },
    { name: "Motion (Framer)", version: "^11.5.4", desc: lang === "pl" ? "Płynne animacje przejść" : "Fluid visual transitions" },
    { name: "Lucide React", version: "^0.439.0", desc: lang === "pl" ? "Wektorowy pakiet ikon" : "Vector icon pack" },
    { name: "Recharts", version: "^2.12.7", desc: lang === "pl" ? "Wykresy i wizualizacja statystyk" : "Recruiter charts & statistics" }
  ];

  const handleTogglePrompt = (id: string) => {
    setExpandedPromptId(expandedPromptId === id ? null : id);
  };

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

          {/* Card 4: O twórcy */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <User className="w-5 h-5" />
              </span>
              {t.creatorTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{t.creatorText}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prompts Section (Accordion format, easily extendable) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          {t.promptsTitle}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">{t.promptsIntro}</p>

        <div className="space-y-2.5">
          {promptList.map((p) => {
            const isExpanded = expandedPromptId === p.id;
            const title = lang === "pl" ? p.titlePl : p.titleEn;
            const desc = lang === "pl" ? p.descPl : p.descEn;

            return (
              <div key={p.id} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => handleTogglePrompt(p.id)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 transition text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {title}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap select-all">
                        {desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
