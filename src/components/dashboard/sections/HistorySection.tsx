"use client";

import { useState } from "react";
import { Syringe, Stethoscope, Scissors, Sparkles, Pill, Trash2, CheckCircle2, Plus } from "lucide-react";
import type { MeowCareState, ReminderCategory, Reminder } from "@/lib/meowcare-state";
import { formatDate, formatDateTime, daysUntil, severityTone } from "@/lib/meowcare-state";
import { severityLabel } from "@/lib/cat-health";

const CATEGORY_OPTIONS: { value: ReminderCategory; label: string }[] = [
  { value: "vaksin", label: "Vaksin" },
  { value: "obat", label: "Obat" },
  { value: "grooming", label: "Grooming" },
  { value: "checkup", label: "Check-up" },
  { value: "makanan", label: "Makanan" },
];

function ReminderIcon({ category }: { category: ReminderCategory }) {
  if (category === "obat") return <Pill size={18} />;
  if (category === "grooming") return <Scissors size={18} />;
  if (category === "checkup") return <Stethoscope size={18} />;
  return <Syringe size={18} />;
}

function ReminderRow({ reminder, onToggle, onDelete }: { reminder: Reminder; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  const dueIn = daysUntil(reminder.dueDate);
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-50 p-4 transition hover:border-brand-200 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3.5">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${reminder.done ? "bg-mint-50 text-mint" : "bg-teal-50 text-teal-500"}`}>
          <ReminderIcon category={reminder.category} />
        </div>
        <div>
          <p className="text-[13.5px] font-semibold text-ink">{reminder.title}</p>
          <p className="text-[12px] text-ink-faint">
            {formatDate(reminder.dueDate)} · {reminder.done ? "Selesai" : dueIn < 0 ? `Terlambat ${Math.abs(dueIn)} hari` : dueIn === 0 ? "Hari ini" : `${dueIn} hari lagi`}
          </p>
          {reminder.notes && <p className="mt-1 text-[11.5px] text-ink-faint">{reminder.notes}</p>}
        </div>
      </div>
      <div className="flex gap-2 sm:justify-end">
        <button onClick={() => onToggle(reminder.id)} className="flex cursor-pointer items-center gap-1 rounded-lg bg-mint-50 px-3 py-2 text-[11px] font-semibold text-mint transition hover:bg-mint-50/70">
          <CheckCircle2 size={13} />
          {reminder.done ? "Buka lagi" : "Selesai"}
        </button>
        <button aria-label={`Hapus ${reminder.title}`} onClick={() => onDelete(reminder.id)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg bg-brand-50 text-brand-600 transition hover:bg-brand-100">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

export default function HistorySection({
  state,
  onAddReminder,
  onToggleReminder,
  onDeleteReminder,
}: {
  state: MeowCareState;
  onAddReminder: (input: Omit<Reminder, "id" | "createdAt" | "done">) => void;
  onToggleReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ReminderCategory>("vaksin");
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  function submitReminder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !dueDate) return;
    onAddReminder({ title: title.trim(), category, dueDate, notes: notes.trim() });
    setTitle("");
    setNotes("");
  }

  const activeReminders = state.reminders.filter((reminder) => !reminder.done).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const doneReminders = state.reminders.filter((reminder) => reminder.done).sort((a, b) => b.dueDate.localeCompare(a.dueDate));

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">Pengingat Aktif</p>
              <p className="text-xs text-ink-faint">Jadwal tersimpan dan tersinkron ke Postgres.</p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-600">{activeReminders.length} aktif</span>
          </div>
          <div className="space-y-3">
            {activeReminders.map((reminder) => (
              <ReminderRow key={reminder.id} reminder={reminder} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
            ))}
            {activeReminders.length === 0 && (
              <div className="rounded-xl border border-dashed border-brand-100 p-8 text-center text-sm text-ink-faint">Tidak ada jadwal aktif. Tambahkan pengingat baru dari form di kanan.</div>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <p className="mb-4 text-sm font-semibold text-ink">Riwayat Triase Lokal</p>
          <div className="relative space-y-5 pl-6">
            <div className="absolute top-1 bottom-1 left-[9px] w-px bg-brand-100" />
            {state.healthChecks.map((record) => (
              <div key={record.id} className="relative">
                <div className="absolute top-2 -left-6 h-4 w-4 rounded-full border-2 border-white bg-brand-400 shadow" />
                <div className="rounded-xl border border-brand-50 p-4 transition hover:border-brand-200">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3.5">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-ink">{record.result.title}</p>
                        <p className="text-[12px] text-ink-faint">{formatDateTime(record.createdAt)}</p>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${severityTone(record.result.severity)}`}>{severityLabel(record.result.severity)}</span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-ink-soft">{record.input}</p>
                </div>
              </div>
            ))}
            {state.healthChecks.length === 0 && (
              <div className="rounded-xl border border-dashed border-brand-100 p-8 text-center text-sm text-ink-faint">Belum ada hasil Triase Lokal. Simpan hasil dari menu Triase Lokal.</div>
            )}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <form onSubmit={submitReminder} className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-4 flex items-center gap-2 text-brand-500">
            <Plus size={17} />
            <p className="text-sm font-semibold text-ink">Tambah Pengingat</p>
          </div>
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-ink-soft">
              Judul
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Contoh: Vaksin rabies" className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs font-semibold text-ink-soft">
                Kategori
                <select value={category} onChange={(event) => setCategory(event.target.value as ReminderCategory)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300">
                  {CATEGORY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="block text-xs font-semibold text-ink-soft">
                Tanggal
                <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
              </label>
            </div>
            <label className="block text-xs font-semibold text-ink-soft">
              Catatan
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Dosis, lokasi, atau detail lain" className="mt-1 min-h-20 w-full resize-none rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <button disabled={!title.trim()} className="w-full cursor-pointer rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40">Simpan Pengingat</button>
          </div>
        </form>

        <section className="rounded-2xl bg-white p-6 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <p className="mb-3 text-sm font-semibold text-ink">Selesai</p>
          <div className="space-y-2">
            {doneReminders.slice(0, 5).map((reminder) => (
              <ReminderRow key={reminder.id} reminder={reminder} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
            ))}
            {doneReminders.length === 0 && <p className="rounded-xl bg-cream p-4 text-xs text-ink-faint">Belum ada pengingat yang ditandai selesai.</p>}
          </div>
        </section>
      </aside>
    </div>
  );
}


