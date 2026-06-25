# Rationale

## Dlaczego powstał projekt Smart CV / TalentLens

### Tło problemu

W latach 2024–2026 procesy rekrutacyjne uległy znaczącej zmianie. Dynamiczny rozwój narzędzi opartych o sztuczną inteligencję, systemów ATS (Applicant Tracking Systems) oraz automatycznej analizy dokumentów sprawił, że przygotowanie skutecznego CV stało się znacznie bardziej skomplikowane niż kiedykolwiek wcześniej.

W praktyce kandydaci muszą jednocześnie spełnić trzy często sprzeczne wymagania:

1. **Wymagania systemów ATS i AI**
   - CV musi zawierać odpowiednie słowa kluczowe.
   - Dokument musi być zoptymalizowany pod automatyczne filtrowanie.
   - Kandydat jest oceniany przez algorytmy jeszcze zanim dokument trafi do człowieka.

2. **Wymagania rekruterów HR**
   - Dokument powinien być krótki, przejrzysty i łatwy do szybkiego przejrzenia.
   - Rekruter poświęca na pierwszą ocenę często mniej niż minutę.
   - Zbyt rozbudowane CV jest często pomijane.

3. **Wymagania liderów technicznych i managerów**
   - Potrzebują szczegółowych informacji o doświadczeniu.
   - Oczekują kontekstu biznesowego, architektonicznego i technologicznego.
   - Chcą szybko odnaleźć konkretne kompetencje, technologie i projekty.

Problem polega na tym, że pojedynczy dokument CV nie jest w stanie efektywnie zaspokoić wszystkich tych potrzeb jednocześnie.

W rezultacie kandydaci często dokonują niekorzystnych kompromisów:

- upraszczają CV pod ATS,
- skracają opisy projektów,
- usuwają szczegóły techniczne,
- redukują informacje o architekturze i skali rozwiązań.

Tak przygotowane dokumenty przechodzą pierwszy etap selekcji, lecz tracą wartość podczas oceny przez osoby techniczne odpowiedzialne za końcową decyzję rekrutacyjną.

### Obserwacje prowadzące do powstania projektu

Inspiracją do stworzenia systemu były rzeczywiste doświadczenia zdobyte podczas licznych procesów rekrutacyjnych prowadzonych zarówno jako kandydat, jak i osoba współpracująca z zespołami technicznymi.

Zaobserwowano, że:

- HR i zespoły techniczne często oceniają kandydatów według zupełnie innych kryteriów.
- Kluczowe kompetencje specjalistyczne bywają pomijane w ofertach pracy.
- Kandydaci nie mają możliwości prezentowania doświadczenia na różnych poziomach szczegółowości.
- Wiele lat wiedzy projektowej zostaje sprowadzone do kilku krótkich punktów w CV.
- Liderzy techniczni tracą czas na ręczne wyszukiwanie istotnych informacji w dokumentach.

Jednocześnie rozwój technologii AI umożliwił tworzenie interfejsów pozwalających prezentować te same dane w różnych kontekstach i dla różnych odbiorców.

### Cel projektu

Celem projektu Smart CV / TalentLens jest rozdzielenie warstwy danych o doświadczeniu zawodowym od sposobu ich prezentacji.

Zamiast tworzyć jedno CV próbujące zadowolić wszystkich odbiorców, system umożliwia prezentację tych samych informacji w wielu niezależnych widokach.

### Główne założenia rozwiązania

#### Widok uproszczony

Przeznaczony dla:

- działów HR,
- rekruterów,
- osób wykonujących wstępną selekcję.

Charakterystyka:

- przejrzysta prezentacja doświadczenia,
- nacisk na czytelność,
- podsumowanie najważniejszych kompetencji,
- szybkie odnalezienie słów kluczowych,
- atrakcyjna wizualnie forma.

#### Widok ekspercki

Przeznaczony dla:

- Team Leaderów,
- Architektów,
- CTO,
- managerów technicznych.

Charakterystyka:

- pełna historia projektowa,
- szczegółowe informacje technologiczne,
- możliwość filtrowania po technologiach,
- wyszukiwanie kompetencji,
- analiza doświadczenia w konkretnych obszarach,
- szybkie odnajdywanie projektów związanych z danym wymaganiem.

### Wykorzystanie sztucznej inteligencji

Projekt wykorzystuje współczesne modele językowe do:

- analizy CV,
- identyfikacji kompetencji,
- kategoryzacji doświadczeń,
- generowania podsumowań,
- wspomagania dopasowania kompetencji do ofert pracy,
- budowy inteligentnych filtrów wyszukiwania.

Kluczowym założeniem jest jednak zachowanie pełnej kontroli użytkownika nad prezentowanymi informacjami oraz unikanie generowania nieistniejących kompetencji.

### Wartość biznesowa

Projekt przynosi korzyści trzem grupom użytkowników.

#### Kandydaci

- mogą prezentować doświadczenie w odpowiedniej szczegółowości,
- nie muszą wybierać między ATS a szczegółowością techniczną,
- zachowują pełny kontekst swoich projektów.

#### Rekruterzy

- szybciej oceniają kandydatów,
- łatwiej identyfikują dopasowanie do stanowiska,
- otrzymują czytelny i spójny obraz kompetencji.

#### Liderzy techniczni

- mogą filtrować doświadczenie według rzeczywistych potrzeb projektu,
- szybciej odnajdują konkretne realizacje,
- otrzymują dostęp do szczegółów technicznych bez konieczności przeszukiwania całego CV.

### Dlaczego projekt jest potrzebny

Obecny rynek rekrutacyjny cierpi na problem utraty informacji pomiędzy kandydatem, HR i zespołem technicznym.

Smart CV / TalentLens powstał jako próba usunięcia tej luki poprzez stworzenie narzędzia, które:

- przechowuje pełną historię doświadczenia zawodowego,
- prezentuje ją w sposób dostosowany do odbiorcy,
- wspiera proces rekrutacyjny zamiast go upraszczać kosztem jakości,
- wykorzystuje AI jako narzędzie wspomagające analizę, a nie zastępujące ocenę ekspercką.

### Podsumowanie

Smart CV / TalentLens jest odpowiedzią na współczesny problem rozbieżności pomiędzy wymaganiami systemów ATS, działów HR i zespołów technicznych. Projekt ma na celu umożliwienie wielowymiarowej prezentacji doświadczenia zawodowego, zachowanie pełnego kontekstu projektowego oraz usprawnienie komunikacji pomiędzy wszystkimi uczestnikami procesu rekrutacyjnego.

Jego podstawową misją jest sprawienie, aby wartościowe doświadczenie specjalistów nie było tracone na skutek ograniczeń tradycyjnego CV.
