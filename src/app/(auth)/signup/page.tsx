import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import { Paw } from "@/components/icons/Paw";
import { signupAction } from "../actions";

export const metadata: Metadata = {
  title: "Daftar — MeowCare ID",
  description: "Buat akun MeowCare ID untuk mengelola perawatan kucing.",
};

const ERROR_MESSAGES: Record<string, string> = {
  email_exists: "Email ini sudah terdaftar. Coba masuk atau gunakan email lain.",
  name_too_short: "Nama minimal 2 karakter.",
  invalid_email: "Format email tidak valid.",
  password_too_short: "Password minimal 6 karakter.",
  server_error: "Terjadi kesalahan server. Coba lagi nanti.",
};

export default async function SignupPage({
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(240,103,42,0.08),transparent_50%),radial-gradient(circle_at_20%_85%,rgba(46,107,99,0.08),transparent_50%)]" />

      <div className="w-full max-w-md">
        <div className="relative rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(42,33,25,0.65)]">
          {/* Paw decorations */}
          <Paw className="absolute -top-3 -left-3 h-7 w-7 rotate-[-25deg] text-brand-200/60" />
          <Paw className="absolute -bottom-4 -right-2 h-6 w-6 rotate-[12deg] text-teal-100" />

          {/* Header */}
          <div className="mb-7 flex items-center gap-3">
            <AppIcon size={42} rounded="rounded-2xl" />
            <div>
              <Wordmark size="text-lg" />
              <p className="mt-0.5 text-xs text-ink-faint">Buat akun baru</p>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-ink">Daftar MeowCare</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Buat akun gratis untuk mulai mengelola perawatan kucing kesayanganmu.
          </p>

          {/* Error banner */}
          {errorMessage && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Signup form */}
          <form action={signupAction} className="mt-6 space-y-4">
            <label className="block text-xs font-semibold text-ink-soft">
              <span className="flex items-center gap-1.5 mb-1">
                <User size={13} />
                Nama lengkap
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                className="w-full rounded-2xl border border-brand-100 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400"
                placeholder="Nama kamu"
              />
            </label>

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
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-2xl border border-brand-100 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400"
                placeholder="Minimal 6 karakter"
              />
            </label>

            <button className="w-full cursor-pointer rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(240,103,42,0.55)] transition hover:bg-brand-600">
              Buat Akun
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-ink-soft">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-brand-500 transition hover:text-brand-600">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
