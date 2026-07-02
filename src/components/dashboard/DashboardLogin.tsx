import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import { loginAction } from "@/app/dashboard/actions";
import { hasAdminTokenConfigured } from "@/lib/auth";

export default function DashboardLogin({ failed }: { failed: boolean }) {
  const configured = hasAdminTokenConfigured();

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 py-12">
      <div className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-32px_rgba(42,33,25,0.65)]">
        <div className="mb-7 flex items-center gap-3">
          <AppIcon size={42} rounded="rounded-2xl" />
          <div>
            <Wordmark size="text-lg" />
            <p className="mt-0.5 text-xs text-ink-faint">Dashboard production terkunci</p>
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-ink">Masuk Admin</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Masukkan token admin untuk membuka dashboard dan mengubah data Postgres MeowCare.
        </p>

        {!configured && (
          <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            Token admin belum dikonfigurasi di environment production.
          </div>
        )}

        {failed && (
          <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber">
            Token salah. Cek kembali token admin MeowCare.
          </div>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="username" autoComplete="username" value="meocare-admin" />
          <label className="block text-xs font-semibold text-ink-soft">
            Admin token
            <input
              name="adminToken"
              type="password"
              autoComplete="current-password"
              required
              minLength={16}
              className="mt-1 w-full rounded-2xl border border-brand-100 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-400"
              placeholder="Masukkan token admin"
            />
          </label>
          <button
            disabled={!configured}
            className="w-full cursor-pointer rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buka Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}


