# Lista Użytych Promptów / List of Prompts Used

Niniejszy plik zawiera zestawienie kluczowych promptów, zaleceń i instrukcji przekazanych do modeli sztucznej inteligencji (Gemini 3.5 Flash w Google AI Studio) w trakcie projektowania, refaktoryzacji, umiędzynarodowienia oraz optymalizacji tej aplikacji.
This file contains a list of key prompts, guidelines, and instructions provided to artificial intelligence models (Gemini 3.5 Flash in Google AI Studio) during the design, refactoring, internationalization, and optimization of this application.

---

## 🇵🇱 JĘZYK POLSKI

### Prompt 1: Dodanie licencji AGPL v3 i nagłówków
**Treść instrukcji:**
> Dodaj do projektu plik licencji z pełną treścią licencji AGPL v3. Do wszystkich plików w kodzie dodaj informację w nagłówku zawierającą: autora (Michał Sokołowski), generator (Google AIStudio), użyty model AI/LLM oraz licencję.

### Prompt 2: Normalizacja tekstów i wartości
**Treść instrukcji:**
> Znormalizuj teksty: zmień "obowiązki i zadania" na "Obowiązki i zadania", "notatki dla rekrutera" na "Notatki dla rekrutera", "wykorzystane technologie" na "Wykorzystane technologie", oraz "zaawansowane" na "zaawansowany" w polach poziomu umiejętności kandydatów.

### Prompt 3: Tłumaczenie typów i pól danych na angielski
**Treść instrukcji:**
> Przetłumacz na język angielski nazwy typów, pól i zmiennych w projekcie. Zmień definicje interfejsów w "types.ts" oraz dostosuj wczytywanie i mapowanie pól w bazie danych (np. "osoba" -> "person", "zatrudnienie" -> "employment", "glowne_projekty" -> "projects", "dodatkowe_kursy_i_certyfikaty" -> "certificates", "umiejetnosci" -> "skills").

### Prompt 4: Tłumaczenie i zmiana nazwy komponentu listy zatrudnienia
**Treść instrukcji:**
> Przetłumacz na angielski nazwę komponentu "ZatrudnienieList.tsx" na "EmploymentList.tsx", dostosuj jego zmienne wewnętrzne, typy i wykonaj bezpieczną zmianę nazwy pliku oraz powiązanych importów w kodzie aplikacji.

### Prompt 5: Centralizacja konfiguracji hasła administratora
**Treść instrukcji:**
> Przenieś obie definicje hasła autoryzacyjnego do jednego, spójnego miejsca w kodzie, bezpośrednio do "/src/App.tsx" (np. jako stała `ADMIN_PASSWORDS`) i przekaż je jako właściwość do komponentów podrzędnych takich jak "LocalDbAdmin".

### Prompt 6: Przebudowa i aktualizacja strony O aplikacji
**Treść instrukcji:**
> Zmodyfikuj sekcję "O aplikacji". Usuń wzmianki o zakładkach rekrutacyjnych, zmień "Cel utworzenia" na uniwersalny i ogólny opis bez cech twórcy, uzupełnij technologie o Google AI Studio i model Gemini 3.5 Flash, dodaj sekcję "O twórcy" oraz sekcję "Użyte prompty" z instrukcją uruchamiania strony.

### Prompt 7: Wzmocnienie bezpieczeństwa uwierzytelniania hasła (Web Crypto API)
**Treść instrukcji:**
> Zaimplementuj bezpieczne przechowywanie hasła administratora za pomocą HMAC SHA2-512 i Web Crypto API w pliku "App.tsx". Funkcja testująca poprawność hasła ma znajdować się asynchronicznie w "App.tsx", uniemożliwiając przechowywanie hasła jawnym tekstem.

### Prompt 8: Normalizacja kluczy localStorage i usuwanie prefiksów
**Treść instrukcji:**
> Zmień wartości stałych kluczy localStorage, tak aby nie zawierały ciągu "m_sokolowski_" w celu usunięcia zbędnych powiązań personalnych z metadanymi technicznymi.

