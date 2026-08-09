import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CTF_PATH = path.join(__dirname, "..", "src", "data", "ctf.json");
const DATA_PATH = path.join(__dirname, "ctf-import-data.json");

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const db = JSON.parse(fs.readFileSync(CTF_PATH, "utf-8"));
const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

// Add competitions
const compMap = {};
for (const comp of data.competitions) {
  let existing = db.competitions.find((c) => c.name === comp.name);
  if (!existing) {
    existing = {
      id: generateId(),
      name: comp.name,
      slug: comp.slug,
      description: comp.description,
      year: comp.year,
      createdAt: new Date().toISOString(),
    };
    db.competitions.push(existing);
    console.log("[COMP] " + comp.name);
  }
  compMap[comp.name] = existing;
}

// Add challenges
let added = 0;
let skipped = 0;
for (const chal of data.challenges) {
  const comp = compMap[chal.competitionName];
  if (!comp) {
    console.log("[SKIP] " + chal.title + " (comp not found)");
    skipped++;
    continue;
  }
  if (db.challenges.some((c) => c.title === chal.title && c.competitionId === comp.id)) {
    console.log("[SKIP] " + chal.title);
    skipped++;
    continue;
  }
  db.challenges.push({
    id: generateId(),
    competitionId: comp.id,
    title: chal.title,
    type: chal.type,
    difficulty: chal.difficulty,
    content: chal.content,
    flag: null,
    tags: chal.tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("[OK] " + chal.title + " (" + chal.type + ", " + chal.difficulty + ")");
  added++;
}

// Update types
const allTypes = new Set(db.types);
for (const c of db.challenges) allTypes.add(c.type);
db.types = Array.from(allTypes);

fs.writeFileSync(CTF_PATH, JSON.stringify(db, null, 2), "utf-8");

console.log("\n=== Import Complete ===");
console.log("Added: " + added + ", Skipped: " + skipped);
console.log("Total competitions: " + db.competitions.length);
console.log("Total challenges: " + db.challenges.length);
console.log("Types: " + db.types.join(", "));
