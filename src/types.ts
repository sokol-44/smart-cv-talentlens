/**
 * Represents a date range period.
 *
 * @interface OkresDaty
 * @property {string} start - Start date in format MM.YYYY.
 * @property {string} end - End date in format MM.YYYY, "obecnie" (present), or empty.
 */
export interface OkresDaty {
  start: string; // MM.YYYY
  end: string;   // MM.YYYY or "obecnie" / empty
}

/**
 * Basic personal profile details.
 *
 * @interface Osoba
 * @property {string} imie - Given name.
 * @property {string} nazwisko - Family name.
 * @property {string[]} opis - Brief professional overview paragraph list.
 * @property {string} GitHub - URL to GitHub profile.
 * @property {string} LinkedIN - URL to LinkedIn profile.
 */
export interface Osoba {
  imie: string;
  nazwisko: string;
  opis: string[];
  GitHub: string;
  LinkedIN: string;
  pasje?: {
    pl: string;
    en: string;
  };
}

/**
 * An educational background item.
 *
 * @interface Edukacja
 * @property {OkresDaty} data - Duration of study.
 * @property {string} instytucja - Educational institution name.
 * @property {string} typ - Type of program (e.g. Inżynierskie, Studia Podyplomowe).
 * @property {string} kierunek - Major or field of study.
 * @property {string} [potwierdzenie] - Optional description or confirmation certificate title.
 */
export interface Edukacja {
  data: OkresDaty;
  instytucja: string;
  typ: string;
  kierunek: string;
  potwierdzenie?: string;
}

/**
 * Professional certification or training course completed.
 *
 * @interface Certyfikat
 * @property {string} id - Unique identifier.
 * @property {string} data - Completion date (MM.YYYY or YYYY).
 * @property {string} [czas_trwania_godziny] - Optional duration of the course in hours.
 * @property {string} instytucja - Issuing authority or training center.
 * @property {string} nazwa - Title of course/certificate.
 * @property {string} [informacje] - Optional additional information or context.
 * @property {string[]} [technologie_i_obowiazki] - Tech stack tags covered in certification.
 */
export interface Certyfikat {
  id: string;
  data: string; // MM.YYYY or YYYY
  czas_trwania_godziny?: string;
  instytucja: string;
  nazwa: string;
  informacje?: string;
  technologie_i_obowiazki?: string[];
}

export interface RolePreset {
  id: string;
  title: string;
  title_en: string;
  tags: string[];
  description: string;
  description_en: string;
}

/**
 * Employment record detailing professional work experience.
 *
 * @interface Zatrudnienie
 * @property {string} id - Unique identifier.
 * @property {OkresDaty} data - Employment duration.
 * @property {string} firma - Name of employer.
 * @property {string | string[] | { pl: string; en: string }} stanowisko - Role title(s) occupied.
 * @property {string[]} obowiazki - List of key duties.
 * @property {string[]} technologie - Technologies list used in this role.
 * @property {Record<string, string[]>} [wersje] - Mapping of used technologies to their versions.
 * @property {string[]} [glowne_projekty] - Projects names completed during this tenure.
 * @property {string[]} [wzorce_projektowe] - Design patterns practiced in this role.
 * @property {string[]} [techniki_developerskie] - Development methodologies/techniques applied.
 */
export interface Zatrudnienie {
  id: string;
  data: OkresDaty;
  firma: string;
  stanowisko: string | string[] | { pl: string; en: string };
  obowiazki: string[];
  technologie: string[];
  wersje?: Record<string, string[]>;
  glowne_projekty?: string[];
  wzorce_projektowe?: string[];
  techniki_developerskie?: string[];
}

/**
 * Individual software/hardware development project.
 *
 * @interface Projekt
 * @property {string} id - Unique identifier.
 * @property {string} nazwa - Project name.
 * @property {string} [url] - Optional link to the project repository/live app.
 * @property {string[]} firma - Associated clients or employers.
 * @property {OkresDaty} data - Project lifecycle duration.
 * @property {string} opis - Detailed textual description of the project.
 * @property {string[]} technologie - Tech stack used in the project.
 * @property {Record<string, string[]>} [wersje] - Mapping of specific library/framework versions.
 * @property {string[]} [wzorce_projektowe] - Design patterns used in the source code.
 * @property {string[]} [wyrozniajajace_sie_elementy] - Distinctive/notable engineering achievements.
 */
export interface Projekt {
  id: string;
  nazwa: string;
  url?: string;
  firma: string[];
  data: OkresDaty;
  opis: string;
  technologie: string[];
  wersje?: Record<string, string[]>;
  wzorce_projektowe?: string[];
  wyrozniajajace_sie_elementy?: string[];
}

/**
 * Specific core skill with a level of expertise.
 *
 * @interface Umiejetnosc
 * @property {string} nazwa - Title of skill.
 * @property {string} stopien_zaawansowania - Level of competency (e.g. "zaawansowany", "średni").
 */
export interface Umiejetnosc {
  nazwa: string;
  stopien_zaawansowania: string; // e.g. "zaawansowane", "średni", "podstawowy"
}

/**
 * Represents a single technology item in the dictionary with its synonyms.
 *
 * @interface TechnologiaSlownikElement
 * @property {string} nazwa - Core technology name.
 * @property {string[]} synonimy - List of recognized synonyms or alternative names.
 */
export interface TechnologiaSlownikElement {
  nazwa: string;
  synonimy: string[];
}

/**
 * Dictionary of technologies categorized by their ecosystem types.
 *
 * @interface SlownikiUzytychTechnologii
 */
export interface SlownikiUzytychTechnologii {
  jezyki_programowania_i_skryptowe: TechnologiaSlownikElement[];
  frameworki_i_biblioteki: TechnologiaSlownikElement[];
  bazy_danych_i_przechowywanie: TechnologiaSlownikElement[];
  Narzedzia_i_platformy_Cloud: TechnologiaSlownikElement[];
  systemy_operacyjne_i_administracja: TechnologiaSlownikElement[];
  protokoly_API_i_integracje: TechnologiaSlownikElement[];
  Uslugi_sieciowe_i_serwerowe: TechnologiaSlownikElement[];
  Inne_narzedzia: TechnologiaSlownikElement[];
}

/**
 * Complete structure of the CV database.
 *
 * @interface CVData
 */
export interface CVData {
  osoba: Osoba;
  edukacja: Edukacja[];
  dodatkowe_kursy_i_certyfikaty: Certyfikat[];
  zatrudnienie: Zatrudnienie[];
  glowne_projekty: Projekt[];
  umiejetnosci: Umiejetnosc[];
  dodatkowe_umiejetnosci_i_hobby: string[];
  slowniki_uzytych_technologii: SlownikiUzytychTechnologii;
  role_presets?: RolePreset[];
  recruiter_notes?: Record<string, { pl: string; en: string }>;
}

/**
 * Lookup dictionary for recruiter feedback notes on individual items.
 *
 * @interface LocalNotes
 */
export interface LocalNotes {
  [key: string]: { pl: string; en: string };
}

/**
 * Lookup dictionary for bookmarked items.
 *
 * @interface LocalBookmarks
 */
export interface LocalBookmarks {
  [key: string]: boolean;
}
