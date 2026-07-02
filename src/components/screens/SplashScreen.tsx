"use client";

import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import PeekingCat from "@/components/brand/PeekingCat";
import { Paw } from "@/components/icons/Paw";

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-between overflow-hidden px-8 pt-10 pb-9">
      <Paw className="absolute top-24 left-6 h-7 w-7 rotate-[-18deg] text-brand-200" />
      <Paw className="absolute top-44 right-8 h-5 w-5 rotate-[14deg] text-brand-200" />
      <Paw className="absolute bottom-64 left-10 h-6 w-6 rotate-[8deg] text-brand-100" />

      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <AppIcon size={92} />
        <div className="space-y-2">
          <Wordmark size="text-[26px]" />
          <p className="text-sm text-ink-soft">
            Asisten Pintar untuk
            <br />
            Kucing Kesayangan
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <PeekingCat className="h-32 w-auto" />
        <button
          onClick={onStart}
          className="w-full cursor-pointer rounded-2xl bg-brand-500 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_24px_-8px_rgba(240,103,42,0.55)] transition active:scale-[0.98] hover:bg-brand-600"
        >
          Mulai
        </button>
      </div>
    </div>
  );
}
