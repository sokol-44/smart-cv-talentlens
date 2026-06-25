# SETUP / Instrukcja Uruchomienia i Konfiguracji

Ten plik zawiera szczegółowe instrukcje dotyczące wymagań systemowych, pierwszego uruchomienia, generowania bezpiecznych skrótów haseł administratora oraz dostosowywania aplikacji **Smart CV / TalentLens**.

This file contains detailed instructions regarding system requirements, first run, generating secure administrator password hashes, and customizing the **Smart CV / TalentLens** application.

---

## 🇵🇱 JĘZYK POLSKI

### 1. Wymagania Systemowe
Przed uruchomieniem aplikacji upewnij się, że na Twoim komputerze są zainstalowane następujące narzędzia:
* **Node.js** w wersji **18.x** lub nowszej (rekomendowana wersja LTS: **20.x** lub **22.x**).
* **npm** (menedżer pakietów Node, zazwyczaj dostarczany automatycznie z Node.js).
* Dowolna nowoczesna przeglądarka internetowa (Chrome, Edge, Firefox, Safari) z włączoną obsługą JavaScript i Web Crypto API.

### 2. Pierwsze Uruchomienie (Krok po Kroku)
Aby pobrać, zainstalować i uruchomić projekt lokalnie:
1. **Pobierz kod źródłowy**: Pobierz i rozpakuj archiwum ZIP z kodem źródłowym projektu do wybranego folderu na dysku.
2. **Otwórz Terminal**: Uruchom terminal systemowy (np. PowerShell, Command Prompt w systemie Windows lub Terminal w macOS/Linux) i przejdź do głównego katalogu rozpakowanego projektu:
   ```bash
   cd sciezka/do/katalogu/smart-cv-talentlens
   ```
3. **Zainstaluj Zależności**: Wykonaj poniższe polecenie w celu pobrania i zainstalowania bibliotek zdefiniowanych w pliku `package.json`:
   ```bash
   npm install
   ```
4. **Uruchom Serwer Deweloperski**: Uruchom lokalny serwer Vite za pomocą komendy:
   ```bash
   npm run dev
   ```
5. **Otwórz Aplikację**: W oknie terminala zobaczysz adres URL (zazwyczaj `http://localhost:3000`). Skopiuj go i otwórz w przeglądarce internetowej.

### 3. Konfiguracja i Zmiana Hasła Administratora
Aplikacja wykorzystuje nowoczesne, asynchroniczne szyfrowanie **HMAC-SHA-512** oparte na standardzie **Web Crypto API** (natywnie wspieranym w przeglądarkach) w celu bezpiecznej weryfikacji haseł bez przechowywania ich jawnym tekstem w kodzie źródłowym.

#### Krok po kroku, jak wygenerować i ustawić nowe hasło:
1. Otwórz uruchomioną aplikację w przeglądarce.
2. Otwórz Konsolę Deweloperską przeglądarki (klawisz **F12** lub kliknij prawym przyciskiem myszy -> *Zbadaj* -> zakładka *Konsola* / *Console*).
3. Skopiuj i wklej do konsoli poniższy kod pomocniczy, zastępując `"twoje_haslo"` swoim własnym, bezpiecznym hasłem:
   ```javascript
   const generateHash = async (password) => {
     const encoder = new TextEncoder();
     const saltBytes = encoder.encode("CV_Secure_Salt_2026");
     const key = await crypto.subtle.importKey(
       "raw", saltBytes, { name: "HMAC", hash: "SHA-512" }, false, ["sign"]
     );
     const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(password));
     return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
   };
   await generateHash("twoje_haslo");
   ```
4. Naciśnij **Enter**. Konsola zwróci długi, 128-znakowy ciąg szesnastkowy (np. `57c...9a`). Skopiuj go.
5. Otwórz plik `/src/App.tsx` w edytorze kodu.
6. Znajdź stałą `AUTHORIZED_HMAC_HASHES` i wklej tam swój skopiowany skrót, np.:
   ```typescript
   const AUTHORIZED_HMAC_HASHES = [
     "twoj_wygenerowany_128_znakowy_ciag_szesnastkowy"
   ];
   ```
