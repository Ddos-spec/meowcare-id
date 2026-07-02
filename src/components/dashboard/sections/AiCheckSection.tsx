"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Stethoscope,
  Save,
} from "lucide-react";
import PeekingCat from "@/components/brand/PeekingCat";
import type { Section } from "@/components/dashboard/Sidebar";
import { analyzeCatSymptoms, severityLabel, type AnalysisResult } from "@/lib/cat-health";
import { severityTone } from "@/lib/meowcare-state";

const SYMPTOM_CHIPS = [
  "Tidak mau makan sejak pagi",
  "Muntah dua kali dan lemas",
  "Diare sejak kemarin",
  "Bersin dan mata berair",
  "Susah pipis dan terlihat nyeri",
  "Gatal dan bulu rontok",
];

export default function AiCheckSection({
  catName,
  onNavigate,
  onSaveCheck,
}: {
  catName: string;
  onNavigate: (section: Section) => void;
  onSaveCheck: (input: string, result: AnalysisResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [saved, setSaved] = useState(false);

  function analyze(symptom?: string) {
    const input = (symptom ?? query).trim();
    if (symptom) setQuery(symptom);
    if (!input) return;
    setStatus("loading");
    setSaved(false);
    window.setTimeout(() => {
      setResult(analyzeCatSymptoms(input));
      setStatus("done");
    }, 450);
  }

  function saveResult() {
    if (!result || !query.trim()) return;
    onSaveCheck(query.trim(), result);
    setSaved(true);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        <div className="mb-1 flex items-center gap-2 text-brand-500">
          <Stethoscope size={18} />
          <p className="text-sm font-semibold">Ceritakan gejala yang dialami {catName}</p>
        </div>
        <p className="mb-5 text-[12.5px] text-ink-faint">
          Tulis gejala, durasi, nafsu makan, minum, dan perilaku. Analisis berjalan lokal di browser dan bisa disimpan ke riwayat.
        </p>

        <label className="sr-only" htmlFor="symptom-input">Gejala kucing</label>
        <div className="flex items-start gap-2 rounded-xl border border-brand-100 bg-cream px-4 py-3">
          <Search size={17} className="mt-1 shrink-0 text-ink-faint" />
          <textarea
            id="symptom-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Contoh: Mochi muntah dua kali, lemas, masih mau minum..."
            className="min-h-24 flex-1 resize-none bg-transparent text-[13.5px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
        </div>

        <p className="mt-6 mb-2.5 text-xs font-semibold text-ink-faint">Skenario cepat</p>
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
          disabled={!query.trim() || status === "loading"}
          className="mt-8 w-full cursor-pointer rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Analisis Gejala
        </button>

        <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3 text-[11.5px] leading-relaxed text-amber">
          MeowCare membantu triase awal, bukan pengganti diagnosis dokter hewan. Untuk sesak napas, kejang, darah, atau susah pipis, segera cari vet.
        </div>

        <div className="mt-8 flex justify-center">
          <PeekingCat className="h-28 w-auto opacity-90" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        {status === "idle" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 text-center">
            <Sparkles size={28} className="text-brand-200" />
            <p className="text-sm font-semibold text-ink-soft">Hasil analisis akan muncul di sini</p>
            <p className="max-w-[260px] text-xs text-ink-faint">Pilih skenario cepat atau tulis gejala sendiri untuk mendapatkan rekomendasi awal.</p>
          </div>
        )}

        {status === "loading" && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3">
            <Loader2 size={26} className="animate-spin text-brand-500" />
            <p className="text-sm font-medium text-ink-soft">MeowCare sedang membaca pola gejala...</p>
          </div>
        )}

        {status === "done" && result && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                <Sparkles size={16} />
                Hasil Triase
              </div>
              <span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityTone(result.severity)}`}>
                <AlertTriangle size={12} />
                {severityLabel(result.severity)}
              </span>
            </div>

            <h2 className="font-display text-lg font-bold text-ink">{result.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{result.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.matchedSymptoms.map((symptom) => (
                <span key={symptom} className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-600">{symptom}</span>
              ))}
            </div>

            <p className="mt-5 mb-2 text-sm font-semibold text-ink">Saran yang dapat dilakukan</p>
            <ul className="space-y-2">
              {result.recommendations.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-[13px] text-ink-soft">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-teal-50 p-4">
              <p className="text-[12.5px] font-semibold text-teal-700">Kapan harus ke vet?</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-teal-700">{result.whenToVet}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => onNavigate("layanan")} className="cursor-pointer rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-600">
                  Cari Vet Terdekat
                </button>
                <button onClick={saveResult} disabled={saved} className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 disabled:cursor-default disabled:opacity-60">
                  <Save size={13} />
                  {saved ? "Tersimpan" : "Simpan ke Riwayat"}
                </button>
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-ink-faint">{result.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

