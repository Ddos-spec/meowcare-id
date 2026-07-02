"use client";

import {
  Scale,
  HeartPulse,
  Syringe,
  Cat,
  Stethoscope,
  CalendarDays,
  UtensilsCrossed,
  Scissors,
  Pill,
  ChevronRight,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";
import WeightChart from "@/components/charts/WeightChart";
import type { Section } from "@/components/dashboard/Sidebar";
import type { MeowCareState, SyncStatus } from "@/lib/meowcare-state";
import { ageLabel, daysUntil, formatDate, severityTone } from "@/lib/meowcare-state";
import { severityLabel } from "@/lib/cat-health";

const QUICK_ACTIONS = [
  { key: "ai-check" as const, label: "Cek Gejala", desc: "Triase pintar", icon: Stethoscope, tint: "bg-brand-50 text-brand-500" },
  { key: "riwayat" as const, label: "Jadwal", desc: "Vaksin & obat", icon: CalendarDays, tint: "bg-teal-50 text-teal-500" },
  { key: "profil" as const, label: "Makanan", desc: "Atur porsi", icon: UtensilsCrossed, tint: "bg-amber-50 text-amber-500" },
  { key: "layanan" as const, label: "Grooming", desc: "Booking salon", icon: Scissors, tint: "bg-mint-50 text-mint" },
];

export default function OverviewSection({
  state,
  syncStatus,
  onNavigate,
}: {
  state: MeowCareState;
  syncStatus: SyncStatus;
  onNavigate: (section: Section) => void;
}) {
  const activeReminders = state.reminders.filter((reminder) => !reminder.done);
  const nextReminder = [...activeReminders].sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0];
  const latestCheck = state.healthChecks[0];
  const catName = state.profile.catName || "Kucing";
  const status = latestCheck?.result.severity === "high" ? "Butuh Vet" : latestCheck ? severityLabel(latestCheck.result.severity) : "Belum dicek";
  const storageLabel = syncStatus === "postgres" ? "Postgres cloud sync" : syncStatus === "conflict" ? "Sync conflict" : "Local fallback";
  const storageCopy = syncStatus === "postgres"
    ? "Data tersimpan di browser dan tersinkron ke database Postgres meocare untuk pemakaian production single-tenant."
    : syncStatus === "conflict"
      ? "Ada versi data lebih baru di server. Muat ulang dashboard sebelum menyimpan perubahan lanjutan."
      : "Data tetap tersimpan di perangkat ini; saat koneksi database tersedia, app akan sinkron otomatis ke Postgres.";

  const stats = [
    { label: "Berat Badan", value: `${state.profile.weightKg || 0} kg`, delta: state.profile.food || "Pola makan belum diisi", icon: Scale, tint: "bg-brand-50 text-brand-500" },
    { label: "Status Kesehatan", value: status, delta: latestCheck ? latestCheck.result.title : "Jalankan Triase Lokal", icon: HeartPulse, tint: latestCheck?.result.severity === "high" ? "bg-red-50 text-red-600" : "bg-mint-50 text-mint" },
    { label: "Jadwal Aktif", value: `${activeReminders.length} jadwal`, delta: nextReminder ? `${nextReminder.title} · ${formatDate(nextReminder.dueDate)}` : "Tidak ada pengingat aktif", icon: Syringe, tint: "bg-teal-50 text-teal-500" },
    { label: "Kucing Terdaftar", value: catName, delta: `${state.profile.breed} · ${ageLabel(state.profile.birthDate)}`, icon: Cat, tint: "bg-amber-50 text-amber-500" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, delta, icon: Icon, tint }) => (
            <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <p className="mt-3 text-xs text-ink-faint">{label}</p>
              <p className="mt-0.5 truncate font-display text-lg font-bold text-ink">{value}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-ink-faint">{delta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <p className="mb-4 text-sm font-semibold text-ink">Aksi Cepat</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_ACTIONS.map(({ key, label, desc, icon: Icon, tint }) => (
              <button key={label} onClick={() => onNavigate(key)} className="flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-brand-50 p-4 text-left transition hover:border-brand-200 hover:shadow-sm">
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{label}</p>
                  <p className="text-[11px] text-ink-faint">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Grafik Berat Badan</p>
            <button onClick={() => onNavigate("profil")} className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-brand-500">
              Edit profil
              <ArrowUpRight size={13} />
            </button>
          </div>
          <WeightChart height={170} />
        </div>
      </div>

      <div className="space-y-6">
        <button onClick={() => onNavigate("profil")} className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mochi.svg" alt={catName} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-bold text-ink">{catName}</p>
            <p className="text-xs text-ink-faint">{ageLabel(state.profile.birthDate)} · {state.profile.breed}</p>
          </div>
          <ChevronRight size={16} className="text-ink-faint" />
        </button>

        <div className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Pengingat Terdekat</p>
            <button onClick={() => onNavigate("riwayat")} className="cursor-pointer text-xs font-semibold text-brand-500">Kelola</button>
          </div>
          <div className="space-y-2.5">
            {activeReminders.slice(0, 3).map((reminder) => {
              const dueIn = daysUntil(reminder.dueDate);
              return (
                <div key={reminder.id} className="flex items-center gap-3 rounded-xl bg-mint-50 p-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white">
                    {reminder.category === "obat" ? <Pill size={16} className="text-mint" /> : <Syringe size={16} className="text-mint" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{reminder.title}</p>
                    <p className="text-[11px] text-ink-soft">
                      {dueIn < 0 ? `Terlambat ${Math.abs(dueIn)} hari` : dueIn === 0 ? "Hari ini" : `${dueIn} hari lagi`} · {formatDate(reminder.dueDate)}
                    </p>
                  </div>
                </div>
              );
            })}
            {activeReminders.length === 0 && (
              <div className="rounded-xl border border-dashed border-brand-100 p-4 text-center text-xs text-ink-faint">
                Belum ada pengingat aktif. Tambahkan jadwal vaksin, obat, atau grooming.
              </div>
            )}
          </div>
        </div>

        {latestCheck ? (
          <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-ink">Analisis terakhir</p>
              <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityTone(latestCheck.result.severity)}`}>
                {severityLabel(latestCheck.result.severity)}
              </span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-ink-soft">{latestCheck.result.title}</p>
            <p className="mt-1 line-clamp-3 text-[12px] leading-relaxed text-ink-faint">{latestCheck.input}</p>
            <button onClick={() => onNavigate("ai-check")} className="mt-3 rounded-xl bg-brand-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-600">
              Cek ulang
            </button>
          </div>
        ) : (
          <div className="rounded-2xl bg-teal-500 p-5">
            <p className="text-sm font-bold text-white">{catName} kurang enak badan?</p>
            <p className="mt-1 text-[12px] leading-relaxed text-teal-50">Jalankan triase awal dan simpan hasilnya ke riwayat.</p>
            <button onClick={() => onNavigate("ai-check")} className="mt-3 cursor-pointer rounded-xl bg-white px-4 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-50">
              Cek Sekarang
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-brand-100 bg-white/70 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
            <ClipboardList size={14} className="text-brand-500" />
            {storageLabel}
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-faint">
            {storageCopy}
          </p>
        </div>
      </div>
    </div>
  );
}




