import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "meowcare_admin";
const SESSION_CONTEXT = "meowcare-admin-session-v1";

function getAdminToken() {
  return process.env.MEOWCARE_ADMIN_TOKEN?.trim() ?? "";
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function hasAdminTokenConfigured() {
  return getAdminToken().length >= 16;
}

export function isValidAdminToken(input: string) {
  const token = getAdminToken();
  if (!token) return false;
  return safeEqual(input.trim(), token);
}

export function adminSessionValue() {
  const token = getAdminToken();
  if (!token) return "";
  return createHmac("sha256", token).update(SESSION_CONTEXT).digest("hex");
}

export function isValidAdminSession(value?: string) {
  const expected = adminSessionValue();
  if (!expected || !value) return false;
  return safeEqual(value, expected);
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}
