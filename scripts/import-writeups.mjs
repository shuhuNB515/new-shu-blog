import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CTF_PATH = path.join(__dirname, "..", "src", "data", "ctf.json");
const WRITEUPS_PATH = path.join(__dirname, "writeups-data.json");

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readCTF() {
  return JSON.parse(fs.readFileSync(CTF_PATH, "utf-8"));
}

function writeCTF(db) {
  fs.writeFileSync(CTF_PATH, JSON.stringify(db, null, 2), "utf-8");
}

const writeupsData = JSON.parse(fs.readFileSync(WRITEUPS_PATH, "utf-8"));
const db = readCTF();

// Add types
const allTypes = new Set(db.types);
for (const c of writeupsData.challenges) {
  allTypes.add(c.type);
}
db.types = Array.from(allTypes);

// Add competitions
for (const comp of writeupsData.competitions) {
  const slug = comp.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-").toLowerCase();
  const existing = db.competitions.find((c) => c.name === comp.name);
  if (!existing) {
    db.competitions.push({
      id: generateId(),
      name: comp.name,
      slug,
      description: comp.description,
      year: comp.year,
      createdAt: new Date().toISOString(),
    });
    console.log(`Added competition: ${comp.name}`);
  }
}

// Add challenges
for (const chal of writeupsData.challenges) {
  const comp = db.competitions.find((c) => c.name === chal.competitionName);
  if (!comp) {
    console.log(`Skipping ${chal.title}: competition "${chal.competitionName}" not found`);
    continue;
  }

  // Check for duplicate
  if (db.challenges.some((c) => c.title === chal.title && c.competitionId === comp.id)) {
    console.log(`Skipping duplicate: ${chal.title}`);
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
  console.log(`Added challenge: ${chal.title} (${chal.type}, ${chal.difficulty})`);
}

writeCTF(db);
console.log(`\nDone! Competitions: ${db.competitions.length}, Challenges: ${db.challenges.length}, Types: ${db.types.length}`);
