import "server-only";

import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { getPool } from "./db";

export const SESSION_COOKIE = "meowcare_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

function generateId() {
  return randomBytes(24).toString("hex");
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string): Promise<string> {
  const token = generateId();
  const hashedToken = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);
  const db = getPool();
  await db.query(
    "INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)",
    [hashedToken, userId, expiresAt]
  );
  return token;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const hashedToken = hashToken(token);
    const db = getPool();
    const result = await db.query(
      `SELECT u.id, u.email, u.name, u.role
       FROM sessions s JOIN users u ON s.user_id = u.id
       WHERE s.id = $1 AND s.expires_at > now()`,
      [hashedToken]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0] as SessionUser;
  } catch {
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  const hashedToken = hashToken(token);
  const db = getPool();
  await db.query("DELETE FROM sessions WHERE id = $1", [hashedToken]);
}

export async function deleteUserSessions(userId: string): Promise<void> {
  const db = getPool();
  await db.query("DELETE FROM sessions WHERE user_id = $1", [userId]);
}

export async function getSessionUserFromRequest(request: Request): Promise<SessionUser | null> {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
    if (!match) return null;

    const token = match[1];
    const hashedToken = hashToken(token);
    const db = getPool();
    const result = await db.query(
      `SELECT u.id, u.email, u.name, u.role
       FROM sessions s JOIN users u ON s.user_id = u.id
       WHERE s.id = $1 AND s.expires_at > now()`,
      [hashedToken]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0] as SessionUser;
  } catch {
    return null;
  }
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}
