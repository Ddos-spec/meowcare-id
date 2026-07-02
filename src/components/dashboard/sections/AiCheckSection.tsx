"use client";

import { useState } from "react";
import {
  Search,
  Mic,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import PeekingCat from "@/components/brand/PeekingCat";
import type { Section } from "@/components/dashboard/Sidebar";

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

export default function AiCheckSection({
  onNavigate,
}: {
  onNavigate: (section: Section) => void;
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        <div className="mb-1 flex items-center gap-2 text-brand-500">
          <Stethoscope size={18} />
          <p className="text-sm font-semibold">Ceritakan gejala yang dialami kucingmu</p>
        </div>
        <p className="mb-5 text-[12.5px] text-ink-faint">
          Tuliskan keluhan Mochi, atau pilih dari gejala populer di bawah.
        </p>

        <div className="flex items-center gap-2 rounded-xl border border-brand-100 bg-cream px-4 py-3">
          <Search size={17} className="shrink-0 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="Tuliskan gejala atau keluhan..."
            className="flex-1 bg-transparent text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <Mic size={17} className="shrink-0 text-brand-500" />
        </div>

        <p className="mt-6 mb-2.5 text-xs font-semibold text-ink-faint">
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

        <button
          onClick={() => analyze()}
          disabled={!query}
          className="mt-8 w-full cursor-pointer rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Analisis Gejala
        </button>

        <div className="mt-8 flex justify-center">
          <PeekingCat className="h-28 w-auto opacity-90" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        {status === "idle" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 text-center">
            <Sparkles size={28} className="text-brand-200" />
            <p className="text-sm font-semibold text-ink-soft">
              Hasil analisis AI akan muncul di sini
            </p>
            <p className="max-w-[240px] text-xs text-ink-faint">
              Pilih gejala di sebelah kiri untuk melihat contoh hasil analisis.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3">
            <Loader2 size={26} className="animate-spin text-brand-500" />
            <p className="text-sm font-medium text-ink-soft">
              AI sedang menganalisis gejala...
            </p>
          </div>
        )}

        {status === "done" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                <Sparkles size={16} />
                Hasil Analisis AI
              </div>
              <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber">
                <AlertTriangle size={12} />
                Perlu Dipantau
              </span>
            </div>

            <h2 className="font-display text-lg font-bold text-ink">
              Gangguan Pencernaan Ringan
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              Gejala yang dialami Mochi mengarah pada gangguan pencernaan
              ringan. Pantau kondisi dan berikan makanan yang mudah dicerna.
            </p>

            <p className="mt-5 mb-2 text-sm font-semibold text-ink">
              Saran yang dapat dilakukan
            </p>
            <ul className="space-y-2">
              {TIPS.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-[13px] text-ink-soft"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-teal-50 p-4">
              <p className="text-[12.5px] leading-relaxed text-teal-700">
                Jika gejala berlanjut lebih dari 2 hari atau memburuk, segera
                konsultasikan ke dokter hewan.
              </p>
              <button
                onClick={() => onNavigate("layanan")}
                className="mt-3 cursor-pointer rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-600"
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
