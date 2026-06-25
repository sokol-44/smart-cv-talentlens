/**
 * Utility module for dynamically exporting CV data into a highly structured,
 * beautifully formatted Markdown (.md) document.
 * 
 * DESIGN PATTERN: Builder Pattern & Template Method.
 * This utility uses a step-by-step document construction approach where individual 
 * sections (Header, Profile, Experience, Projects, Education, etc.) are built 
 * independently and combined into a final coherent document, ensuring clean separation 
 * of rendering concerns and high extensibility.
 * 
 * DESIGN DECISION: Separating document composition from presentation logic.
 * We maintain localized, human-readable labels for Polish (PL) and English (EN) to 
 * generate highly tailored documents according to the user's selected export language.
 */

import { CVData, Employment, Project, Education, Certificate, Skill } from "../types";
import { sanitizeFilenamePart, getFormattedCurrentDate } from "./stringUtils";

/**
 * Interface mapping localized labels for structural markdown sections.
 * Used to translate structural labels based on the chosen language.
 */
interface LocalizedLabels {
  contactInfo: string;
  professionalProfile: string;
  workExperience: string;
  projects: string;
  skills: string;
  certificates: string;
  education: string;
  additionalInfoAndHobbies: string;
  period: string;
  present: string;
  position: string;
  technologiesUsed: string;
  versions: string;
  duties: string;
  designPatterns: string;
  devMethodologies: string;
  notableFeatures: string;
  institution: string;
  duration: string;
  hours: string;
  major: string;
  degreeType: string;
  confirmation: string;
  companyLabel: string;
}

/**
 * Static dictionary of translations for the generated Markdown document.
 */
const LABEL_TRANSLATIONS: Record<"pl" | "en", LocalizedLabels> = {
  pl: {
    contactInfo: "Dane kontaktowe",
    professionalProfile: "Profil zawodowy",
    workExperience: "Doświadczenie zawodowe",
    projects: "Projekty i Realizacje",
    skills: "Umiejętności",
    certificates: "Certyfikaty i Szkolenia",
    education: "Edukacja i Wykształcenie",
    additionalInfoAndHobbies: "Dodatkowe umiejętności i Pasje",
    period: "Okres",
    present: "obecnie",
    position: "Stanowisko",
    technologiesUsed: "Wykorzystane technologie",
    versions: "Wersje",
    duties: "Główne obowiązki i zadania",
    designPatterns: "Wzorce projektowe",
    devMethodologies: "Metodologie i praktyki",
    notableFeatures: "Wyjątkowe osiągnięcia / Funkcje",
    institution: "Instytucja",
    duration: "Czas trwania",
    hours: "godz.",
    major: "Kierunek",
    degreeType: "Rodzaj studiów",
    confirmation: "Uzyskane potwierdzenie",
    companyLabel: "Firma / Klient",
  },
  en: {
    contactInfo: "Contact Information",
    professionalProfile: "Professional Profile",
    workExperience: "Professional Experience",
    projects: "Projects & Implementations",
    skills: "Skills",
    certificates: "Certificates & Training",
    education: "Education & Qualifications",
    additionalInfoAndHobbies: "Additional Skills & Passions",
    period: "Period",
    present: "present",
    position: "Position",
    technologiesUsed: "Technologies used",
    versions: "Versions",
    duties: "Key duties & tasks",
    designPatterns: "Design patterns",
    devMethodologies: "Methodologies & practices",
    notableFeatures: "Notable features / Achievements",
    institution: "Institution",
    duration: "Duration",
    hours: "hrs.",
    major: "Major",
    degreeType: "Degree type",
    confirmation: "Obtained confirmation",
    companyLabel: "Company / Client",
  }
};

/**
 * Formats a single DatePeriod to a readable string based on selected language.
 * 
 * @param {object} date - The date range object.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Formatted date range string (e.g. "06.2023 - obecnie" or "06.2023 - present").
 */
const formatDateRange = (date: { start: string; end: string }, lang: "pl" | "en"): string => {
  const presentText = LABEL_TRANSLATIONS[lang].present;
  const start = date.start || "";
  let end = date.end || "";
  
  // IF: Check if the end date represents the present active position
  if (end.toLowerCase() === "obecnie" || end.toLowerCase() === "present" || !end) {
    end = presentText;
  } // END IF
  
  return `${start} - ${end}`;
};

