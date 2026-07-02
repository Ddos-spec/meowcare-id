"use client";

import {
  Bell,
  ChevronRight,
  Stethoscope,
  CalendarDays,
  UtensilsCrossed,
  Scissors,
  ShieldCheck,
  Syringe,
  Pill,
  BadgeCheck,
} from "lucide-react";

const QUICK_ACTIONS = [
  { key: "gejala", label: "Cek Gejala", icon: Stethoscope, tint: "bg-brand-50 text-brand-500" },
  { key: "jadwal", label: "Jadwal", icon: CalendarDays, tint: "bg-teal-50 text-teal-500" },
  { key: "makanan", label: "Makanan", icon: UtensilsCrossed, tint: "bg-amber-50 text-amber-500" },
  { key: "grooming", label: "Grooming", icon: Scissors, tint: "bg-mint-50 text-mint" },
] as const;

export default function HomeScreen({
  onOpenCatCheck,
  onOpenProfile,
  onOpenServices,
}: {
  onOpenCatCheck: () => void;
  onOpenProfile: () => void;
  onOpenServices: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 px-5 pt-3 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-ink">
            Halo, Bos! 👋
          </h1>
          <p className="text-[13px] text-ink-soft">
            Semoga Mochi sehat hari ini!
          </p>
        </div>
        <button className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white shadow-sm">
          <Bell size={18} className="text-ink-soft" />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>
      </div>

      <button
        onClick={onOpenProfile}
        className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-[0_10px_30px_-18px_rgba(42,33,25,0.35)]"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mochi.svg"
            alt="Mochi"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="font-display text-[15px] font-bold text-ink">
              Mochi
            </p>
            <BadgeCheck size={15} className="text-teal-500" />
          </div>
          <p className="text-xs text-ink-faint">2 Tahun 3 Bulan • Persia</p>
          <div className="mt-1.5 flex items-center gap-4">
            <div>
              <p className="text-[10px] text-ink-faint">Berat</p>
              <p className="text-xs font-semibold text-ink">4.2 kg</p>
            </div>
            <div>
              <p className="text-[10px] text-ink-faint">Status</p>
              <p className="text-xs font-semibold text-mint">Sehat</p>
            </div>
          </div>
        </div>
        <ChevronRight size={18} className="text-ink-faint" />
      </button>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink-soft">
          Aksi Cepat
        </p>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map(({ key, label, icon: Icon, tint }) => (
            <button
              key={key}
              onClick={key === "gejala" ? onOpenCatCheck : onOpenServices}
              className="flex cursor-pointer flex-col items-center gap-2"
            >
              <div
                className={`grid h-14 w-14 place-items-center rounded-2xl ${tint}`}
              >
                <Icon size={22} strokeWidth={2} />
              </div>
              <span className="text-center text-[11px] font-medium text-ink-soft">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-soft">Pengingat</p>
          <button className="cursor-pointer text-xs font-semibold text-brand-500">
            Lihat Semua
          </button>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 rounded-2xl bg-mint-50 p-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white">
              <Syringe size={18} className="text-mint" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">
                Vaksin Rabies
              </p>
              <p className="text-[11px] text-ink-soft">
                Jatuh tempo dalam 5 hari
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-ink-faint">
                25 Mei 2025
              </p>
              <ChevronRight size={14} className="ml-auto mt-1 text-ink-faint" />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white">
              <Pill size={18} className="text-amber" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">
                Obat Cacing
              </p>
              <p className="text-[11px] text-ink-soft">
                Jatuh tempo dalam 12 hari
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-ink-faint">
                1 Jun 2025
              </p>
              <ChevronRight size={14} className="ml-auto mt-1 text-ink-faint" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-teal-200 bg-teal-50 p-3.5">
        <ShieldCheck size={20} className="shrink-0 text-teal-500" />
        <p className="text-[11.5px] leading-snug text-teal-700">
          Kucingmu terlindungi. Semua jadwal perawatan Mochi terpantau rapi.
        </p>
      </div>
    </div>
  );
}
