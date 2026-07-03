import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import { Paw } from "@/components/icons/Paw";
import { loginAction } from "../actions";

export const metadata: Metadata = {
  title: "Masuk — MeowCare ID",
  description: "Masuk ke dashboard MeowCare ID.",
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email atau password salah. Coba lagi.",
  missing_fields: "Email dan password harus diisi.",
  server_error: "Terjadi kesalahan server. Coba lagi nanti.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const error = params.error;
  const errorMessage = error ? ERROR_MESSAGES[error] || "Terjadi kesalahan." : null;

  return (
    <main className="relative grid min-h-screen place-items-center bg-cream px-6 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(240,103,42,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(46,107,99,0.08),transparent_50%)]" />

      <div className="w-full max-w-md">
        <div className="relative rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(42,33,25,0.65)]">
          {/* Paw decorations */}
          <Paw className="absolute -top-4 -right-3 h-7 w-7 rotate-[20deg] text-brand-200/60" />
          <Paw className="absolute -bottom-3 -left-2 h-6 w-6 rotate-[-15deg] text-teal-100" />

          {/* Header */}
          <div className="mb-7 flex items-center gap-3">
            <AppIcon size={42} rounded="rounded-2xl" />
            <div>
              <Wordmark size="text-lg" />
              <p className="mt-0.5 text-xs text-ink-faint">Masuk ke akunmu</p>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-ink">Masuk ke MeowCare</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Masukkan email dan password untuk mengakses dashboard perawatan kucing.
          </p>

          {/* Error banner */}
          {errorMessage && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Login form */}
          <form action={loginAction} className="mt-6 space-y-4">
            <label className="block text-xs font-semibold text-ink-soft">
              <span className="flex items-center gap-1.5 mb-1">
                <Mail size={13} />
                Email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-brand-100 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400"
                placeholder="nama@email.com"
              />
            </label>

            <label className="block text-xs font-semibold text-ink-soft">
              <span className="flex items-center gap-1.5 mb-1">
                <Lock size={13} />
                Password
              </span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                className="w-full rounded-2xl border border-brand-100 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400"
                placeholder="Masukkan password"
              />
            </label>

            <button className="w-full cursor-pointer rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(240,103,42,0.55)] transition hover:bg-brand-600">
              Masuk
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-ink-soft">
            Belum punya akun?{" "}
            <Link href="/signup" className="font-medium text-brand-500 transition hover:text-brand-600">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
