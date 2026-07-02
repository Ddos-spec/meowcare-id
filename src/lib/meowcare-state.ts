"use client";

import { useEffect, useMemo, useState } from "react";
import type { AnalysisResult, Severity } from "./cat-health";

const STORAGE_KEY = "meowcare.localfirst.v1";
const SCHEMA_VERSION = 1;

export type SyncStatus = "loading" | "postgres" | "local" | "error";

export type CatProfile = {
  ownerName: string;
  catName: string;
  breed: string;
  birthDate: string;
  sex: string;
  sterilized: string;
  weightKg: number;
  color: string;
  notes: string;
  food: string;
  feedingNotes: string;
};

export type ReminderCategory = "vaksin" | "obat" | "grooming" | "checkup" | "makanan";

export type Reminder = {
  id: string;
  title: string;
  category: ReminderCategory;
  dueDate: string;
  notes: string;
  done: boolean;
  createdAt: string;
};

export type HealthCheckRecord = {
  id: string;
  input: string;
  result: AnalysisResult;
  createdAt: string;
};

export type ServiceProvider = {
  id: string;
  category: "vet" | "grooming" | "sitter";
  name: string;
  place: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  hours: string;
  phone: string;
  address: string;
  emergency?: boolean;
};

export type MeowCareState = {
  version: number;
  profile: CatProfile;
  reminders: Reminder[];
  healthChecks: HealthCheckRecord[];
  services: ServiceProvider[];
  lastUpdatedAt: string;
};

type RemoteStateResponse = {
  ok?: boolean;
  mode?: "postgres" | "local";
  state?: Partial<MeowCareState> | null;
};

const nowIso = () => new Date().toISOString();
const newId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const defaultState: MeowCareState = {
  version: SCHEMA_VERSION,
  lastUpdatedAt: nowIso(),
  profile: {
    ownerName: "Heri",
    catName: "Mochi",
    breed: "Persia",
    birthDate: "2023-02-14",
    sex: "Betina",
    sterilized: "Sudah",
    weightKg: 4.2,
    color: "Cream putih",
    notes: "Sensitif pada perubahan makanan. Pantau pencernaan saat ganti pakan.",
    food: "Royal Canin Persian Adult + wet food tuna",
    feedingNotes: "Pagi 40 gr, siang 1 sachet wet food, malam 40 gr.",
  },
  reminders: [
    {
      id: "rem_vaksin_rabies",
      title: "Vaksin Rabies",
      category: "vaksin",
      dueDate: "2026-07-08",
      notes: "Bawa buku vaksin saat kunjungan.",
      done: false,
      createdAt: "2026-07-03T02:00:00.000Z",
    },
    {
      id: "rem_obat_cacing",
      title: "Obat Cacing",
      category: "obat",
      dueDate: "2026-07-15",
      notes: "Cek dosis sesuai berat badan terbaru.",
      done: false,
      createdAt: "2026-07-03T02:05:00.000Z",
    },
    {
      id: "rem_grooming",
      title: "Grooming bulanan",
      category: "grooming",
      dueDate: "2026-07-20",
      notes: "Mandi, potong kuku, bersihkan telinga.",
      done: false,
      createdAt: "2026-07-03T02:10:00.000Z",
    },
  ],
  healthChecks: [],
  services: [
    {
      id: "svc_vet_24",
      category: "vet",
      name: "Vet 24 Jam",
      place: "Animalia Clinic",
      rating: 4.8,
      reviews: 320,
      distanceKm: 1.2,
      hours: "Buka 24 Jam",
      phone: "6281234567890",
      address: "Jl. Kemang Raya, Jakarta Selatan",
      emergency: true,
    },
    {
      id: "svc_grooming",
      category: "grooming",
      name: "Grooming Purrfect",
      place: "Pet Grooming Studio",
      rating: 4.7,
      reviews: 189,
      distanceKm: 1.5,
      hours: "09.00-20.00",
      phone: "6281234567891",
      address: "Jl. Benda Raya, Jakarta Selatan",
    },
    {
      id: "svc_sitter",
      category: "sitter",
      name: "Cat Sitter Jakarta",
      place: "Meow Buddy",
      rating: 4.9,
      reviews: 256,
      distanceKm: 1.8,
      hours: "07.00-22.00",
      phone: "6281234567892",
      address: "Area Jakarta Selatan",
    },
  ],
};

