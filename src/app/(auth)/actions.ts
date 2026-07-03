"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { getPool, ensureAppTables } from "@/lib/db";
import { createSession, deleteSession, SESSION_COOKIE } from "@/lib/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

function generateUserId() {
  return `user_${Date.now()}_${randomBytes(6).toString("hex")}`;
}

export async function signupAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || name.length < 2) {
    redirect("/signup?error=name_too_short");
  }
  if (!email || !email.includes("@")) {
    redirect("/signup?error=invalid_email");
  }
  if (!password || password.length < 6) {
    redirect("/signup?error=password_too_short");
  }

  try {
    await ensureAppTables();
    const db = getPool();

    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      redirect("/signup?error=email_exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = generateUserId();
    await db.query(
      "INSERT INTO users (id, email, name, password_hash, role) VALUES ($1, $2, $3, $4, $5)",
      [userId, email, name, passwordHash, "user"]
    );

    const token = await createSession(userId);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, COOKIE_OPTIONS);
  } catch (error) {
    const e = error as { digest?: string; code?: string };
    if (typeof e.digest === "string" && e.digest.startsWith("NEXT_REDIRECT")) throw error;
    if (e.code === "23505") {
      redirect("/signup?error=email_exists");
    }
    redirect("/signup?error=server_error");
  }

  redirect("/dashboard");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=missing_fields");
  }

  try {
    await ensureAppTables();
    const db = getPool();

    const result = await db.query(
      "SELECT id, password_hash FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      redirect("/login?error=invalid_credentials");
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      redirect("/login?error=invalid_credentials");
    }

    const token = await createSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, COOKIE_OPTIONS);
  } catch (error) {
    const e = error as { digest?: string };
    if (typeof e.digest === "string" && e.digest.startsWith("NEXT_REDIRECT")) throw error;
    redirect("/login?error=server_error");
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await deleteSession(token).catch(() => {});
  }
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
