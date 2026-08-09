import type { APIRoute } from "astro";
import { getCTFDB, saveCTFDB, generateId, type CTFChallenge, type CTFCompetition } from "@/lib/db";

export const prerender = false;

// 获取所有数据
export const GET: APIRoute = async () => {
  const db = getCTFDB();
  return new Response(JSON.stringify(db));
};

// 添加/编辑比赛
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { action, competition, challenge } = body;
  const db = getCTFDB();

  if (action === "addCompetition") {
    const comp: CTFCompetition = {
      id: generateId(),
      name: competition.name,
      slug: competition.name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-").toLowerCase(),
      description: competition.description || "",
      year: competition.year || new Date().getFullYear(),
      createdAt: new Date().toISOString(),
    };
    db.competitions.push(comp);
    saveCTFDB(db);
    return new Response(JSON.stringify(comp), { status: 201 });
  }

  if (action === "addChallenge") {
    const chall: CTFChallenge = {
      id: generateId(),
      competitionId: challenge.competitionId,
      title: challenge.title,
      type: challenge.type,
      difficulty: challenge.difficulty || "中等",
      content: challenge.content || "",
      flag: challenge.flag,
      tags: challenge.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.challenges.push(chall);
    saveCTFDB(db);
    return new Response(JSON.stringify(chall), { status: 201 });
  }

  if (action === "editChallenge") {
    const idx = db.challenges.findIndex((c) => c.id === challenge.id);
    if (idx < 0) {
      return new Response(JSON.stringify({ error: "题目不存在" }), { status: 404 });
    }
    db.challenges[idx] = {
      ...db.challenges[idx],
      ...challenge,
      updatedAt: new Date().toISOString(),
    };
    saveCTFDB(db);
    return new Response(JSON.stringify(db.challenges[idx]));
  }

  return new Response(JSON.stringify({ error: "未知操作" }), { status: 400 });
};

// 删除
export const DELETE: APIRoute = async ({ request }) => {
  const { action, id } = await request.json();
  const db = getCTFDB();

  if (action === "deleteChallenge") {
    db.challenges = db.challenges.filter((c) => c.id !== id);
  } else if (action === "deleteCompetition") {
    db.competitions = db.competitions.filter((c) => c.id !== id);
    db.challenges = db.challenges.filter((c) => c.competitionId !== id);
  }

  saveCTFDB(db);
  return new Response(JSON.stringify({ success: true }));
};