/**
 * Safely extracts positions that may be represented in multiple forms (string, array, bilingual object).
 * 
 * @param {any} position - Position field from CV data.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Plain text position name.
 */
const formatPosition = (position: any, lang: "pl" | "en"): string => {
  // IF: Check if position is a primitive string
  if (typeof position === "string") {
    return position;
  } // ELSE IF: Check if position is an array of strings
  else if (Array.isArray(position)) {
    return position.join(", ");
  } // ELSE IF: Check if position is a localized object
  else if (position && typeof position === "object") {
    return position[lang] || position["pl"] || position["en"] || "";
  } // END IF
  return "";
};

/**
 * Builds the Markdown representation of the candidate's personal and contact info.
 * 
 * @param {Person} person - Person data.
 * @param {LocalizedLabels} labels - Selected language labels.
 * @param {"pl" | "en"} lang - Chosen language.
 * @returns {string} Markdown section.
 */
const buildHeaderSection = (person: any, labels: LocalizedLabels, lang: "pl" | "en"): string => {
  const titleText = person.title ? (person.title[lang] || person.title["pl"] || "") : "";
  let md = `# ${person.firstName} ${person.lastName}\n`;
  
  if (titleText) {
    md += `### ${titleText}\n\n`;
  } else {
    md += `\n`;
  }

  md += `## ${labels.contactInfo}\n`;
  
  // IF: Append contact options if they exist
  if (person.email) {
    md += `- **Email**: [${person.email}](mailto:${person.email})\n`;
  }
  if (person.tel) {
    md += `- **Telefon / Phone**: ${person.tel}\n`;
  }
  if (person.portfolio) {
    md += `- **Portfolio**: [${person.portfolio}](${person.portfolio})\n`;
  }
  if (person.github) {
    md += `- **GitHub**: [${person.github}](${person.github})\n`;
  }
  if (person.linkedin) {
    md += `- **LinkedIn**: [${person.linkedin}](${person.linkedin})\n`;
  } // END IF
  
  md += `\n---\n\n`;
  return md;
};

/**
 * Builds the professional summary/profile biography section.
 * 
 * @param {string[]} descriptionList - List of description paragraphs.
 * @param {LocalizedLabels} labels - Localized labels.
 * @returns {string} Markdown section.
 */
const buildProfileSection = (descriptionList: string[], labels: LocalizedLabels): string => {
  // IF: Skip section if there's no biographical data
  if (!descriptionList || descriptionList.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.professionalProfile}\n\n`;
  
  // LOOP: Append description paragraphs with high-contrast readable separation
  descriptionList.forEach((para) => {
    md += `${para}\n\n`;
  }); // END LOOP
  
  md += `---\n\n`;
  return md;
};

/**
 * Builds the employment/professional work experience section.
 * 
 * @param {Employment[]} employmentList - List of jobs.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Markdown section.
 */
const buildExperienceSection = (employmentList: Employment[], labels: LocalizedLabels, lang: "pl" | "en"): string => {
  // IF: Skip section if there are no experience entries
  if (!employmentList || employmentList.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.workExperience}\n\n`;
  
  // LOOP: Build each job card layout in Markdown
  employmentList.forEach((job) => {
    const formattedDate = formatDateRange(job.date, lang);
    const formattedPos = formatPosition(job.position, lang);
    const descText = job.description ? (job.description[lang] || job.description["pl"] || "") : "";
    
    md += `### ${job.company}\n`;
    md += `- **${labels.position}**: *${formattedPos}*\n`;
    md += `- **${labels.period}**: ${formattedDate}\n`;
    
    // IF: Render main projects completed if available
    if (job.mainProjects && job.mainProjects.length > 0) {
      const projectsLabel = lang === "pl" ? "Realizowane projekty" : "Completed projects";
      md += `- **${projectsLabel}**: ${job.mainProjects.join(", ")}\n`;
    }
    
    md += `\n`;
    
    if (descText) {
      md += `${descText}\n\n`;
    }
    
    // IF: Render key duties list if available - handle both array and localized object structures
    let dutiesList: string[] = [];
    if (job.duties) {
      if (Array.isArray(job.duties)) {
        dutiesList = job.duties;
      } else if (typeof job.duties === "object") {
        dutiesList = job.duties[lang] || job.duties["pl"] || job.duties["en"] || [];
      }
    }

    if (dutiesList && dutiesList.length > 0) {
      md += `#### ${labels.duties}:\n`;
      dutiesList.forEach((duty) => {
        md += `- ${duty}\n`;
      });
      md += `\n`;
    } // END IF
    
    // IF: Render technologies with versions
    if (job.technologies && job.technologies.length > 0) {
      md += `#### ${labels.technologiesUsed}:\n`;
      const techStrings = job.technologies.map((tech) => {
        const versions = job.versions?.[tech];
        // IF: Append version tags inline if specified
        if (versions && versions.length > 0) {
          return `${tech} (${versions.join(", ")})`;
        } // END IF
        return tech;
      });
      md += `${techStrings.join(", ")}\n\n`;
    } // END IF

    // IF: Render design patterns and dev methodologies used
    if (job.designPatterns && job.designPatterns.length > 0) {
      md += `- **${labels.designPatterns}**: ${job.designPatterns.join(", ")}\n`;
    }
    if (job.devMethodologies && job.devMethodologies.length > 0) {
      md += `- **${labels.devMethodologies}**: ${job.devMethodologies.join(", ")}\n`;
    } // END IF
    
    md += `\n`;
  }); // END LOOP
  
  md += `---\n\n`;
  return md;
};

