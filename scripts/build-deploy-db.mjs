import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");
const DEPLOY_DIR = path.join(__dirname, "..", "deploy");

// Ensure deploy directory
if (!fs.existsSync(DEPLOY_DIR)) {
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });
}

// Read all data files
const dataFiles = [
  "blog.json",
  "ctf.json", 
  "users.json",
  "analytics.json",
  "visits.json",
  "pageviews.json",
];

console.log("=== Building deployment database ===\n");

// Copy data files to deploy directory
for (const file of dataFiles) {
  const srcPath = path.join(DATA_DIR, file);
  const destPath = path.join(DEPLOY_DIR, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const stats = fs.statSync(srcPath);
    console.log(`[OK] ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`[SKIP] ${file} (not found)`);
  }
}

// Create a database info file
const blogData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "blog.json"), "utf-8"));
const ctfData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "ctf.json"), "utf-8"));
const userData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "users.json"), "utf-8"));

const info = {
  exportedAt: new Date().toISOString(),
  databaseType: "JSON File-based",
  tables: {
    "blog.json": {
      description: "博客文章",
      recordCount: blogData.posts.length,
      structure: ["id", "slug", "title", "published", "updated", "description", "tags", "category", "image", "draft", "pinned", "password", "content"],
    },
    "ctf.json": {
      description: "CTF题库",
      recordCount: { competitions: ctfData.competitions.length, challenges: ctfData.challenges.length, types: ctfData.types.length },
      structure: {
        competitions: ["id", "name", "slug", "description", "year", "createdAt"],
        challenges: ["id", "competitionId", "title", "type", "difficulty", "content", "flag", "tags", "createdAt", "updatedAt"],
        types: ["string[]"],
      },
    },
    "users.json": {
      description: "用户账户",
      recordCount: userData.users.length,
      structure: ["id", "username", "passwordHash", "role", "createdAt"],
    },
    "visits.json": {
      description: "访问记录 (自动迁移自 analytics.json)",
      structure: ["id", "ip", "page", "userAgent", "timestamp"],
    },
    "pageviews.json": {
      description: "页面浏览量 (自动迁移自 analytics.json)",
      structure: "{ [page: string]: number }",
    },
  },
  deployment: {
    instructions: [
      "1. 将 deploy/ 目录下的所有 JSON 文件复制到服务器的 src/data/ 目录",
      "2. 确保 Node.js 环境已安装",
      "3. 运行 npm run build 构建项目",
      "4. 使用 npm start 或 PM2 启动服务",
    ],
  },
};

fs.writeFileSync(
  path.join(DEPLOY_DIR, "database-info.json"),
  JSON.stringify(info, null, 2),
  "utf-8"
);

console.log(`\n[OK] database-info.json`);
console.log(`\n=== Deployment database ready at: ${DEPLOY_DIR} ===`);
console.log(`\n数据统计:`);
console.log(`  博客文章: ${blogData.posts.length} 篇`);
console.log(`  CTF比赛: ${ctfData.competitions.length} 场`);
console.log(`  CTF题目: ${ctfData.challenges.length} 道`);
console.log(`  用户账户: ${userData.users.length} 个`);
