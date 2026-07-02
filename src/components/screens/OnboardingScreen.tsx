"use client";

import { HeartHandshake } from "lucide-react";
import { Paw } from "@/components/icons/Paw";

export default function OnboardingScreen({
  onNext,
  onSkip,
}: {
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex h-full flex-col px-7 pb-9">
      <div className="flex justify-end pt-3">
        <button
          onClick={onSkip}
          className="cursor-pointer text-sm font-medium text-ink-faint hover:text-ink-soft"
        >
          Lewati
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="relative flex h-52 w-52 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-100 to-brand-50" />
          <Paw className="absolute top-3 left-5 h-6 w-6 rotate-[-20deg] text-brand-200" />
          <Paw className="absolute right-4 bottom-8 h-5 w-5 rotate-[16deg] text-brand-200" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_16px_32px_-12px_rgba(240,103,42,0.35)]">
            <HeartHandshake
              size={54}
              strokeWidth={1.8}
              className="text-brand-500"
            />
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h1 className="font-display text-2xl font-bold text-teal-700">
            Rawat Kucing
            <br />
            Lebih Mudah
          </h1>
          <p className="mx-auto max-w-[260px] text-sm leading-relaxed text-ink-soft">
            Mulai dari cek kesehatan, jadwal perawatan, hingga layanan
            terdekat dalam satu aplikasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-6 rounded-full bg-brand-500" />
          <span className="h-2 w-2 rounded-full bg-brand-200" />
          <span className="h-2 w-2 rounded-full bg-brand-200" />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full cursor-pointer rounded-2xl bg-brand-500 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_24px_-8px_rgba(240,103,42,0.55)] transition active:scale-[0.98] hover:bg-brand-600"
      >
        Lanjut
      </button>
    </div>
  );
}
