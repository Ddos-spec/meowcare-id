"use client";

import { useEffect, useState } from "react";
import { Camera, BadgeCheck, Pencil, ChevronDown, Syringe, UtensilsCrossed, Save, RotateCcw } from "lucide-react";
import WeightChart from "@/components/charts/WeightChart";
import type { CatProfile, Reminder } from "@/lib/meowcare-state";
import { ageLabel, formatDate } from "@/lib/meowcare-state";

type Tab = "vaksin" | "berat" | "makanan";

export default function ProfileSection({
  profile,
  reminders,
  onUpdateProfile,
}: {
  profile: CatProfile;
  reminders: Reminder[];
  onUpdateProfile: (profile: CatProfile) => void;
  onAddReminder: (input: Omit<Reminder, "id" | "createdAt" | "done">) => void;
  onToggleReminder: (id: string) => void;
  onDeleteReminder: (id: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("vaksin");
  const [draft, setDraft] = useState<CatProfile>(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setDraft(profile));
  }, [profile]);

  function update<K extends keyof CatProfile>(key: K, value: CatProfile[K]) {
    setSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function save() {
    onUpdateProfile({ ...draft, weightKg: Number(draft.weightKg) || 0 });
    setSaved(true);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const updatedProfile = { ...draft, avatar: base64String };
      setDraft(updatedProfile);
      onUpdateProfile(updatedProfile);
    };
    reader.readAsDataURL(file);
  };

  const vaccineReminders = reminders.filter((reminder) => reminder.category === "vaksin" || reminder.category === "checkup");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <div className="h-fit rounded-2xl bg-white p-6 text-center shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
        <div className="relative mx-auto w-fit">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-brand-100 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={draft.avatar || "/mochi.svg"} alt={profile.catName} className="h-full w-full object-cover" />
          </div>
          <label className="absolute right-0 bottom-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-brand-500 shadow-md transition hover:bg-brand-600" title="Ganti foto kucing">
            <Camera size={15} className="text-white" />
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1">
          <p className="font-display text-lg font-bold text-ink">{profile.catName}</p>
          <BadgeCheck size={16} className="text-teal-500" />
        </div>
        <p className="text-[12.5px] text-ink-faint">{profile.breed} · {ageLabel(profile.birthDate)}</p>

        <div className="mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-xl border border-brand-100 px-3.5 py-2 text-xs font-semibold text-ink-soft">
          <Pencil size={13} />
          Profil tersinkron
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-brand-100 border-t border-brand-100 pt-4">
          <div>
            <p className="text-[10.5px] text-ink-faint">Berat</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">{profile.weightKg} kg</p>
          </div>
          <div>
            <p className="text-[10.5px] text-ink-faint">Steril</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">{profile.sterilized}</p>
          </div>
          <div>
            <p className="text-[10.5px] text-ink-faint">Sex</p>
            <p className="mt-0.5 text-[13px] font-bold text-ink">{profile.sex}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">Edit Profil</p>
              <p className="text-xs text-ink-faint">Perubahan otomatis dipakai di dashboard setelah disimpan.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setDraft(profile); setSaved(false); }} className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-cream px-3.5 py-2 text-xs font-semibold text-ink-soft transition hover:bg-brand-50">
                <RotateCcw size={13} /> Reset
              </button>
              <button onClick={save} className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-600">
                <Save size={13} /> {saved ? "Tersimpan" : "Simpan"}
              </button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-xs font-semibold text-ink-soft">Nama Pemilik
              <input value={draft.ownerName} onChange={(event) => update("ownerName", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Nama Kucing
              <input value={draft.catName} onChange={(event) => update("catName", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Ras
              <input value={draft.breed} onChange={(event) => update("breed", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Tanggal Lahir
              <input type="date" value={draft.birthDate} onChange={(event) => update("birthDate", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Berat (kg)
              <input type="number" step="0.1" value={draft.weightKg} onChange={(event) => update("weightKg", Number(event.target.value))} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Steril
              <select value={draft.sterilized} onChange={(event) => update("sterilized", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300">
                <option>Sudah</option>
                <option>Belum</option>
                <option>Tidak tahu</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-ink-soft">Jenis Kelamin
              <input value={draft.sex} onChange={(event) => update("sex", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="text-xs font-semibold text-ink-soft">Warna
              <input value={draft.color} onChange={(event) => update("color", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
          </div>
          <label className="mt-3 block text-xs font-semibold text-ink-soft">Catatan Kesehatan
            <textarea value={draft.notes} onChange={(event) => update("notes", event.target.value)} className="mt-1 min-h-20 w-full resize-none rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
          </label>
        </section>

        <div className="flex w-fit rounded-xl bg-white p-1 shadow-sm">
          {([
            ["vaksin", "Vaksin/Check-up"],
            ["berat", "Berat Badan"],
            ["makanan", "Makanan"],
          ] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`cursor-pointer rounded-lg px-4 py-2 text-[12.5px] font-semibold transition ${tab === key ? "bg-brand-500 text-white" : "text-ink-faint hover:text-ink-soft"}`}>{label}</button>
          ))}
        </div>

        {tab === "vaksin" && (
          <div className="space-y-2.5">
            {vaccineReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50"><Syringe size={17} className="text-teal-500" /></div>
                <div className="flex-1"><p className="text-[13.5px] font-semibold text-ink">{reminder.title}</p><p className="text-[12px] text-ink-faint">{formatDate(reminder.dueDate)}</p></div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${reminder.done ? "bg-mint-50 text-mint" : "bg-amber-50 text-amber"}`}>{reminder.done ? "Selesai" : "Aktif"}</span>
              </div>
            ))}
            {vaccineReminders.length === 0 && <p className="rounded-2xl bg-white p-5 text-sm text-ink-faint">Belum ada jadwal vaksin/check-up. Tambahkan dari menu Riwayat.</p>}
          </div>
        )}

        {tab === "makanan" && (
          <section className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
            <div className="mb-4 flex items-center gap-2 text-brand-500"><UtensilsCrossed size={17} /><p className="text-sm font-semibold text-ink">Rencana Makan</p></div>
            <label className="block text-xs font-semibold text-ink-soft">Makanan utama
              <input value={draft.food} onChange={(event) => update("food", event.target.value)} className="mt-1 w-full rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <label className="mt-3 block text-xs font-semibold text-ink-soft">Catatan porsi
              <textarea value={draft.feedingNotes} onChange={(event) => update("feedingNotes", event.target.value)} className="mt-1 min-h-24 w-full resize-none rounded-xl border border-brand-100 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-brand-300" />
            </label>
            <button onClick={save} className="mt-4 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-600">Simpan rencana makan</button>
          </section>
        )}

        <div className="rounded-2xl bg-white p-5 shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Grafik Berat Badan</p>
            <button className="flex cursor-default items-center gap-1 text-[11px] font-medium text-ink-faint">6 Bulan Terakhir<ChevronDown size={12} /></button>
          </div>
          <WeightChart height={180} />
        </div>
      </div>
    </div>
  );
}


