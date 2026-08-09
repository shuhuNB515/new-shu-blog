import type { APIRoute } from "astro";
import { getBlogDB, saveBlogDB, generateId, type BlogPost } from "@/lib/db";

export const prerender = false;

// 获取所有文章
export const GET: APIRoute = async () => {
  const db = getBlogDB();
  return new Response(JSON.stringify(db.posts));
};

// 添加文章（支持 JSON 或 MD 文件上传）
export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    // MD 文件上传
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const tagsStr = formData.get("tags") as string;

    if (!title) {
      return new Response(JSON.stringify({ error: "标题不能为空" }), { status: 400 });
    }

    let content = "";
    if (file) {
      content = await file.text();
    }

    const db = getBlogDB();
    const slug = title
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || generateId();

    const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const firstLine = content.split("\n").find((l) => l.trim()) || title;

    const post: BlogPost = {
      id: generateId(),
      title,
      slug,
      content,
      excerpt: firstLine.slice(0, 200),
      tags,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.posts.unshift(post);
    saveBlogDB(db);
    return new Response(JSON.stringify(post), { status: 201 });
  }

  // JSON 方式
  const body = await request.json();
  const { title: t, content: c, tags: tg, slug: s, excerpt: e } = body;

  if (!t) {
    return new Response(JSON.stringify({ error: "标题不能为空" }), { status: 400 });
  }

  const db = getBlogDB();

  // 查找已存在的文章
  const idx = db.posts.findIndex((p) => p.id === body.id);
  const existing = idx >= 0 ? db.posts[idx] : null;

  const post: BlogPost = {
    id: body.id || generateId(),
    title: t,
    slug: s || existing?.slug || t.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase(),
    content: c || "",
    excerpt: e || existing?.excerpt || (c || t).slice(0, 200),
    tags: tg || existing?.tags || [],
    published: body.published !== undefined ? body.published : (existing?.published ?? true),
    createdAt: body.createdAt || existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (existing) db.posts[idx] = post;
  else db.posts.unshift(post);

  saveBlogDB(db);
  return new Response(JSON.stringify(post), { status: idx >= 0 ? 200 : 201 });
};

// 删除文章
export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const db = getBlogDB();
  db.posts = db.posts.filter((p) => p.id !== id);
  saveBlogDB(db);
  return new Response(JSON.stringify({ success: true }));
};