7. Zapisz plik. Serwer deweloperski automatycznie przeładuje stronę. Twoje nowe hasło jest już aktywne!

### 4. Dostosowywanie Danych CV
Wszystkie dane osobowe, opisy stanowisk, projekty, technologie oraz certyfikaty są wczytywane z centralnego, prywatnego pliku `/src/cv_data.json`.
* Aby dostosować informacje kandydata pod swoje potrzeby, otwórz plik `/src/cv_data.json` i zmodyfikuj jego pola (imię, nazwisko, tytuły, linki społecznościowe, opisy w językach `pl` oraz `en`).
* Możesz także edytować te dane w trybie live po zalogowaniu do panelu Administratora (klikając ikonkę ⚙️ w stopce i wpisując hasło), a następnie pobrać gotowy plik zaktualizowanego CV jako plik JSON, którym zastąpisz zawartość `/src/cv_data.json`.

---

## 🇬🇧 ENGLISH

### 1. System Requirements
Before running the application, ensure the following utilities are installed on your machine:
* **Node.js** version **18.x** or higher (Recommended LTS: **20.x** or **22.x**).
* **npm** (Node package manager, bundled automatically with Node.js).
* Any modern web browser (Chrome, Edge, Firefox, Safari) with JavaScript and Web Crypto API enabled.

### 2. First Run (Step-by-Step)
To download, install, and launch the project locally:
1. **Download the Source Code**: Download and extract the source code ZIP archive to a folder of your choice on your system.
2. **Open Terminal**: Open your system command line (e.g., PowerShell, Command Prompt on Windows, or Terminal on macOS/Linux) and navigate to the project root:
   ```bash
   cd path/to/folder/smart-cv-talentlens
   ```
3. **Install Dependencies**: Execute the following command to download and install packages declared in `package.json`:
   ```bash
   npm install
   ```
4. **Launch Development Server**: Start the local Vite developer environment with:
   ```bash
   npm run dev
   ```
5. **Open the Application**: The terminal window will display a URL (usually `http://localhost:3000`). Copy and open this address in your web browser.

### 3. Administrator Password Configuration & Modification
The application implements modern, asynchronous **HMAC-SHA-512** hashing based on the **Web Crypto API** standard (supported natively in modern browsers) to securely authenticate the admin session without saving plain text passwords in the client bundle.

#### Step-by-step instructions to generate and apply a custom password:
1. Open the running application in your web browser.
2. Open your browser's Developer Tools Console (press **F12** or right-click -> *Inspect* -> *Console* tab).
3. Copy and paste the following utility snippet into the console, replacing `"your_password"` with your desired secure secret:
   ```javascript
   const generateHash = async (password) => {
     const encoder = new TextEncoder();
     const saltBytes = encoder.encode("CV_Secure_Salt_2026");
     const key = await crypto.subtle.importKey(
       "raw", saltBytes, { name: "HMAC", hash: "SHA-512" }, false, ["sign"]
     );
     const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(password));
     return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
   };
   await generateHash("your_password");
   ```
4. Press **Enter**. The console will print a long, 128-character hexadecimal hash (e.g., `57c...9a`). Copy this string.
5. Open the `/src/App.tsx` file in your favorite code editor.
6. Locate the `AUTHORIZED_HMAC_HASHES` array and paste your copied hash inside:
   ```typescript
   const AUTHORIZED_HMAC_HASHES = [
     "your_generated_128_character_hex_hash"
   ];
   ```
7. Save the file. The development server will auto-reload. Your new password is now active!

### 4. Customizing CV Data
All personal details, employment histories, projects, skills, and certifications are loaded from a central, private source file `/src/cv_data.json`.
* To adjust the candidate's portfolio with your own info, open `/src/cv_data.json` and change the key fields (first name, last name, titles, social links, descriptions in both `pl` and `en` locales).
* Alternatively, you can edit these records in real-time by logging into the Admin mode (clicking the ⚙️ gear icon in the footer and typing your password), editing the fields directly on-screen, exporting the modified database as a JSON file, and replacing `/src/cv_data.json` with the downloaded content.
