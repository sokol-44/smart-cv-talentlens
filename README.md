# Interaktywne CV i System Dopasowania Kandydata / Interactive CV & Candidate Role Matching System

Ten projekt to nowoczesne, interaktywne i dwujęzyczne (PL/EN) CV Michała Sokołowskiego, wzbogacone o system automatycznego dopasowania do ról rekrutacyjnych.
This project is a modern, interactive, and bilingual (PL/EN) CV of Michał Sokołowski, enriched with an automatic recruitment role suitability matching system.

---

## 🇵🇱 JĘZYK POLSKI

### 1. Cel utworzenia
Aplikacja została stworzona w celu nowoczesnej, interaktywnej i wielojęzycznej prezentacji kwalifikacji zawodowych, historii zatrudnienia, zrealizowanych projektów oraz uzyskanych certyfikatów. System został zoptymalizowany dla rekruterów oraz menedżerów technicznych poszukujących odpowiednich kandydatów na stanowiska inżynieryjne, umożliwiając szybkie dopasowanie profili do specyfiki ról projektowych.

### 2. Sposób utworzenia i architektura
Aplikacja została zbudowana jako nowoczesna aplikacja jednostronicowa (SPA) oparta na bibliotece React z szybkim systemem budowania Vite i pełnym typowaniem TypeScript. Stylizacja została oparta na nowoczesnym podejściu Tailwind CSS, zapewniając pełną responsywność i lekki interfejs. Wszystkie dane CV są wczytywane z lokalnego pliku JSON i synchronizowane w czasie rzeczywistym z lokalną bazą danych przeglądarki (Local Storage), co gwarantuje pełną prywatność i natychmiastowe działanie bez konieczności rejestracji.

### 3. Użyte technologie i wersje
* **Google AI Studio** (API / Portal) – Generowanie i wspomaganie programowania
* **Gemini 3.5 Flash** (LLM Model) – Inteligentne wspomaganie, translacja i refaktoryzacja
* **React** (^18.3.1) – Główna biblioteka UI
* **Vite** (^5.4.1) – Szybkie środowisko budowania
* **TypeScript** (^5.5.3) – Statyczne typowanie
* **Tailwind CSS** (^4.0.0) – Responsywny silnik stylów
* **Motion (Framer)** (^11.5.4) – Płynne animacje przejść
* **Lucide React** (^0.439.0) – Wektorowy pakiet ikon
* **Recharts** (^2.12.7) – Wykresy i wizualizacja statystyk

### 4. Zaimplementowane funkcjonalności
* Dynamiczne i dwujęzyczne (PL/EN) filtrowanie oraz wyszukiwanie we wszystkich widokach CV.
* System "Dopasowanie Kandydata do Roli" bazujący na analizie tagów i stopnia dopasowania z wizualnymi wykresami.
* Filtrowanie certyfikatów i szkoleń po latach oraz wyszukiwanie technologii w słowniku wraz z synonimami.
* Możliwość dodawania dwujęzycznych notatek i komentarzy rekrutacyjnych do każdego stanowiska, projektu i szkolenia.
* Kompletny panel zarządzania lokalną bazą danych z funkcjami pobierania (eksportu) i wgrywania (importu) całego CV jako pliku JSON.
* Możliwość edycji opisów osobistych oraz pozazawodowych pasji wprost z poziomu panelu Admina.

### 5. Instrukcja obsługi
#### Dla Użytkownika / Rekrutera
Użyj selektora języków w nagłówku, aby przełączać interfejs i dane między językiem polskim (PL) a angielskim (EN). Przeglądaj zakładki, aby zobaczyć historię zatrudnienia, projekty, certyfikaty i słownik technologii. W sekcji "Dopasowanie & Rekrutacja" wybierz jeden z gotowych profili ról lub zdefiniuj własne wymagania (tagi), aby zobaczyć automatyczny wskaźnik dopasowania kandydata wraz z uzasadnieniem.

