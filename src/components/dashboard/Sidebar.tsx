"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Stethoscope,
  MapPinned,
  History,
  User,
  ArrowLeft,
  X,
  CalendarClock,
} from "lucide-react";
import AppIcon from "@/components/brand/AppIcon";
import Wordmark from "@/components/brand/Wordmark";
import type { MeowCareState } from "@/lib/meowcare-state";
import { daysUntil, formatDate } from "@/lib/meowcare-state";

export type Section = "overview" | "ai-check" | "layanan" | "riwayat" | "profil";

const NAV: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard },
  { key: "ai-check", label: "Triase Lokal", icon: Stethoscope },
  { key: "layanan", label: "Layanan & Kontak", icon: MapPinned },
  { key: "riwayat", label: "Riwayat", icon: History },
  { key: "profil", label: "Profil Kucing", icon: User },
];

type SidebarContentProps = {
  active: Section;
  onChange: (section: Section) => void;
  onClose: () => void;
  state: MeowCareState;
  mobile?: boolean;
};

function SidebarContent({ active, onChange, onClose, state, mobile = false }: SidebarContentProps) {
  const nextReminder = [...state.reminders]
    .filter((reminder) => !reminder.done)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  const dueIn = nextReminder ? daysUntil(nextReminder.dueDate) : null;

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <AppIcon size={34} rounded="rounded-xl" />
          <Wordmark size="text-[15px]" />
        </div>
        {mobile && (
          <button
            aria-label="Tutup menu"
            onClick={onClose}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink-faint hover:bg-brand-50"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="mt-8 flex-1 space-y-1" aria-label="Navigasi dashboard">
        {NAV.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => {
                onChange(key);
                onClose();
              }}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-500 text-white shadow-[0_10px_20px_-10px_rgba(240,103,42,0.6)]"
                  : "text-ink-soft hover:bg-brand-50 hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-3">
        {nextReminder ? (
          <button
            onClick={() => onChange("riwayat")}
            className="w-full rounded-2xl bg-teal-50 p-3.5 text-left transition hover:bg-teal-100/70"
          >
            <div className="flex items-center gap-2 text-[12px] font-semibold text-teal-700">
              <CalendarClock size={14} />
              {nextReminder.title}
            </div>
            <p className="mt-0.5 text-[11px] text-teal-600/80">
              {dueIn === null
                ? formatDate(nextReminder.dueDate)
                : dueIn < 0
                  ? `Terlambat ${Math.abs(dueIn)} hari`
                  : dueIn === 0
                    ? "Jatuh tempo hari ini"
                    : `Jatuh tempo ${dueIn} hari lagi`}
            </p>
          </button>
        ) : (
          <div className="rounded-2xl bg-mint-50 p-3.5">
            <p className="text-[12px] font-semibold text-mint">Semua pengingat beres</p>
            <p className="mt-0.5 text-[11px] text-ink-faint">Tambahkan jadwal baru di Riwayat.</p>
          </div>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-ink-faint transition hover:text-ink-soft"
        >
          <ArrowLeft size={14} />
          Kembali ke Beranda
        </Link>
      </div>
    </>
  );
}

export default function Sidebar({
  active,
  onChange,
  open,
  onClose,
  state,
}: {
  active: Section;
  onChange: (section: Section) => void;
  open: boolean;
  onClose: () => void;
  state: MeowCareState;
}) {
  return (
    <>
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-brand-100 bg-white px-4 py-5 lg:flex">
        <SidebarContent active={active} onChange={onChange} onClose={onClose} state={state} />
      </aside>

      {open && (
        <>
          <button
            aria-label="Tutup menu samping"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-brand-100 bg-white px-4 py-5 lg:hidden">
            <SidebarContent active={active} onChange={onChange} onClose={onClose} state={state} mobile />
          </aside>
        </>
      )}
    </>
  );
}
