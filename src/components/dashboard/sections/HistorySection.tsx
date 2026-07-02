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

export default function HistorySection() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
      <div className="relative space-y-5 pl-6">
        <div className="absolute top-1 bottom-1 left-[9px] w-px bg-brand-100" />
        {HISTORY.map((h) => (
          <div key={h.title + h.date} className="relative">
            <div className="absolute top-2 -left-6 h-4 w-4 rounded-full border-2 border-white bg-brand-400 shadow" />
            <div className="flex items-center justify-between gap-4 rounded-xl border border-brand-50 p-4 transition hover:border-brand-200">
              <div className="flex items-center gap-3.5">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${h.tint}`}
                >
                  <h.icon size={18} />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    {h.title}
                  </p>
                  <p className="text-[12px] text-ink-faint">{h.desc}</p>
                </div>
              </div>
              <p className="shrink-0 text-[12px] font-medium text-ink-faint">
                {h.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
