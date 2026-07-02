import Link from "next/link";
import {
  Stethoscope,
  BellRing,
  MapPinned,
  LineChart,
  ArrowRight,
  MessageCircleHeart,
  ScanSearch,
  Sparkles,
  LayoutDashboard,
  Smartphone,
} from "lucide-react";
import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import SleepingCat from "@/components/brand/SleepingCat";
import { Paw } from "@/components/icons/Paw";
import AppPrototype from "@/components/AppPrototype";

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Triase Lokal",
    desc: "Analisis awal gejala kucing dengan sync aman",
    tint: "bg-brand-50 text-brand-500",
  },
  {
    icon: BellRing,
    title: "Pengingat Tersimpan",
    desc: "Jadwal vaksin, obat cacing, dan grooming tersinkron",
    tint: "bg-teal-50 text-teal-500",
  },
  {
    icon: MapPinned,
    title: "Layanan & Kontak",
    desc: "Daftar provider contoh dengan CTA WhatsApp",
    tint: "bg-amber-50 text-amber-500",
  },
  {
    icon: LineChart,
    title: "Cat Profile & Riwayat",
    desc: "Profil editable, riwayat check, dan catatan perawatan",
    tint: "bg-mint-50 text-mint",
  },
];

const STEPS = [
  {
    icon: MessageCircleHeart,
    title: "Ceritakan gejala",
    desc: "Ketik keluhan kucingmu, atau pilih chip gejala populer.",
  },
  {
    icon: ScanSearch,
    title: "Triase lokal berjalan",
    desc: "Rule deterministic membaca pola muntah, diare, lemas, urin, mata, dan gejala umum lain.",
  },
  {
    icon: Sparkles,
    title: "Simpan tindakan",
    desc: "Simpan hasil ke riwayat, tambah pengingat, atau kontak vet melalui WhatsApp.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(240,103,42,0.10),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(46,107,99,0.10),transparent_40%)]" />

      <header className="sticky top-0 z-30 border-b border-brand-100/70 bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <AppIcon size={36} rounded="rounded-xl" />
            <Wordmark size="text-[17px]" />
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#fitur"
              className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:block"
            >
              Fitur
            </a>
            <Link
              href="/dashboard"
              className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:block"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_-8px_rgba(240,103,42,0.55)] transition hover:bg-brand-600"
            >
              <LayoutDashboard size={15} />
              Pakai Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div className="relative">
            <Paw className="absolute -top-6 -left-2 h-8 w-8 rotate-[-16deg] text-brand-200" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
              <Sparkles size={12} />
              MVP local-first siap dipakai
            </span>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] font-bold text-ink sm:text-5xl">
              MeowCare local-first untuk{" "}
              <span className="text-brand-500">Kucing Kesayangan</span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              MeowCare ID sudah menjadi aplikasi local-first: profil kucing,
              pengingat, triase gejala lokal, riwayat, dan kontak layanan
              tersimpan local-first dan tersinkron ke Postgres production.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-10px_rgba(240,103,42,0.55)] transition hover:bg-brand-600"
              >
                Pakai Dashboard
                <ArrowRight size={16} />
              </Link>
              <a
                href="#mobile-preview"
                className="flex items-center gap-2 rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-brand-300 hover:text-ink"
              >
                <Smartphone size={16} />
                Lihat Preview Mobile
              </a>
            </div>

            <div id="fitur" className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, desc, tint }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_14px_30px_-20px_rgba(42,33,25,0.5)]"
                >
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tint}`}
                  >
                    <Icon size={19} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">
                      {title}
                    </p>
                    <p className="text-[12px] leading-snug text-ink-faint">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 hidden items-end gap-4 lg:flex">
              <SleepingCat className="h-24 w-auto" />
              <p className="max-w-[220px] pb-2 text-xs leading-relaxed text-ink-faint">
                Dirancang hangat &amp; ramah supaya urus kucing terasa lebih
                mudah, bukan merepotkan.
              </p>
            </div>
          </div>

          <div
            id="mobile-preview"
            className="relative flex flex-col items-center justify-self-center scroll-mt-24"
          >
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[60px] bg-gradient-to-br from-brand-100/60 via-transparent to-teal-100/60 blur-2xl" />
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-sm">
              <Smartphone size={12} className="text-brand-500" />
              Preview mobile pendamping (sample UI)
            </span>
            <AppPrototype />
            <p className="mt-5 max-w-[300px] text-center text-xs text-ink-faint">
              Preview mobile tetap tersedia, sedangkan dashboard adalah MVP
              local-first yang bisa dipakai untuk operasional ringan besok.
            </p>
            <Link
              href="/dashboard"
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700"
            >
              <LayoutDashboard size={13} />
              Mulai Pakai MVP →
            </Link>
          </div>
        </section>

        <section className="border-t border-brand-100/70 bg-white/50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mx-auto max-w-lg text-center">
              <span className="text-xs font-semibold tracking-wide text-brand-500 uppercase">
                Cara Kerja
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                Triase lokal dalam 3 langkah
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="relative rounded-2xl bg-white p-6 shadow-[0_14px_30px_-20px_rgba(42,33,25,0.5)]"
                >
                  <span className="absolute top-5 right-5 font-display text-3xl font-bold text-brand-50">
                    0{i + 1}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 font-display text-[15px] font-bold text-ink">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-100/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2.5">
            <AppIcon size={28} rounded="rounded-lg" />
            <Wordmark size="text-sm" />
          </div>
          <p className="text-xs text-ink-faint">
            Local-first production MVP &mdash; dibangun dengan Next.js, React,
            dan Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}




