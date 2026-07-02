"use client";

import { useState } from "react";
import {
  Camera,
  BadgeCheck,
  Pencil,
  ChevronDown,
  Syringe,
  UtensilsCrossed,
} from "lucide-react";
import WeightChart from "@/components/charts/WeightChart";

type Tab = "vaksin" | "berat" | "makanan";

const VACCINES = [
  { name: "Vaksin Rabies", date: "25 Mei 2025", status: "Akan Datang" },
  { name: "Vaksin FVRCP", date: "12 Nov 2024", status: "Selesai" },
  { name: "Vaksin FeLV", date: "12 Nov 2024", status: "Selesai" },
];

const MEALS = [
  { time: "07.00", name: "Royal Canin Persian Adult", portion: "40 gr" },
  { time: "13.00", name: "Wet Food Tuna", portion: "1 sachet" },
  { time: "19.00", name: "Royal Canin Persian Adult", portion: "40 gr" },
];

export default function ProfileSection() {
  const [tab, setTab] = useState<Tab>("vaksin");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
      <div className="h-fit rounded-2xl bg-white p-6 text-center shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        <div className="relative mx-auto w-fit">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-brand-100 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt="Mochi" className="h-full w-full object-cover" />
          </div>
          <button className="absolute right-0 bottom-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-brand-500 shadow-md">
            <Camera size={15} className="text-white" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1">
          <p className="font-display text-lg font-bold text-ink">Mochi</p>
          <BadgeCheck size={16} className="text-teal-500" />
        </div>
        <p className="text-[12.5px] text-ink-faint">Persia · 2 Tahun 3 Bulan</p>

        <button className="mx-auto mt-4 flex cursor-pointer items-center gap-1.5 rounded-xl border border-brand-100 px-3.5 py-2 text-xs font-semibold text-ink-soft transition hover:border-brand-300">
          <Pencil size={13} />
          Edit Profil
        </button>

        <div className="mt-5 grid grid-cols-3 divide-x divide-brand-100 border-t border-brand-100 pt-4">
          <div>
            <p className="text-[10.5px] text-ink-faint">Berat</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">4.2 kg</p>
          </div>
          <div>
            <p className="text-[10.5px] text-ink-faint">Steril</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">Sudah</p>
          </div>
          <div>
            <p className="text-[10.5px] text-ink-faint">Lahir</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">Feb &apos;23</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex w-fit rounded-xl bg-white p-1 shadow-sm">
          {(
            [
              ["vaksin", "Riwayat Vaksin"],
              ["berat", "Berat Badan"],
              ["makanan", "Makanan"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`cursor-pointer rounded-lg px-4 py-2 text-[12.5px] font-semibold transition ${
                tab === key
                  ? "bg-brand-500 text-white"
                  : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "vaksin" && (
          <div className="space-y-2.5">
            {VACCINES.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50">
                  <Syringe size={17} className="text-teal-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {v.name}
                  </p>
                  <p className="text-[12px] text-ink-faint">{v.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    v.status === "Selesai"
                      ? "bg-mint-50 text-mint"
                      : "bg-amber-50 text-amber"
                  }`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "makanan" && (
          <div className="space-y-2.5">
            {MEALS.map((m) => (
              <div
                key={m.time}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50">
                  <UtensilsCrossed size={17} className="text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {m.name}
                  </p>
                  <p className="text-[12px] text-ink-faint">
                    {m.time} · {m.portion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Grafik Berat Badan</p>
            <button className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-ink-faint">
              6 Bulan Terakhir
              <ChevronDown size={12} />
            </button>
          </div>
          <WeightChart height={180} />
        </div>
      </div>
    </div>
  );
}
