"use client";

import { Home, History, MapPinned, User } from "lucide-react";

export type TabKey = "home" | "riwayat" | "layanan" | "profil";

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Beranda", icon: Home },
  { key: "riwayat", label: "Riwayat", icon: History },
  { key: "layanan", label: "Layanan", icon: MapPinned },
  { key: "profil", label: "Profil", icon: User },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <nav className="flex items-center justify-around border-t border-brand-100 bg-white/95 px-2 pt-2 pb-3 backdrop-blur">
      {TABS.map(({ key, label, icon: Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex w-16 flex-col items-center gap-1 cursor-pointer"
          >
            <Icon
              size={20}
              strokeWidth={2.3}
              className={isActive ? "text-brand-500" : "text-ink-faint"}
            />
            <span
              className={`text-[10.5px] font-semibold ${
                isActive ? "text-brand-500" : "text-ink-faint"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
