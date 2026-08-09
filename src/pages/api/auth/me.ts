import type { APIRoute } from "astro";
import { verifyToken } from "@/lib/auth";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get("token")?.value;
  const user = token ? verifyToken(token) : null;
  return new Response(JSON.stringify({ user }));
};
