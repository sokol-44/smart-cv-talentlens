# Interaktywne CV i System Dopasowania Kandydata / Interactive CV & Candidate Role Matching System

Ten projekt to nowoczesne, interaktywne i dwujęzyczne (PL/EN) CV Michała Sokołowskiego, wzbogacone o system automatycznego dopasowania do ról rekrutacyjnych.
This project is a modern, interactive, and bilingual (PL/EN) CV of Michał Sokołowski, enriched with an automatic recruitment role suitability matching system.

### 🚀 SETUP / Instrukcja Pierwszego Uruchomienia
* **PL**: Pełna instrukcja uruchomienia lokalnego, instalacji zależności oraz konfiguracji haseł i dostosowywania projektu znajduje się w dedykowanym dokumencie: [doc/SETUP.md](doc/SETUP.md).
* **EN**: Full instructions for local environment setup, dependency installation, custom password hashing, and project customization can be found in the dedicated document: [doc/SETUP.md](doc/SETUP.md).

---

## 🇵🇱 JĘZYK POLSKI

### 1. Cel utworzenia
Aplikacja została stworzona w celu nowoczesnej, interaktywnej i wielojęzycznej prezentacji kwalifikacji zawodowych, historii zatrudnienia, zrealizowanych projektów oraz uzyskanych certyfikatów. System został zoptymalizowany dla rekruterów oraz menedżerów technicznych poszukujących odpowiednich kandydatów na stanowiska inżynieryjne, umożliwiając szybkie dopasowanie profili do specyfiki ról projektowych.

Szczegółowe wyjaśnienie powodów powstania projektu, tła rynkowego oraz problemów rekrutacyjnych, na które odpowiada system, znajduje się w pliku: [doc/RATIONALE_PL.md](doc/RATIONALE_PL.md).

### 2. Sposób utworzenia i architektura
Aplikacja została zaprojektowana i zbudowana jako nowoczesna aplikacja jednostronicowa (SPA) oparta na bibliotece React z szybkim systemem budowania Vite i pełnym typowaniem TypeScript. **Aplikacja powstała w całości w procesie "Vibe coding" z minimalną ingerencją człowieka w kod źródłowy**, wykorzystując potencjał zaawansowanych modeli AI do generowania kodu, automatycznego tłumaczenia i bezpiecznej refaktoryzacji. Stylizacja została oparta na nowoczesnym podejściu Tailwind CSS, zapewniając pełną responsywność i lekki interfejs. Wszystkie dane CV są wczytywane z lokalnego pliku JSON i synchronizowane w czasie rzeczywistym z lokalną bazą danych przeglądarki (LocalStorage) za pomocą Web Crypto API (HMAC SHA-512) dla bezpieczeństwa logowania i pełnej prywatności.

### 3. Użyte technologie i wersje
* **Google AI Studio** (API / Portal) – Generowanie i wspomaganie programowania
* **Gemini 3.5 Flash** (LLM Model) – Inteligentne wspomaganie, translacja i refaktoryzacja
* **React** (^19.0.1) – Główna biblioteka UI
* **Vite** (^6.2.3) – Szybkie środowisko deweloperskie i budowania
* **TypeScript** (~5.8.2) – Statyczne typowanie gwarantujące stabilność i brak błędów
* **Tailwind CSS** (^4.1.14) – Responsywny silnik stylów (z pluginem Vite)
* **Motion (Framer)** (^12.23.24) – Płynne animacje i przejścia widoków
* **Lucide React** (^0.546.0) – Wektorowy pakiet nowoczesnych ikon

### 4. Zaimplementowane funkcjonalności
* Dynamiczne i dwujęzyczne (PL/EN) filtrowanie oraz wyszukiwanie we wszystkich widokach CV, w tym nowo dodany system szybkiego wyszukiwania w sekcji **Zatrudnienie** (filtrowanie po stanowiskach, firmach i technologiach).
* Możliwość dynamicznego eksportu danych CV do ustrukturyzowanego pliku Markdown (.md) bez emotikonów i zbędnych ozdobników, z automatycznym dołączeniem linku do repozytorium projektu w stopce.
* Graficzna legenda w **Słowniku Technologii** ułatwiająca zrozumienie poziomów zaawansowania kandydata (Ekspert, Średniozaawansowany, Ogólna znajomość).
* Zunifikowana sekcja metadanych w zakładce **Projekty** i **Zatrudnienie** – estetyczne, ustrukturyzowane wyświetlanie wersji bibliotek oraz wzorców projektowych.
* **Bezpieczeństwo edycji**: Zablokowano możliwość edycji i komentowania "wykorzystywanych technologii" w widokach **Zatrudnienie** oraz **Projekty** bez uprzedniego zalogowania się do trybu Administratora.
* **Analiza systemowa (Dopasowanie do ról)**: Rozbudowany raport dopasowania projektów w zakładce rekrutera – automatycznie prezentuje **3 najbardziej pasujące projekty** z wyliczonym precyzyjnie procentem (%) zgodności oraz wskaźnikiem dopasowania tagów.
* **Szkolenie i edukacja**: W pełni odtworzona i poprawnie zintegrowana dwujęzyczna sekcja **"Zainteresowania, Hobby i Uprawnienia"** w oparciu o nową strukturę danych `$.additionalSkillsAndHobbies` dostarczaną bezpośrednio z pliku `cv_data.json`.
* Filtrowanie certyfikatów i szkoleń po latach oraz wyszukiwanie technologii w słowniku wraz z synonimami.
* Możliwość dodawania dwujęzycznych notatek i komentarzy rekrutacyjnych do każdego stanowiska, projektu i szkolenia.
* Kompletny panel zarządzania lokalną bazą danych z funkcjami pobierania (eksportu) i wgrywania (importu) całego CV jako pliku JSON.
* Możliwość edycji opisów osobistych oraz pozazawodowych pasji wprost z poziomu panelu Admina.

