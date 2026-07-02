"use client";

import {
  Scale,
  HeartPulse,
  Syringe,
  Cat,
  Stethoscope,
  CalendarDays,
  UtensilsCrossed,
  Scissors,
  Pill,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import WeightChart from "@/components/charts/WeightChart";
import type { Section } from "@/components/dashboard/Sidebar";

const STATS = [
  { label: "Berat Badan", value: "4.2 kg", delta: "+0.1 kg bulan ini", icon: Scale, tint: "bg-brand-50 text-brand-500" },
  { label: "Status Kesehatan", value: "Sehat", delta: "Terpantau baik", icon: HeartPulse, tint: "bg-mint-50 text-mint" },
  { label: "Vaksin Mendatang", value: "5 hari lagi", delta: "Vaksin Rabies", icon: Syringe, tint: "bg-teal-50 text-teal-500" },
  { label: "Kucing Terdaftar", value: "1 Kucing", delta: "Mochi · Persia", icon: Cat, tint: "bg-amber-50 text-amber-500" },
];

const QUICK_ACTIONS = [
  { key: "ai-check" as const, label: "Cek Gejala", desc: "Analisis AI", icon: Stethoscope, tint: "bg-brand-50 text-brand-500" },
  { key: "riwayat" as const, label: "Jadwal", desc: "Vaksin & obat", icon: CalendarDays, tint: "bg-teal-50 text-teal-500" },
  { key: "profil" as const, label: "Makanan", desc: "Atur porsi", icon: UtensilsCrossed, tint: "bg-amber-50 text-amber-500" },
  { key: "layanan" as const, label: "Grooming", desc: "Booking salon", icon: Scissors, tint: "bg-mint-50 text-mint" },
];

export default function OverviewSection({
  onNavigate,
}: {
  onNavigate: (section: Section) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(({ label, value, delta, icon: Icon, tint }) => (
            <div
              key={label}
              className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]"
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <p className="mt-3 text-xs text-ink-faint">{label}</p>
              <p className="mt-0.5 font-display text-lg font-bold text-ink">
                {value}
              </p>
              <p className="mt-0.5 text-[11px] text-ink-faint">{delta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <p className="mb-4 text-sm font-semibold text-ink">Aksi Cepat</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_ACTIONS.map(({ key, label, desc, icon: Icon, tint }) => (
              <button
                key={label}
                onClick={() => onNavigate(key)}
                className="flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-brand-50 p-4 text-left transition hover:border-brand-200 hover:shadow-sm"
              >
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{label}</p>
                  <p className="text-[11px] text-ink-faint">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Grafik Berat Badan</p>
            <button
              onClick={() => onNavigate("profil")}
              className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-brand-500"
            >
              Lihat detail
              <ArrowUpRight size={13} />
            </button>
          </div>
          <WeightChart height={170} />
        </div>
      </div>

      <div className="space-y-6">
        <button
          onClick={() => onNavigate("profil")}
          className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]"
        >
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt="Mochi" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-bold text-ink">Mochi</p>
            <p className="text-xs text-ink-faint">2 Tahun 3 Bulan · Persia</p>
          </div>
          <ChevronRight size={16} className="text-ink-faint" />
        </button>

        <div className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Pengingat</p>
            <button
              onClick={() => onNavigate("riwayat")}
              className="cursor-pointer text-xs font-semibold text-brand-500"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-xl bg-mint-50 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white">
                <Syringe size={16} className="text-mint" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-ink">
                  Vaksin Rabies
                </p>
                <p className="text-[11px] text-ink-soft">25 Mei 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white">
                <Pill size={16} className="text-amber" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold text-ink">
                  Obat Cacing
                </p>
                <p className="text-[11px] text-ink-soft">1 Jun 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-teal-500 p-5">
          <p className="text-sm font-bold text-white">Mochi kurang enak badan?</p>
          <p className="mt-1 text-[12px] leading-relaxed text-teal-50">
            Coba AI Cat Check untuk analisis gejala instan.
          </p>
          <button
            onClick={() => onNavigate("ai-check")}
            className="mt-3 cursor-pointer rounded-xl bg-white px-4 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-50"
          >
            Cek Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
