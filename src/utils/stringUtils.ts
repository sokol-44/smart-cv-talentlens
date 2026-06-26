/**
 * Removes diacritical marks (accents) from a string using the browser's built-in normalization.
 * For example: "Sokołowski" -> "Sokolowski", "Michał" -> "Michal".
 *
 * @param {string} str - The input string to remove accents from.
 * @returns {string} The normalized string without accents.
 */
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/(Ł)(ł)/g, 'Ll');
};

/**
 * Sanitizes a string for use in filenames by:
 * 1. Removing accents/diacritics
 * 2. Converting to lowercase
 * 3. Replacing whitespace and non-word characters with underscores
 *
 * @param {string} str - The input string (e.g., first name, last name, or name component).
 * @returns {string} The sanitized, safe filename part.
 */
export const sanitizeFilenamePart = (str: string): string => {
  const accentFree = removeAccents(str);
  return accentFree.toLowerCase().replace(/[\s\W]+/g, "_");
};

/**
 * Returns the current date in YYYY-MM-DD format (local timezone-safe, based on ISO string).
 *
 * @returns {string} The formatted date string (e.g., "2026-06-25").
 */
export const getFormattedCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10);
};
