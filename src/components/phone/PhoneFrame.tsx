"use client";

import { Wifi, Signal, BatteryFull } from "lucide-react";
import { ReactNode } from "react";

function StatusBar({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "text-white" : "text-ink";
  return (
    <div
      className={`status-bar-notch flex items-center justify-between px-7 pt-3 pb-1 text-[13px] font-semibold ${tone}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <BatteryFull size={16} strokeWidth={2} />
      </div>
    </div>
  );
}

export default function PhoneFrame({
  children,
  statusBarDark = false,
  className = "",
}: {
  children: ReactNode;
  statusBarDark?: boolean;
  className?: string;
}) {
  return (
    <div
      style={{
        width: "min(360px, 84vw)",
        height: "min(720px, 168vw)",
      }}
      className={`relative mx-auto shrink-0 rounded-[52px] border-[10px] border-teal-900 bg-teal-900 shadow-[0_30px_60px_-15px_rgba(26,66,62,0.45)] ${className}`}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[42px] bg-cream">
        <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-teal-900" />
        <StatusBar dark={statusBarDark} />
        <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