### Prompt 9: Przeniesienie pliku cv_data.json w bezpieczne miejsce
**Treść instrukcji:**
> Przenieś plik cv_data.json z katalogu publicznego do prywatnego katalogu źródłowego "src", aby uniemożliwić jego bezpośrednie pobieranie przez adres URL. Wczytuj dane synchronicznie i offline bezpośrednio z kodu źródłowego.

### Prompt 10: Usprawnienie komentarzy, wzorców projektowych i obsługi błędów
**Treść instrukcji:**
> Dodaj komentarze ułatwiające orientację w długich ciągach kodu (if, else, catch, switch), uzupełnij brakujące opisy w blokach catch, opisz zastosowane wzorce projektowe i powody decyzji architektonicznych oraz przetłumacz nagłówki na język angielski.

---

## 🇬🇧 ENGLISH

### Prompt 1: Adding AGPL v3 License and Headers
**Instruction content:**
> Add a license file with the full content of the AGPL v3 license to the project. Add header comments to all source code files containing: the author (Michał Sokołowski), generator (Google AIStudio), the AI/LLM model used, and the license.

### Prompt 2: Text and Value Normalization
**Instruction content:**
> Normalize texts: change "obowiązki i zadania" to "Obowiązki i zadania", "notatki dla rekrutera" to "Notatki dla rekrutera", "wykorzystane technologie" to "Wykorzystane technologie", and "zaawansowane" to "zaawansowany" in skill proficiency level fields.

### Prompt 3: Translating Data Types and Fields to English
**Instruction content:**
> Translate the names of types, fields, and variables in the project to English. Update the interface definitions in "types.ts" and adjust the database loading and field mapping accordingly (e.g. "osoba" -> "person", "zatrudnienie" -> "employment", "glowne_projekty" -> "projects", "dodatkowe_kursy_i_certyfikaty" -> "certificates", "umiejetnosci" -> "skills").

### Prompt 4: Translating and Renaming the Employment List Component
**Instruction content:**
> Translate the name of the component "ZatrudnienieList.tsx" to "EmploymentList.tsx" to English, update its internal variables, types, and safely rename the file and its associated imports in the application code.

### Prompt 5: Centralizing the Admin Password Configuration
**Instruction content:**
> Move both authorization password definitions to a single, consistent location in the code, directly to "/src/App.tsx" (e.g. as an `ADMIN_PASSWORDS` constant) and pass them down as properties to child components like "LocalDbAdmin".

### Prompt 6: Refactoring and Updating the About Application Page
**Instruction content:**
> Modify the "About application" section. Remove mentions of recruiter bookmarks, change "Purpose of creation" to a general and universal description without the creator's characteristics, add Google AI Studio and Gemini 3.5 Flash to technologies, add an "About the Creator" section, and add the "Prompts Used" accordion with self-running instructions.

### Prompt 7: Authentication Security Hardening (Web Crypto API)
**Instruction content:**
> Implement secure admin password storage using HMAC SHA2-512 and the Web Crypto API inside "App.tsx". The verification function must run asynchronously within "App.tsx", eliminating plain text password storage in the client bundle.

### Prompt 8: LocalStorage Keys Normalization and Prefix Removal
**Instruction content:**
> Change persistent localStorage constants to prevent containing the "m_sokolowski_" string, isolating technical state metadata from personal identifying prefixes.

### Prompt 9: Moving cv_data.json to a Secure Location
**Instruction content:**
> Move the cv_data.json file from the public directory to a private "src" source folder, preventing direct HTTP access via a public URL. Load the initial data synchronously and 100% offline from the bundle.

### Prompt 10: Enhancing Code Comments, Design Patterns, and Catch Blocks
**Instruction content:**
> Add structural navigation comments to help orientation inside long code blocks (if, else, catch, switch), document catch blocks with clear rationale comments, explain utilized design patterns, and translate header comments into English.
