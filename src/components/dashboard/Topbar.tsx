"use client";

import { Search, Bell, Menu } from "lucide-react";

export default function Topbar({
  title,
  subtitle,
  onMenuClick,
}: {
  title: string;
  subtitle: string;
  onMenuClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-white/70 px-4 py-4 backdrop-blur sm:px-8 sm:py-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-cream text-ink-soft lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-base font-bold text-ink sm:text-xl">
            {title}
          </h1>
          <p className="truncate text-[12px] text-ink-soft sm:text-[13px]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-cream px-3.5 py-2.5 text-ink-faint md:flex">
          <Search size={15} />
          <input
            placeholder="Cari sesuatu..."
            className="w-44 bg-transparent text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <button className="relative grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-cream text-ink-soft sm:h-10 sm:w-10">
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>
        <div className="hidden items-center gap-2.5 rounded-xl bg-cream py-1.5 pr-3.5 pl-1.5 sm:flex">
          <div className="h-8 w-8 overflow-hidden rounded-lg bg-brand-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt="Mochi" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-ink">Heri</p>
            <p className="text-[10.5px] text-ink-faint">Pemilik Mochi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
