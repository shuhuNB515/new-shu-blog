import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@/lib/auth";

// 需要登录才能访问的路径
const PROTECTED_PATHS = ["/admin", "/api/auth/me", "/api/blog/posts", "/api/ctf/challenges", "/api/analytics", "/api/friends"];

// 写操作（POST/PUT/DELETE）需要登录
const WRITE_METHODS = ["POST", "PUT", "DELETE"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request, cookies } = context;
  const { pathname } = new URL(url);

  // 检查是否需要保护
  const needsAuth =
    PROTECTED_PATHS.some((p) => pathname.startsWith(p)) &&
    (pathname.startsWith("/api/") ? WRITE_METHODS.includes(request.method) : true);

  if (needsAuth) {
    const token = cookies.get("token")?.value;
    if (!token) {
      if (pathname.startsWith("/api/")) {
        return new Response(JSON.stringify({ error: "未登录" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      return context.redirect("/login/");
    }

    const user = verifyToken(token);
    if (!user) {
      if (pathname.startsWith("/api/")) {
        return new Response(JSON.stringify({ error: "登录已过期" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Clear expired cookie
      cookies.delete("token");
      return context.redirect("/login/");
    }
  }

  return next();
});
