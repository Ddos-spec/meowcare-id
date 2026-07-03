"use server";

import { redirect } from "next/navigation";
import { getPool, ensureAppTables } from "@/lib/db";
import { getSessionUser, deleteUserSessions } from "@/lib/auth";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") redirect("/dashboard");
  return user;
}

export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
};

export async function listUsersAction(): Promise<UserRow[]> {
  await requireAdmin();
  await ensureAppTables();
  const db = getPool();
  const result = await db.query(
    "SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC"
  );
  return result.rows as UserRow[];
}

export async function deleteUserAction(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  if (!userId || userId === admin.id) return;

  const db = getPool();
  await deleteUserSessions(userId);
  await db.query("DELETE FROM app_state WHERE user_id = $1", [userId]);
  await db.query("DELETE FROM users WHERE id = $1", [userId]);
  redirect("/admin");
}

export async function changeRoleAction(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const newRole = String(formData.get("role") ?? "");
  if (!userId || userId === admin.id) return;
  if (newRole !== "user" && newRole !== "admin") return;

  const db = getPool();
  await db.query("UPDATE users SET role = $1 WHERE id = $2", [newRole, userId]);
  redirect("/admin");
}