### 5. Instrukcja obsługi
#### Dla Użytkownika / Rekrutera
Użyj selektora języków w nagłówku, aby przełączać interfejs i dane między językiem polskim (PL) a angielskim (EN). Przeglądaj zakładki, aby zobaczyć historię zatrudnienia, projekty, certyfikaty i słownik technologii. W sekcji "Dopasowanie & Rekrutacja" wybierz jeden z gotowych profili ról lub zdefiniuj własne wymagania (tagi), aby zobaczyć automatyczny wskaźnik dopasowania kandydata wraz z uzasadnieniem.

#### Dla Administratora (Tryb Edycji)
Aby wejść w tryb administracyjny, kliknij ikonkę zębatki (⚙️) w stopce strony i podaj hasło autoryzacyjne. Po zalogowaniu uzyskasz dostęp do: edycji danych kandydata inline, zapisywania dwujęzycznych notatek rekrutera (osobno dla języka polskiego i angielskiego), edycji pozazawodowych pasji Michała oraz pełnego panelu administracyjnego bazy danych (eksport i import plików JSON). Hasło autoryzacyjne jest zdefiniowane bezpośrednio w kodzie (`/src/App.tsx`). Domyślne hasła to `admin` lub `m_sokolowski`. Szczegółowy opis generowania bezpiecznych skrótów haseł przy użyciu Web Crypto API znajduje się w pliku [doc/SETUP.md](doc/SETUP.md).

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

A detailed explanation of the project's background, market context, and the recruitment challenges addressed by this system can be found in the file: [doc/RATIONALE_EN.md](doc/RATIONALE_EN.md).

### 2. Creation Method & Architecture
The application was developed as a modern Single Page Application (SPA) utilizing React, Vite, and TypeScript. **The codebase was fully generated through "Vibe coding" with minimal human intervention**, exploiting the capabilities of advanced AI models for code drafting, translation, and secure refactoring. Styling is powered by Tailwind CSS for a highly responsive, performant, and elegant user experience. All CV data is loaded from a local JSON file and synchronized in real-time with the browser's LocalStorage. Session authentication is implemented securely using the browser's Web Crypto API (HMAC SHA-512) to ensure user privacy and offline security.

### 3. Technologies Used & Versions
* **Google AI Studio** (API / Portal) – Generation and programming assistance
* **Gemini 3.5 Flash** (LLM Model) – Intelligent assistance, translation & refactoring
* **React** (^19.0.1) – Core UI Library
* **Vite** (^6.2.3) – Modern frontend development & build tool
* **TypeScript** (~5.8.2) – Statically typed JavaScript ensuring safety and robustness
* **Tailwind CSS** (^4.1.14) – Responsive utility-first styling (with Vite plugin)
* **Motion (Framer)** (^12.23.24) – Fluid visual transitions and view animations
* **Lucide React** (^0.546.0) – Vector icon pack

### 4. Implemented Features
* Dynamic, bilingual (PL/EN) filtering and full-text search across all CV modules, including a high-performance fast search in the **Employment** section (filtering across roles, companies, descriptions, and technology stacks).
* Capability to dynamically export all CV data to a clean, well-structured Markdown (.md) document without emojis or unnecessary clutter, automatically appending the project's GitHub repository link to the footer.
* Interactive graphical proficiency level legend in the **Technology Dictionary** to quickly differentiate skills (Expert, Intermediate, General knowledge).
* Standardized, highly structured display of library versions and software design patterns in both the **Projects** and **Employment** interfaces.
* **Editing Lock (Security)**: Inline editing and custom comments for "utilized technologies" on both **Employment** and **Projects** tabs are strictly restricted and hidden for non-logged-in users, requiring an active Admin session.
* **System Analysis (Role Matching)**: Enhanced project matching dashboard displaying the **top 3 most compatible projects** automatically sorted by overlap and showing their precise percentage (%) compatibility score and matched tags indicator.
* **Education & Training**: Restored and beautifully translated **"Interests, Hobbies, and Certifications/Permits"** section under the Education tab, leveraging the new structured bilingual schema `$.additionalSkillsAndHobbies` directly from `cv_data.json`.
* Filter certifications by year and search technologies in the dictionary, including recognized synonyms.
* Interactive recruiter notes and feedback comments editable inline for any job, project, or training.
* Comprehensive local database administrator panel with export and import features via local JSON files.
* Inline editing of personal descriptions and hobby passions directly from the authenticated interface.

### 5. User & Admin Guide
#### For the User / Recruiter
Use the language toggle in the header to switch both the UI and CV content between Polish (PL) and English (EN). Navigate through tabs to browse work history, projects, certifications, and the technology dictionary. In the 'Matching & Recruitment' section, select a pre-defined role profile or customize required tags to see an instant suitability score with full technical justification.

#### For the Administrator (Edit Mode)
To enter administration/edit mode, click the gear (⚙️) icon in the footer and provide the authorization password. Once authenticated, you can: edit candidate data inline, save bilingual recruiter comments (separately for Polish and English), edit Michał's non-professional passions, and access the full JSON import/export suite.
The authorization verification is handled securely using the browser's Web Crypto API (HMAC SHA-512) and is configured directly inside `/src/App.tsx`. Default credentials are `admin` or `sokolowski`. For detailed instructions on generating custom secure password hashes, refer to [doc/SETUP.md](doc/SETUP.md).

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
