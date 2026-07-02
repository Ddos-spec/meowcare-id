"use client";

import { Search, Bell } from "lucide-react";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-brand-100 bg-white/70 px-8 py-5 backdrop-blur">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
        <p className="text-[13px] text-ink-soft">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-cream px-3.5 py-2.5 text-ink-faint md:flex">
          <Search size={15} />
          <input
            placeholder="Cari sesuatu..."
            className="w-44 bg-transparent text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <button className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-cream text-ink-soft">
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>
        <div className="flex items-center gap-2.5 rounded-xl bg-cream py-1.5 pr-3.5 pl-1.5">
          <div className="h-8 w-8 overflow-hidden rounded-lg bg-brand-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt="Mochi" className="h-full w-full object-cover" />
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-semibold text-ink">Heri</p>
            <p className="text-[10.5px] text-ink-faint">Pemilik Mochi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
