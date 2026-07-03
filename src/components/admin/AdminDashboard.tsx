"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, Trash2, Users, ArrowLeft, Crown } from "lucide-react";
import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import { listUsersAction, deleteUserAction, changeRoleAction } from "@/app/admin/actions";
import type { UserRow } from "@/app/admin/actions";
import type { SessionUser } from "@/lib/auth";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdminDashboard({ currentUser }: { currentUser: SessionUser }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUsersAction()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-brand-100 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <AppIcon size={34} rounded="rounded-xl" />
            <div>
              <Wordmark size="text-[15px]" />
              <p className="text-[11px] text-ink-faint">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-cream px-3.5 py-2 sm:flex">
              <Crown size={14} className="text-brand-500" />
              <span className="text-xs font-medium text-ink-soft">{currentUser.name}</span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-faint transition hover:bg-cream hover:text-ink-soft"
            >
              <ArrowLeft size={14} />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Pengguna</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Lihat, ubah role, atau hapus akun pengguna MeowCare.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_20px_-12px_rgba(42,33,25,0.4)]">
            <Users size={16} className="text-brand-500" />
            <span className="text-sm font-semibold text-ink">{users.length}</span>
            <span className="text-sm text-ink-soft">pengguna terdaftar</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_20px_-12px_rgba(42,33,25,0.4)]">
            <Shield size={16} className="text-teal-500" />
            <span className="text-sm font-semibold text-ink">
              {users.filter((u) => u.role === "admin").length}
            </span>
            <span className="text-sm text-ink-soft">admin</span>
          </div>
        </div>

        {/* Users table */}
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-[0_14px_30px_-20px_rgba(42,33,25,0.5)]">
            <p className="text-sm text-ink-faint">Memuat data pengguna...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-[0_14px_30px_-20px_rgba(42,33,25,0.5)]">
            <p className="text-sm text-ink-faint">Belum ada pengguna.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_-20px_rgba(42,33,25,0.5)]">
            {/* Table header */}
            <div className="hidden border-b border-brand-50 bg-cream/50 px-5 py-3 sm:grid sm:grid-cols-[1fr_1fr_auto_auto_auto] sm:gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Nama</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Email</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Role</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Terdaftar</span>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Aksi</span>
            </div>

            {/* User rows */}
            {users.map((user) => {
              const isSelf = user.id === currentUser.id;
              const isAdmin = user.role === "admin";

              return (
                <div
                  key={user.id}
                  className="flex flex-col gap-3 border-b border-brand-50 px-5 py-4 last:border-b-0 sm:grid sm:grid-cols-[1fr_1fr_auto_auto_auto] sm:items-center sm:gap-4"
                >
                  {/* Name */}
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-500">
                      <span className="text-xs font-bold">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {user.name}
                        {isSelf && <span className="ml-1.5 text-[10px] text-ink-faint">(kamu)</span>}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <p className="truncate text-sm text-ink-soft">{user.email}</p>

                  {/* Role badge */}
                  <span
                    className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isAdmin
                        ? "bg-teal-50 text-teal-700"
                        : "bg-brand-50 text-brand-600"
                    }`}
                  >
                    {isAdmin ? <Shield size={11} /> : <Users size={11} />}
                    {isAdmin ? "Admin" : "User"}
                  </span>

                  {/* Created at */}
                  <p className="text-xs text-ink-faint">{formatDate(user.created_at)}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!isSelf && (
                      <>
                        <form action={changeRoleAction}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="role" value={isAdmin ? "user" : "admin"} />
                          <button
                            type="submit"
                            title={isAdmin ? "Jadikan User" : "Jadikan Admin"}
                            className="cursor-pointer rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-ink-soft transition hover:bg-teal-50 hover:text-teal-700"
                          >
                            {isAdmin ? "→ User" : "→ Admin"}
                          </button>
                        </form>
                        <form action={deleteUserAction}>
                          <input type="hidden" name="userId" value={user.id} />
                          <button
                            type="submit"
                            title="Hapus pengguna"
                            className="cursor-pointer rounded-lg p-1.5 text-ink-faint transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
