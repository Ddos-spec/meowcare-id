"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Pencil,
  Camera,
  BadgeCheck,
  ChevronDown,
  Syringe,
  UtensilsCrossed,
} from "lucide-react";
import WeightChart from "@/components/charts/WeightChart";

type Tab = "vaksin" | "berat" | "makanan";

const VACCINES = [
  { name: "Vaksin Rabies", date: "8 Jul 2026", status: "Akan Datang" },
  { name: "Vaksin FVRCP", date: "12 Nov 2024", status: "Selesai" },
  { name: "Vaksin FeLV", date: "12 Nov 2024", status: "Selesai" },
];

const MEALS = [
  { time: "07.00", name: "Royal Canin Persian Adult", portion: "40 gr" },
  { time: "13.00", name: "Wet Food Tuna", portion: "1 sachet" },
  { time: "19.00", name: "Royal Canin Persian Adult", portion: "40 gr" },
];

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("vaksin");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 pt-3 pb-2">
        <button
          aria-label="Kembali ke beranda preview"
          onClick={onBack}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft size={18} className="text-ink-soft" />
        </button>
        <h1 className="flex-1 text-center font-display text-[16px] font-bold text-ink">
          Profil Kucing
        </h1>
        <button aria-label="Edit profil sample" className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white shadow-sm">
          <Pencil size={15} className="text-ink-soft" />
        </button>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col items-center pt-2 pb-4">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-brand-100 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mochi.svg"
                alt="Mochi"
                className="h-full w-full object-cover"
              />
            </div>
            <button aria-label="Ganti foto sample" className="absolute right-0 bottom-0 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-brand-500 shadow-md">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <p className="font-display text-lg font-bold text-ink">Mochi</p>
            <BadgeCheck size={16} className="text-teal-500" />
          </div>
          <p className="text-[12.5px] text-ink-faint">
            Persia • 3 Tahun 4 Bulan
          </p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-brand-100 rounded-2xl bg-white py-3 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
          <div className="text-center">
            <p className="text-[10.5px] text-ink-faint">Berat</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">4.2 kg</p>
          </div>
          <div className="text-center">
            <p className="text-[10.5px] text-ink-faint">Steril</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">Sudah</p>
          </div>
          <div className="text-center">
            <p className="text-[10.5px] text-ink-faint">Ulang Tahun</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">12 Feb 2023</p>
          </div>
        </div>

        <div className="mt-5 flex rounded-xl bg-white p-1 shadow-sm">
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
              className={`flex-1 cursor-pointer rounded-lg py-2 text-[11.5px] font-semibold transition ${
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
          <div className="mt-4 space-y-2">
            {VACCINES.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-50">
                  <Syringe size={16} className="text-teal-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[12.5px] font-semibold text-ink">
                    {v.name}
                  </p>
                  <p className="text-[11px] text-ink-faint">{v.date}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
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
          <div className="mt-4 space-y-2">
            {MEALS.map((m) => (
              <div
                key={m.time}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50">
                  <UtensilsCrossed size={16} className="text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[12.5px] font-semibold text-ink">
                    {m.name}
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {m.time} · {m.portion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-ink">
              Grafik Berat Badan
            </p>
            <button className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-ink-faint">
              6 Bulan Terakhir
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="rounded-2xl bg-white p-3.5 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
            <WeightChart />
          </div>
        </div>
      </div>
    </div>
  );
}

