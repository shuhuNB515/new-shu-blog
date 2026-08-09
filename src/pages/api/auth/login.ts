import type { APIRoute } from "astro";
import { createToken, verifyLogin } from "@/lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    const user = verifyLogin(username, password);
    if (!user) {
      return new Response(JSON.stringify({ error: "用户名或密码错误" }), {
        status: 401,
      });
    }
    const token = createToken(user);
    // 手动设置 Set-Cookie 头，避免 Astro cookies.set() 在 Serverless 环境下可能不生效的问题
    const cookieStr = [
      `token=${token}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      `Max-Age=${60 * 60 * 24 * 7}`,
      import.meta.env.PROD ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");
    return new Response(JSON.stringify({ success: true, user }), {
      headers: { "Set-Cookie": cookieStr },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "请求格式错误", detail: String(e) }), {
      status: 400,
    });
  }
};