export function normalizeState(value: Partial<MeowCareState> | null): MeowCareState {
  return {
    ...defaultState,
    ...value,
    version: SCHEMA_VERSION,
    profile: { ...defaultState.profile, ...(value?.profile ?? {}) },
    reminders: Array.isArray(value?.reminders) ? value.reminders : defaultState.reminders,
    healthChecks: Array.isArray(value?.healthChecks) ? value.healthChecks : defaultState.healthChecks,
    services: Array.isArray(value?.services) && value.services.length > 0 ? value.services : defaultState.services,
    lastUpdatedAt: value?.lastUpdatedAt ?? nowIso(),
  };
}

export function loadMeowCareState(): MeowCareState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<MeowCareState>;
    return normalizeState(parsed);
  } catch {
    return defaultState;
  }
}

export function saveMeowCareState(state: MeowCareState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage can fail in private mode; app remains usable in-memory.
  }
}

async function loadRemoteState(): Promise<{ status: SyncStatus; state: MeowCareState | null }> {
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    const payload = (await response.json()) as RemoteStateResponse;
    if (payload.ok && payload.mode === "postgres") {
      return {
        status: "postgres",
        state: payload.state ? normalizeState(payload.state) : null,
      };
    }
    return { status: "local", state: null };
  } catch {
    return { status: "error", state: null };
  }
}

async function saveRemoteState(state: MeowCareState, signal?: AbortSignal): Promise<SyncStatus> {
  try {
    const response = await fetch("/api/state", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
      signal,
    });
    if (!response.ok) return "local";
    const payload = (await response.json()) as RemoteStateResponse;
    return payload.ok && payload.mode === "postgres" ? "postgres" : "local";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return "loading";
    return "error";
  }
}

export function useMeowCareState() {
  const [state, setState] = useState<MeowCareState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const localState = loadMeowCareState();
      const remote = await loadRemoteState();
      const nextState = remote.state ?? localState;

      if (cancelled) return;
      setState(nextState);
      setSyncStatus(remote.status);
      setHydrated(true);

      if (remote.status === "postgres" && !remote.state) {
        void saveRemoteState(localState).then((status) => {
          if (!cancelled && status !== "loading") setSyncStatus(status);
        });
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveMeowCareState(state);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      void saveRemoteState(state, controller.signal).then((status) => {
        if (status !== "loading") setSyncStatus(status);
      });
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [hydrated, state]);

  const actions = useMemo(
    () => ({
      updateProfile(profile: CatProfile) {
        setState((current) => ({
          ...current,
          profile,
          lastUpdatedAt: nowIso(),
        }));
      },
      addReminder(input: Omit<Reminder, "id" | "createdAt" | "done">) {
        setState((current) => ({
          ...current,
          reminders: [
            {
              ...input,
              id: newId("rem"),
              done: false,
              createdAt: nowIso(),
            },
            ...current.reminders,
          ],
          lastUpdatedAt: nowIso(),
        }));
      },
      toggleReminder(id: string) {
        setState((current) => ({
          ...current,
          reminders: current.reminders.map((reminder) =>
            reminder.id === id ? { ...reminder, done: !reminder.done } : reminder,
          ),
          lastUpdatedAt: nowIso(),
        }));
      },
      deleteReminder(id: string) {
        setState((current) => ({
          ...current,
          reminders: current.reminders.filter((reminder) => reminder.id !== id),
          lastUpdatedAt: nowIso(),
        }));
      },
      addHealthCheck(input: string, result: AnalysisResult) {
        setState((current) => ({
          ...current,
          healthChecks: [
            { id: newId("check"), input, result, createdAt: nowIso() },
            ...current.healthChecks,
          ].slice(0, 50),
          lastUpdatedAt: nowIso(),
        }));
      },
      resetLocalData() {
        setState({ ...defaultState, lastUpdatedAt: nowIso() });
      },
    }),
    [],
  );

  return { state, hydrated, syncStatus, ...actions };
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function daysUntil(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(value);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

export function ageLabel(birthDate: string) {
  const birth = new Date(birthDate);
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  if (!Number.isFinite(months) || months < 0) return "Umur belum diisi";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years <= 0) return `${remainingMonths} bulan`;
  return `${years} tahun ${remainingMonths} bulan`;
}

export function severityTone(severity: Severity) {
  if (severity === "high") return "bg-red-50 text-red-600 border-red-100";
  if (severity === "medium") return "bg-amber-50 text-amber border-amber-100";
  return "bg-mint-50 text-mint border-mint-50";
}
