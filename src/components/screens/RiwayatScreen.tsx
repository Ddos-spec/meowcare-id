"use client";

import { Syringe, Stethoscope, Scissors, Sparkles } from "lucide-react";

const HISTORY = [
  {
    date: "12 Nov 2024",
    title: "Vaksin FVRCP",
    desc: "Animalia Clinic · Vaksinasi rutin",
    icon: Syringe,
    tint: "bg-teal-50 text-teal-500",
  },
  {
    date: "3 Nov 2024",
    title: "Grooming Purrfect",
    desc: "Pet Grooming Studio · Mandi & potong kuku",
    icon: Scissors,
    tint: "bg-mint-50 text-mint",
  },
  {
    date: "28 Okt 2024",
    title: "AI Cat Check",
    desc: "Gangguan pencernaan ringan · Membaik",
    icon: Sparkles,
    tint: "bg-brand-50 text-brand-500",
  },
  {
    date: "12 Okt 2024",
    title: "Konsultasi Vet",
    desc: "Animalia Clinic · Check-up berkala",
    icon: Stethoscope,
    tint: "bg-amber-50 text-amber",
  },
];

export default function RiwayatScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-3 pb-2">
        <h1 className="font-display text-[17px] font-bold text-ink">
          Riwayat
        </h1>
        <p className="text-[12px] text-ink-soft">
          Aktivitas perawatan Mochi
        </p>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
        <div className="relative mt-2 space-y-4 pl-5">
          <div className="absolute top-1 bottom-1 left-[7px] w-px bg-brand-100" />
          {HISTORY.map((h) => (
            <div key={h.title + h.date} className="relative">
              <div className="absolute top-1.5 -left-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-400 shadow" />
              <div className="rounded-2xl bg-white p-3.5 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
                <p className="mb-1.5 text-[10.5px] font-medium text-ink-faint">
                  {h.date}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${h.tint}`}
                  >
                    <h.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold text-ink">
                      {h.title}
                    </p>
                    <p className="truncate text-[11px] text-ink-faint">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
