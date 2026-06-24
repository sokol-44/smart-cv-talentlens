/**
 * Author: Michał Sokołowski
 * Generator: Google AIStudio
 * AI/LLM Model Used: Gemini 3.5 Flash (in Google AI Studio)
 * License: AGPL v3
 */

/**
 * Represents a date range period.
 *
 * @interface DatePeriod
 * @property {string} start - Start date in format MM.YYYY.
 * @property {string} end - End date in format MM.YYYY, "obecnie" (present), or empty.
 */
export interface DatePeriod {
  start: string; // MM.YYYY
  end: string;   // MM.YYYY or "obecnie" / empty
}

/**
 * Basic personal profile details.
 *
 * @interface Person
 * @property {string} firstName - Given name.
 * @property {string} lastName - Family name.
 * @property {object} description - Bilingual brief professional overview paragraph lists.
 * @property {string} [portfolio] - URL to portfolio website.
 * @property {string} [github] - URL to GitHub profile.
 * @property {string} [linkedin] - URL to LinkedIn profile.
 * @property {string} [email] - Contact email.
 * @property {string} [tel] - Contact telephone number.
 * @property {object} passions - Bilingual non-professional passions.
 */
export interface Person {
  firstName: string;
  lastName: string;
  title?: {
    pl: string;
    en: string;
  };
  description: {
    pl: string[];
    en: string[];
  };
  portfolio?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  tel?: string;
  passions?: {
    pl: string;
    en: string;
  };
}

/**
 * An educational background item.
 *
 * @interface Education
 * @property {DatePeriod} date - Duration of study.
 * @property {string} institution - Educational institution name.
 * @property {string} type - Type of program (e.g. Inżynierskie, Studia Podyplomowe).
 * @property {string} major - Major or field of study.
 * @property {string} [confirmation] - Optional description or confirmation certificate title.
 */
export interface Education {
  date: DatePeriod;
  institution: string;
  type: string;
  major: string;
  confirmation?: string;
  description?: {
    pl: string;
    en: string;
  };
}

/**
 * Professional certification or training course completed.
 *
 * @interface Certificate
 * @property {string} id - Unique identifier.
 * @property {string} date - Completion date (MM.YYYY or YYYY).
 * @property {string} [durationHours] - Optional duration of the course in hours.
 * @property {string} institution - Issuing authority or training center.
 * @property {string} name - Title of course/certificate.
 * @property {string} [description] - Optional additional information or context.
 * @property {string[]} [technologiesAndDuties] - Tech stack tags covered in certification.
 */
export interface Certificate {
  id: string;
  date: string; // MM.YYYY or YYYY
  durationHours?: string;
  institution: string;
  name: string;
  description?: string | { pl: string; en: string };
  technologiesAndDuties?: string[];
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
 * @interface Employment
 * @property {string} id - Unique identifier.
 * @property {DatePeriod} date - Employment duration.
 * @property {string} company - Name of employer.
 * @property {string | string[] | { pl: string; en: string }} position - Role title(s) occupied.
 * @property {string[]} duties - List of key duties.
 * @property {string[]} technologies - Technologies list used in this role.
 * @property {object} description - Bilingual description of the tenure/role.
 * @property {object} duties - Bilingual key duties list.
 * @property {Record<string, string[]>} [versions] - Mapping of used technologies to their versions.
 * @property {string[]} [mainProjects] - Projects names completed during this tenure.
 * @property {string[]} [designPatterns] - Design patterns practiced in this role.
 * @property {string[]} [devMethodologies] - Development methodologies/techniques applied.
 */
export interface Employment {
  id: string;
  date: DatePeriod;
  company: string;
  position: string | string[] | { pl: string; en: string };
  description: { pl: string; en: string };
  duties: { pl: string[]; en: string[] };
  technologies: string[];
  versions?: Record<string, string[]>;
  mainProjects?: string[];
  designPatterns?: string[];
  devMethodologies?: string[];
}

/**
 * Individual software/hardware development project.
 *
 * @interface Project
 * @property {string} id - Unique identifier.
 * @property {string} name - Project name.
 * @property {string} [url] - Optional link to the project repository/live app.
 * @property {string[]} company - Associated clients or employers.
 * @property {DatePeriod} date - Project lifecycle duration.
 * @property {string} description - Detailed textual description of the project.
 * @property {string[]} technologies - Tech stack used in the project.
 * @property {Record<string, string[]>} [versions] - Mapping of specific library/framework versions.
 * @property {string[]} [designPatterns] - Design patterns used in the source code.
 * @property {string[]} [notableFeatures] - Distinctive/notable engineering achievements.
 */
export interface Project {
  id: string;
  name: string;
  url?: string;
  company: string[];
  date: DatePeriod;
  description: { pl: string; en: string };
  technologies: string[];
  versions?: Record<string, string[]>;
  designPatterns?: string[];
  notableFeatures?: { pl: string[]; en: string[] };
}

/**
 * Specific core skill with a level of expertise.
 *
 * @interface Skill
 * @property {string} name - Title of skill.
 * @property {string} proficiencyLevel - Level of competency (e.g. "zaawansowany", "średni").
 */
export interface Skill {
  name: string;
  proficiencyLevel: string; // e.g. "zaawansowany", "średni", "podstawowy"
}

/**
 * Represents a single technology item in the dictionary with its synonyms.
 *
 * @interface TechDictionaryElement
 * @property {string} name - Core technology name.
 * @property {string[]} synonyms - List of recognized synonyms or alternative names.
 */
export interface TechDictionaryElement {
  name: string;
  synonyms: string[];
}

/**
 * Dictionary of technologies categorized by their ecosystem types.
 *
 * @interface TechDictionaries
 */
export interface TechDictionaries {
  programmingLanguages: TechDictionaryElement[];
  frameworksAndLibraries: TechDictionaryElement[];
  databasesAndStorage: TechDictionaryElement[];
  cloudToolsAndPlatforms: TechDictionaryElement[];
  operatingSystemsAndAdmin: TechDictionaryElement[];
  apiProtocolsAndIntegrations: TechDictionaryElement[];
  networkAndServerServices: TechDictionaryElement[];
  otherTools: TechDictionaryElement[];
}

/**
 * Complete structure of the CV database.
 *
 * @interface CVData
 */
export interface CVData {
  person: Person;
  education: Education[];
  certificates: Certificate[];
  employment: Employment[];
  projects: Project[];
  skills: Skill[];
  additionalSkillsAndHobbies: { pl: string; en: string }[];
  techDictionaries: TechDictionaries;
  rolePresets?: RolePreset[];
  recruiterNotes?: Record<string, { pl: string; en: string }>;
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
