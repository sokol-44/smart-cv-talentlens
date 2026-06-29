import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/cv_data.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const cvData = JSON.parse(rawData);

const originalSkills = cvData.skills || [];
const techDict = cvData.techDictionaries || {};

// Helper to normalize names for comparison
function normalize(name: string): string {
  return name.toLowerCase()
    .replace(/[\u2013\u2014]/g, '-') // replace en-dash/em-dash with hyphen
    .replace(/\s+/g, ' ')
    .trim();
}

// Map of names that should match explicitly
const nameMapping: Record<string, string> = {
  'alpine linux': 'alpine',
  'alpine': 'alpine',
  'hyper-v': 'hyper-v',
  'red hat linux': 'red hat',
};

const mergedSkills: any[] = [];
const processedSkills = new Set<string>();

// Loop through the techDictionaries first to populate skills
Object.entries(techDict).forEach(([category, list]: [string, any]) => {
  list.forEach((tech: any) => {
    const techNorm = normalize(tech.name);
    
    // Find matching skill from originalSkills
    const matchingSkill = originalSkills.find((s: any) => {
      const sNorm = normalize(s.name);
      return sNorm === techNorm || 
             nameMapping[sNorm] === techNorm || 
             nameMapping[techNorm] === sNorm;
    });

    if (matchingSkill) {
      mergedSkills.push({
        name: matchingSkill.name, // keep original skill casing if possible
        skillType: category,
        proficiencyLevel: matchingSkill.proficiencyLevel,
        synonyms: tech.synonyms || []
      });
      processedSkills.add(normalize(matchingSkill.name));
    } else {
      // Tech exists in dictionary but has no skill level
      mergedSkills.push({
        name: tech.name,
        skillType: category,
        synonyms: tech.synonyms || []
      });
    }
  });
});

// Now check if there are any original skills that were not processed/matched
const remainingSkills: any[] = [];
originalSkills.forEach((s: any) => {
  const sNorm = normalize(s.name);
  
  // See if we already processed this skill
  let alreadyProcessed = false;
  processedSkills.forEach(p => {
    if (p === sNorm || nameMapping[p] === sNorm || nameMapping[sNorm] === p) {
      alreadyProcessed = true;
    }
  });

  if (!alreadyProcessed) {
    // If it's a duplicate of something we added, skip
    const isDuplicate = mergedSkills.some(m => normalize(m.name) === sNorm);
    if (!isDuplicate) {
      remainingSkills.push(s);
    }
  }
});

// Let's add unmatched skills to 'otherTools' if there are any.
remainingSkills.forEach((s: any) => {
  mergedSkills.push({
    name: s.name,
    skillType: 'otherTools',
    proficiencyLevel: s.proficiencyLevel,
    synonyms: []
  });
});

console.log(`Final processed skills count: ${mergedSkills.length}`);

// Let's save a test output first
const resultData = { ...cvData, skills: mergedSkills };
delete resultData.techDictionaries;

fs.writeFileSync(filePath, JSON.stringify(resultData, null, 2), 'utf-8');
console.log("Overwrite of src/cv_data.json complete!");