/**
 * Builds the dynamic projects section.
 * 
 * @param {Project[]} projects - List of engineering projects.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Markdown section.
 */
const buildProjectsSection = (projects: Project[], labels: LocalizedLabels, lang: "pl" | "en"): string => {
  // IF: Skip section if no projects exist
  if (!projects || projects.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.projects}\n\n`;

  // LOOP: Construct Markdown representation for each project
  projects.forEach((proj) => {
    const formattedDate = formatDateRange(proj.date, lang);
    const descText = proj.description ? (proj.description[lang] || proj.description["pl"] || "") : "";
    const companyText = proj.company && proj.company.length > 0 ? proj.company.join(", ") : "";
    
    md += `### ${proj.name}\n`;
    if (companyText) {
      md += `- **${labels.companyLabel}**: ${companyText}\n`;
    }
    md += `- **${labels.period}**: ${formattedDate}\n`;
    
    if (proj.url) {
      md += `- **Link / Repository**: [${proj.url}](${proj.url})\n`;
    }
    md += `\n`;

    if (descText) {
      md += `${descText}\n\n`;
    }

    // IF: Notable Features check - handle both array and localized object structures
    let features: string[] = [];
    if (proj.notableFeatures) {
      if (Array.isArray(proj.notableFeatures)) {
        features = proj.notableFeatures;
      } else if (typeof proj.notableFeatures === "object") {
        features = proj.notableFeatures[lang] || proj.notableFeatures["pl"] || proj.notableFeatures["en"] || [];
      }
    }

    if (features && features.length > 0) {
      md += `#### ${labels.notableFeatures}:\n`;
      features.forEach((feat) => {
        md += `- ${feat}\n`;
      });
      md += `\n`;
    } // END IF

    // IF: Technologies with versions
    if (proj.technologies && proj.technologies.length > 0) {
      md += `#### ${labels.technologiesUsed}:\n`;
      const techStrings = proj.technologies.map((tech) => {
        const versions = proj.versions?.[tech];
        if (versions && versions.length > 0) {
          return `${tech} (${versions.join(", ")})`;
        }
        return tech;
      });
      md += `${techStrings.join(", ")}\n\n`;
    } // END IF

    // IF: Design patterns
    if (proj.designPatterns && proj.designPatterns.length > 0) {
      md += `- **${labels.designPatterns}**: ${proj.designPatterns.join(", ")}\n\n`;
    } // END IF
  }); // END LOOP

  md += `---\n\n`;
  return md;
};

/**
 * Builds the Skills section structured by technical competence levels.
 * 
 * @param {Skill[]} skills - List of technology skills.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Markdown section.
 */