#### Dla Administratora (Tryb Edycji)
Aby wejść w tryb administracyjny, kliknij ikonkę zębatki (⚙️) w stopce strony i podaj hasło autoryzacyjne. Po zalogowaniu uzyskasz dostęp do: edycji danych kandydata inline, zapisywania dwujęzycznych notatek rekrutera (osobno dla języka polskiego i angielskiego), edycji pozazawodowych pasji Michała oraz pełnego panelu administracyjnego bazy danych (eksport i import plików JSON). Hasło autoryzacyjne jest zdefiniowane bezpośrednio w kodzie (`/src/App.tsx`). Domyślne hasła to `admin` lub `m_sokolowski`.

#### Instrukcja samodzielnego uruchamiania strony
1. Pobierz kod źródłowy aplikacji (wypakuj archiwum ZIP).
2. Otwórz terminal (wiersz poleceń) w głównym katalogu projektu.
3. Zainstaluj wszystkie wymagane zależności za pomocą komendy:
   ```bash
   npm install
   ```
4. Uruchom lokalny serwer aplikacji komendą:
   ```bash
   npm run dev
   ```
5. Otwórz przeglądarkę i wejdź na adres: `http://localhost:3000`

### 6. O twórcy
Autorem oprogramowania jest Michał Sokołowski – doświadczony inżynier oprogramowania, architekt systemów i pasjonat nowych technologii z ponad 20-letnim stażem w branży IT.

---

## 🇬🇧 ENGLISH

### 1. Purpose of Creation
This application was created to provide a modern, interactive, and bilingual presentation of professional qualifications, employment history, completed projects, and certifications. The system is optimized for recruiters and engineering managers looking for candidates for engineering roles, enabling rapid matching of profiles against project requirements.

### 2. Creation Method & Architecture
The application was developed as a modern Single Page Application (SPA) utilizing React, Vite, and TypeScript. Styling is powered by Tailwind CSS for a highly responsive, performant, and elegant user experience. All CV data is loaded from a local JSON file and synchronized in real-time with the browser's Local Storage, securing user privacy and ensuring instant responsiveness with zero login requirements.

### 3. Technologies Used & Versions
* **Google AI Studio** (API / Portal) – Generation and programming assistance
* **Gemini 3.5 Flash** (LLM Model) – Intelligent assistance, translation & refactoring
* **React** (^18.3.1) – Core UI Library
* **Vite** (^5.4.1) – Modern frontend build tool
* **TypeScript** (^5.5.3) – Statically typed JavaScript
* **Tailwind CSS** (^4.0.0) – Responsive utility-first styling
* **Motion (Framer)** (^11.5.4) – Fluid visual transitions
* **Lucide React** (^0.439.0) – Vector icon pack
* **Recharts** (^2.12.7) – Recruiter charts & statistics

### 4. Implemented Features
* Dynamic, bilingual (PL/EN) filtering and full-text search across all CV modules.
* Recruiter Match system with instant suitability scoring and visual charts based on selected tags.
* Filter certifications by year and search technologies in the dictionary, including recognized synonyms.
* Interactive recruiter notes and feedback comments editable inline for any job, project, or training.
* Comprehensive local database administrator panel with export and import features via local JSON files.
* Inline editing of personal descriptions and hobby passions directly from the authenticated interface.

### 5. User & Admin Guide
#### For the User / Recruiter
Use the language toggle in the header to switch both the UI and CV content between Polish (PL) and English (EN). Navigate through tabs to browse work history, projects, certifications, and the technology dictionary. In the 'Matching & Recruitment' section, select a pre-defined role profile or customize required tags to see an instant suitability score with full technical justification.

#### For the Administrator (Edit Mode)
To enter administration/edit mode, click the gear (⚙️) icon in the footer and provide the authorization password. Once authenticated, you can: edit candidate data inline, save bilingual recruiter comments (separately for Polish and English), edit Michał's non-professional passions, and access the full JSON import/export suite. The authorization password is defined directly in the source code (`/src/App.tsx`). Default passwords are `admin` or `m_sokolowski`.

#### Self-Running Instructions
1. Download the application source code (unpack the ZIP archive).
2. Open a terminal (command line) in the root directory of the project.
3. Install all required dependencies using:
   ```bash
   npm install
   ```
4. Start the local application server using:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to: `http://localhost:3000`

### 6. About the Creator
The software was created by Michał Sokołowski – an experienced software engineer, systems architect, and technology enthusiast with over 20 years of experience in the IT industry.
