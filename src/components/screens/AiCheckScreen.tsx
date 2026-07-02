"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Info,
  Mic,
  Search,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import PeekingCat from "@/components/brand/PeekingCat";

const SYMPTOM_CHIPS = [
  "Tidak mau makan",
  "Muntah",
  "Diare",
  "Lemas",
  "Batuk / Bersin",
];

const TIPS = [
  "Berikan makanan sedikit tapi sering",
  "Pastikan ketersediaan air bersih",
  "Istirahat yang cukup",
];

export default function AiCheckScreen({
  onBack,
  onFindVet,
}: {
  onBack: () => void;
  onFindVet: () => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function analyze(symptom?: string) {
    if (symptom) setQuery(symptom);
    if (!symptom && !query) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 900);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 pt-3 pb-2">
        <button
          onClick={onBack}
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft size={18} className="text-ink-soft" />
        </button>
        <h1 className="flex-1 text-center font-display text-[16px] font-bold text-ink">
          AI Cat Check
        </h1>
        <button className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white shadow-sm">
          <Info size={16} className="text-ink-soft" />
        </button>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
        <p className="pt-2 pb-3 text-sm font-medium text-ink-soft">
          Ceritakan gejala yang dialami kucingmu
        </p>

        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
          <Search size={17} className="shrink-0 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="Tuliskan gejala atau keluhan..."
            className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <Mic size={17} className="shrink-0 text-brand-500" />
        </div>

        <p className="mt-5 mb-2.5 text-xs font-semibold text-ink-faint">
          Contoh gejala populer
        </p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOM_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => analyze(chip)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                query === chip
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-brand-100 bg-white text-ink-soft hover:border-brand-300"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {status === "loading" && (
          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-white py-8 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
            <Loader2 size={22} className="animate-spin text-brand-500" />
            <p className="text-xs font-medium text-ink-soft">
              AI sedang menganalisis gejala...
            </p>
          </div>
        )}

        {status === "done" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-500">
                  <Sparkles size={14} />
                  Hasil Analisis AI
                </div>
                <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10.5px] font-semibold text-amber">
                  <AlertTriangle size={11} />
                  Perlu Dipantau
                </span>
              </div>

              <h2 className="font-display text-[15px] font-bold text-ink">
                Gangguan Pencernaan Ringan
              </h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                Gejala yang dialami Mochi mengarah pada gangguan pencernaan
                ringan. Pantau kondisi dan berikan makanan yang mudah
                dicerna.
              </p>

              <p className="mt-4 mb-2 text-xs font-semibold text-ink">
                Saran yang dapat dilakukan
              </p>
              <ul className="space-y-1.5">
                {TIPS.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-[12.5px] text-ink-soft"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-mint"
                    />
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-end">
                <PeekingCat className="h-16 w-auto opacity-90" />
              </div>
            </div>

            <div className="rounded-2xl bg-teal-50 p-4">
              <p className="text-[12px] leading-relaxed text-teal-700">
                Jika gejala berlanjut lebih dari 2 hari atau memburuk, segera
                konsultasikan ke dokter hewan.
              </p>
              <button
                onClick={onFindVet}
                className="mt-3 w-full cursor-pointer rounded-xl bg-teal-500 py-2.5 text-[13px] font-semibold text-white transition hover:bg-teal-600"
              >
                Cari Vet Terdekat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
