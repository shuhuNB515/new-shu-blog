import type { APIRoute } from "astro";
import { getFriendsDB, saveFriendsDB, generateId, type FriendLink } from "@/lib/db";

export const prerender = false;

// 获取所有友链
export const GET: APIRoute = async () => {
  const db = getFriendsDB();
  return new Response(JSON.stringify({ links: db.links }), {
    headers: { "Content-Type": "application/json" },
  });
};

// 添加/编辑友链
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, link } = body as {
      action: string;
      link: Partial<FriendLink> & { id?: string };
    };

    const db = getFriendsDB();

    if (action === "add") {
      const newLink: FriendLink = {
        id: generateId(),
        title: link.title || "",
        imgurl: link.imgurl || "",
        desc: link.desc || "",
        siteurl: link.siteurl || "",
        tags: link.tags || [],
        weight: link.weight || 0,
        enabled: true,
      };
      db.links.push(newLink);
      saveFriendsDB(db);
      return new Response(JSON.stringify({ success: true, link: newLink }));
    }

    if (action === "edit") {
      const idx = db.links.findIndex((l) => l.id === link.id);
      if (idx === -1) {
        return new Response(JSON.stringify({ error: "未找到该友链" }), { status: 404 });
      }
      db.links[idx] = { ...db.links[idx], ...link };
      saveFriendsDB(db);
      return new Response(JSON.stringify({ success: true, link: db.links[idx] }));
    }

    if (action === "toggle") {
      const idx = db.links.findIndex((l) => l.id === link.id);
      if (idx === -1) {
        return new Response(JSON.stringify({ error: "未找到该友链" }), { status: 404 });
      }
      db.links[idx].enabled = !db.links[idx].enabled;
      saveFriendsDB(db);
      return new Response(JSON.stringify({ success: true, link: db.links[idx] }));
    }

    return new Response(JSON.stringify({ error: "未知操作" }), { status: 400 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "请求格式错误", detail: String(e) }), { status: 400 });
  }
};

// 删除友链
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    const db = getFriendsDB();
    db.links = db.links.filter((l) => l.id !== id);
    saveFriendsDB(db);
    return new Response(JSON.stringify({ success: true }));
  } catch (e) {
    return new Response(JSON.stringify({ error: "请求格式错误" }), { status: 400 });
  }
};
