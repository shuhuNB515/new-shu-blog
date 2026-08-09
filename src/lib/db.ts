import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJSON<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    writeJSON(filename, fallback);
    return fallback;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJSON<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// --- CTF Types ---
export interface CTFCompetition {
  id: string;
  name: string;
  slug: string;
  description: string;
  year: number;
  createdAt: string;
}

export interface CTFChallenge {
  id: string;
  competitionId: string;
  title: string;
  type: string;
  difficulty: "简单" | "中等" | "困难";
  content: string;
  flag?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CTFDB {
  competitions: CTFCompetition[];
  challenges: CTFChallenge[];
  types: string[];
}

// --- Blog Types ---
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface BlogDB {
  posts: BlogPost[];
}

// --- Analytics Types ---
export interface VisitRecord {
  id: string;
  ip: string;
  path: string;
  userAgent: string;
  referer: string;
  timestamp: string;
}

export interface PageViewCount {
  path: string;
  count: number;
}

export interface AnalyticsDB {
  visits: VisitRecord[];
  pageViews: PageViewCount[];
}

// --- Friends Types ---
export interface FriendLink {
  id: string;
  title: string;
  imgurl: string;
  desc: string;
  siteurl: string;
  tags: string[];
  weight: number;
  enabled: boolean;
}

export interface FriendsDB {
  links: FriendLink[];
}

// --- 内存缓存 ---
let ctfCache: CTFDB | null = null;
let blogCache: BlogDB | null = null;
let analyticsCache: AnalyticsDB | null = null;
let friendsCache: FriendsDB | null = null;
const CACHE_TTL = 60_000;

// --- CTF Database ---
export function getCTFDB(): CTFDB {
  const now = Date.now();
  if (ctfCache) return ctfCache;
  const db = readJSON<CTFDB>("ctf.json", {
    competitions: [],
    challenges: [],
    types: ["WEB", "PWN", "SRC", "逆向", "密码学", "MISC"],
  });
  ctfCache = db;
  return db;
}

export function saveCTFDB(db: CTFDB): void {
  writeJSON("ctf.json", db);
  ctfCache = db;
}

function importExistingPosts(db: BlogDB): void {
  const postsDir = path.join(process.cwd(), "src", "content", "posts");
  if (!fs.existsSync(postsDir)) return;

  const files = fs.readdirSync(postsDir);
  let imported = 0;
  for (const f of files) {
    if (!f.endsWith(".md") || f.endsWith(".sync.md")) continue;
    const filePath = path.join(postsDir, f);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const slug = data.slug || f.replace(/\.md$/, "");
      const title = data.title || slug;
      const post: BlogPost = {
        id: generateId(),
        title,
        slug,
        content: content.trim(),
        excerpt: data.description || data.excerpt || content.trim().split("\n").find((l) => l.trim())?.slice(0, 200) || "",
        tags: data.tags || [],
        published: data.published !== false && data.draft !== true,
        createdAt: data.created || data.date || new Date().toISOString(),
        updatedAt: data.updated || data.created || data.date || new Date().toISOString(),
      };
      db.posts.push(post);
      imported++;
      console.log(`[DB] 已导入文章: ${f} → ${title}`);
    } catch (e) {
      console.warn(`[DB] 导入文章失败: ${f}`, e);
    }
  }
  // 按日期倒序排列
  db.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  console.log(`[DB] 共导入 ${imported} 篇文章`);
}

// --- Blog Database ---
export function getBlogDB(): BlogDB {
  if (blogCache) return blogCache;
  const db = readJSON<BlogDB>("blog.json", { posts: [] });
  // 首次加载时自动导入 content/posts 目录下的现有文章
  if (db.posts.length === 0) {
    importExistingPosts(db);
    saveBlogDB(db);
  }
  blogCache = db;
  return db;
}

export function saveBlogDB(db: BlogDB): void {
  writeJSON("blog.json", db);
  // Also sync to content/posts as .md files
  syncBlogToMD(db);
  blogCache = db;
}

function syncBlogToMD(db: BlogDB): void {
  const postsDir = path.join(process.cwd(), "src", "content", "posts");
  ensureDir();
  // Clean old synced posts
  if (fs.existsSync(postsDir)) {
    for (const f of fs.readdirSync(postsDir)) {
      if (f.endsWith(".sync.md")) {
        fs.unlinkSync(path.join(postsDir, f));
      }
    }
  }
  // Write synced posts
  for (const post of db.posts) {
    if (!post.published) continue;
    const pubDate = new Date(post.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
    const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
published: ${pubDate}
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
description: "${post.excerpt.replace(/"/g, '\\"').replace(/\n/g, " ")}"
${post.image ? `image: "${post.image}"` : ""}
draft: false
slug: "${post.slug}"
---
`;
    // 删除旧 .sync.md 避免残留（slug 可能变更）
    const existingSyncFiles = fs.readdirSync(postsDir).filter(f => f.endsWith(".sync.md"));
    for (const f of existingSyncFiles) {
      if (f !== `${post.slug}.sync.md`) continue;
    }
    const syncPath = path.join(postsDir, `${post.slug}.sync.md`);
    // 先删除旧 sync.md
    if (fs.existsSync(syncPath)) fs.unlinkSync(syncPath);
    fs.mkdirSync(postsDir, { recursive: true });
    fs.writeFileSync(syncPath, frontmatter + "\n" + post.content, "utf-8");
    // 删除同名的原始 .md 文件，避免内容集合重复
    const origPath = path.join(postsDir, `${post.slug}.md`);
    if (fs.existsSync(origPath)) {
      fs.unlinkSync(origPath);
    }
  }
}

// --- Analytics ---
export function getAnalyticsDB(): AnalyticsDB {
  if (analyticsCache) return analyticsCache;
  const db = readJSON<AnalyticsDB>("analytics.json", {
    visits: [],
    pageViews: [],
  });
  analyticsCache = db;
  return db;
}

export function saveAnalyticsDB(db: AnalyticsDB): void {
  writeJSON("analytics.json", db);
  analyticsCache = db;
}

export function trackVisit(visit: Omit<VisitRecord, "id" | "timestamp">): void {
  const db = getAnalyticsDB();
  const record: VisitRecord = {
    ...visit,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  db.visits.push(record);
  // Keep only last 10000 visits
  if (db.visits.length > 10000) {
    db.visits = db.visits.slice(-10000);
  }
  // Update page view counter
  const pv = db.pageViews.find((p) => p.path === visit.path);
  if (pv) pv.count++;
  else db.pageViews.push({ path: visit.path, count: 1 });
  saveAnalyticsDB(db);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// --- Friends Database ---
export function getFriendsDB(): FriendsDB {
  if (friendsCache) return friendsCache;
  const db = readJSON<FriendsDB>("friends.json", { links: [] });
  friendsCache = db;
  return db;
}

export function saveFriendsDB(db: FriendsDB): void {
  writeJSON("friends.json", db);
  friendsCache = db;
}

export function clearCache(): void {
  ctfCache = null;
  blogCache = null;
  analyticsCache = null;
  friendsCache = null;
}
