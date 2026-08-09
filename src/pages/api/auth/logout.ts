import type { APIRoute } from "astro";

export const prerender = false;

export const ALL: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("token", { path: "/" });
  return redirect("/login/");
};
