import type { APIRoute } from "astro";
import { getAnalyticsDB, trackVisit } from "@/lib/db";

export const prerender = false;

// 获取统计数据
export const GET: APIRoute = async () => {
  const db = getAnalyticsDB();
  return new Response(
    JSON.stringify({
      totalVisits: db.pageViews.reduce((sum, p) => sum + p.count, 0),
      pageViews: db.pageViews,
      recentVisits: db.visits.slice(-50),
    })
  );
};

// 记录访问
export const POST: APIRoute = async ({ request }) => {
  const { path: visitPath } = await request.json();
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";
  const ua = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || "";

  trackVisit({ ip, path: visitPath || "/", userAgent: ua, referer });
  return new Response(JSON.stringify({ success: true }));
};