const buildSkillsSection = (skills: Skill[], labels: LocalizedLabels, lang: "pl" | "en"): string => {
  // IF: Skip if skills list is empty
  if (!skills || skills.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.skills}\n\n`;

  // Design Decision: Grouping skills by their proficiency level for clean table layout
  const groupedSkills: Record<string, string[]> = {};
  
  // LOOP: Populate buckets of skill proficiencies
  skills.forEach((s) => {
    let level = s.proficiencyLevel || "podstawowy";
    
    // Translate standard levels to maintain bilingual sanity
    if (lang === "en") {
      if (level === "zaawansowany") level = "Advanced / Expert";
      else if (level === "średni") level = "Intermediate";
      else if (level === "podstawowy") level = "Basic";
    } else {
      if (level === "zaawansowany") level = "Zaawansowany / Ekspert";
      else if (level === "średni") level = "Średniozaawansowany";
      else if (level === "podstawowy") level = "Podstawowy";
    } // END IF
    
    if (!groupedSkills[level]) {
      groupedSkills[level] = [];
    }
    groupedSkills[level].push(s.name);
  }); // END LOOP

  // Render grouped skills in clear bullet lists
  Object.entries(groupedSkills).forEach(([level, names]) => {
    md += `### ${level}\n`;
    md += `${names.join(", ")}\n\n`;
  });

  md += `---\n\n`;
  return md;
};

/**
 * Builds the certificates, credentials and permits section.
 * 
 * @param {Certificate[]} certs - Certifications data.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Markdown section.
 */
const buildCertificatesSection = (certs: Certificate[], labels: LocalizedLabels, lang: "pl" | "en"): string => {
  // IF: Skip if certificates list is empty
  if (!certs || certs.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.certificates}\n\n`;

  // LOOP: Add each certificate as a checklist/bullet point item
  certs.forEach((c) => {
    let durationText = "";
    if (c.durationHours) {
      durationText = ` (${labels.duration}: ${c.durationHours} ${labels.hours})`;
    }

    md += `### ${c.name}\n`;
    md += `- **${labels.institution}**: ${c.institution}\n`;
    md += `- **${labels.period}**: ${c.date}${durationText}\n`;

    // IF: Description field is simple string vs. translated object
    if (c.description) {
      let descStr = "";
      if (typeof c.description === "string") {
        descStr = c.description;
      } else {
        descStr = c.description[lang] || c.description["pl"] || "";
      }
      if (descStr) {
        md += `- **Info**: ${descStr}\n`;
      }
    } // END IF

    // IF: Technologies tags covered in certification
    if (c.technologiesAndDuties && c.technologiesAndDuties.length > 0) {
      md += `- **Tagi**: ${c.technologiesAndDuties.join(", ")}\n`;
    } // END IF

    md += `\n`;
  }); // END LOOP

  md += `---\n\n`;
  return md;
};

/**
 * Builds the academic background / education section.
 * 
 * @param {Education[]} educationList - Academic records list.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Selected language.
 * @returns {string} Markdown section.
 */
const buildEducationSection = (educationList: Education[], labels: LocalizedLabels, lang: "pl" | "en"): string => {
  // IF: Skip if education history is blank
  if (!educationList || educationList.length === 0) {
    return "";
  } // END IF

  let md = `## ${labels.education}\n\n`;

  // LOOP: Format academic entries
  educationList.forEach((edu) => {
    const formattedDate = formatDateRange(edu.date, lang);
    const descText = edu.description ? (edu.description[lang] || edu.description["pl"] || "") : "";

    md += `### ${edu.institution}\n`;
    md += `- **${labels.period}**: ${formattedDate}\n`;
    md += `- **${labels.degreeType}**: ${edu.type}\n`;
    md += `- **${labels.major}**: ${edu.major}\n`;

    if (edu.confirmation) {
      md += `- **${labels.confirmation}**: ${edu.confirmation}\n`;
    }

    if (descText) {
      md += `\n*${descText}*\n`;
    }

    md += `\n`;
  }); // END LOOP

  md += `---\n\n`;
  return md;
};

/**
 * Builds the section containing non-professional passions, interests and general remarks.
 * 
 * @param {any} cvData - Whole CV state.
 * @param {LocalizedLabels} labels - Localized labels.
 * @param {"pl" | "en"} lang - Chosen language.
 * @returns {string} Markdown section.
 */
