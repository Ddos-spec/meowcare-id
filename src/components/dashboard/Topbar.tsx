"use client";

import { Bell, Menu, CalendarClock } from "lucide-react";
import type { CatProfile, Reminder, SyncStatus } from "@/lib/meowcare-state";
import { daysUntil } from "@/lib/meowcare-state";

export default function Topbar({
  title,
  subtitle,
  onMenuClick,
  profile,
  reminders,
  syncStatus,
}: {
  title: string;
  subtitle: string;
  onMenuClick: () => void;
  profile: CatProfile;
  reminders: Reminder[];
  syncStatus: SyncStatus;
}) {
  const activeReminders = reminders.filter((reminder) => !reminder.done);
  const urgentCount = activeReminders.filter((reminder) => daysUntil(reminder.dueDate) <= 3).length;
  const syncLabel = syncStatus === "postgres" ? "Postgres sync" : syncStatus === "conflict" ? "Sync conflict" : syncStatus === "loading" ? "Menyambungkan" : "Mode lokal";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-white/70 px-4 py-4 backdrop-blur sm:px-8 sm:py-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-label="Buka menu"
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
          <CalendarClock size={15} />
          <span className="text-[13px]">
            {activeReminders.length} jadwal aktif · {syncLabel}
          </span>
        </div>
        <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-ink-soft sm:h-10 sm:w-10" title="Pengingat aktif">
          <Bell size={17} />
          {urgentCount > 0 && (
            <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-500 px-1 text-[9px] font-bold text-white">
              {urgentCount}
            </span>
          )}
        </div>
        <div className="hidden items-center gap-2.5 rounded-xl bg-cream py-1.5 pr-3.5 pl-1.5 sm:flex">
          <div className="h-8 w-8 overflow-hidden rounded-lg bg-brand-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt={profile.catName} className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-ink">{profile.ownerName || "Owner"}</p>
            <p className="text-[10.5px] text-ink-faint">Pemilik {profile.catName || "kucing"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


