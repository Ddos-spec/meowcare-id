"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  adminSessionValue,
  hasAdminTokenConfigured,
  isValidAdminToken,
} from "@/lib/auth";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function loginAction(formData: FormData) {
  const token = String(formData.get("adminToken") ?? "");
  if (!hasAdminTokenConfigured() || !isValidAdminToken(token)) {
    redirect("/dashboard?login=failed");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, adminSessionValue(), cookieOptions);
  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/dashboard");
}