const buildAdditionalInfoSection = (cvData: CVData, labels: LocalizedLabels, lang: "pl" | "en"): string => {
  let hasContent = false;
  let md = `## ${labels.additionalInfoAndHobbies}\n\n`;

  // IF: Render additional skills / hobbies array from data root
  if (cvData.additionalSkillsAndHobbies && cvData.additionalSkillsAndHobbies.length > 0) {
    hasContent = true;
    cvData.additionalSkillsAndHobbies.forEach((item) => {
      const val = item[lang] || item["pl"] || "";
      if (val) {
        md += `- ${val}\n`;
      }
    });
    md += `\n`;
  } // END IF

  // IF: Append person's general non-professional passion bio if defined
  if (cvData.person?.passions) {
    const passionBio = cvData.person.passions[lang] || cvData.person.passions["pl"] || "";
    if (passionBio) {
      hasContent = true;
      md += `### ${lang === "pl" ? "Zainteresowania i Pasje" : "Interests & Passions"}\n`;
      md += `${passionBio}\n\n`;
    }
  } // END IF

  // IF: Check if we actually wrote anything in this section
  if (!hasContent) {
    return "";
  } // END IF

  return md;
};

/**
 * Generates the complete Markdown string from loaded CVData.
 * 
 * @param {CVData} cvData - The complete CV database state.
 * @param {"pl" | "en"} lang - Language of the exported file.
 * @returns {string} Fully generated Markdown text.
 */
export const generateCVMarkdown = (cvData: CVData, lang: "pl" | "en" = "pl"): string => {
  // IF: Prevent crashing on null data
  if (!cvData) {
    return "";
  } // END IF

  const labels = LABEL_TRANSLATIONS[lang];
  let markdown = "";

  // BUILD PIPELINE: Execute Builder steps
  markdown += buildHeaderSection(cvData.person, labels, lang);
  
  // Extract correct description list
  const bioParas = cvData.person?.description?.[lang] || cvData.person?.description?.["pl"] || [];
  markdown += buildProfileSection(bioParas, labels);
  
  markdown += buildExperienceSection(cvData.employment, labels, lang);
  markdown += buildProjectsSection(cvData.projects, labels, lang);
  markdown += buildSkillsSection(cvData.skills, labels, lang);
  markdown += buildCertificatesSection(cvData.certificates, labels, lang);
  markdown += buildEducationSection(cvData.education, labels, lang);
  markdown += buildAdditionalInfoSection(cvData, labels, lang);

  // Footer / generation credit line
  markdown += `\n\n---\n`;
  if (lang === "pl") {
    markdown += `Projekt znajduje się pod adresem GitHub: https://github.com/sokol-44/smart-cv-talentlens\n\n`;
  } else {
    markdown += `The project is available on GitHub: https://github.com/sokol-44/smart-cv-talentlens\n\n`;
  }
  markdown += `*Generated dynamically from Interactive CV Applet on ${new Date().toLocaleDateString()}*\n`;

  return markdown;
};

/**
 * Initiates the client-side download of the dynamically generated Markdown file.
 * 
 * DESIGN DECISION: Utilizing Blob objects and ephemeral URL objects to bypass server-side
 * overhead, serving the client instantly with zero telemetry leakages.
 * 
 * @param {CVData} cvData - The current CV state.
 * @param {"pl" | "en"} lang - Chosen language.
 */
export const triggerMarkdownDownload = (cvData: CVData, lang: "pl" | "en"): void => {
  try {
    // 1. Generate structured content
    const markdownContent = generateCVMarkdown(cvData, lang);
    
    // 2. Wrap content in a robust unicode-compatible UTF-8 binary blob
    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
    
    // 3. Create a clean download anchor element
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    const cleanLastName = sanitizeFilenamePart(cvData.person?.lastName || "Sokolowski");
    const cleanFirstName = sanitizeFilenamePart(cvData.person?.firstName || "Michal");
    const today = getFormattedCurrentDate();
    
    // 4. Format download filename clearly
    link.href = url;
    link.download = `cv_${cleanFirstName}_${cleanLastName}_${lang}_${today}.md`;
    
    // 5. Inject element and programmatically trigger download event
    document.body.appendChild(link);
    link.click();
    
    // 6. Clean up temporary resources safely to prevent memory leaks
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    // CATCH: Gracefully log any client-side file-system / blob exceptions
    console.error("Failed to generate or download Markdown file:", error);
  }
};
