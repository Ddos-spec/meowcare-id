"use client";

import { useState } from "react";
import Sidebar, { Section } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import AiCheckSection from "@/components/dashboard/sections/AiCheckSection";
import ServicesSection from "@/components/dashboard/sections/ServicesSection";
import HistorySection from "@/components/dashboard/sections/HistorySection";
import ProfileSection from "@/components/dashboard/sections/ProfileSection";
import { useMeowCareState } from "@/lib/meowcare-state";

export default function DesktopDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const app = useMeowCareState();
  const { state } = app;
  const catName = state.profile.catName || "kucingmu";

  if (!app.hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-cream px-6 text-center">
        <div className="rounded-3xl bg-white p-8 shadow-[0_18px_40px_-24px_rgba(42,33,25,0.55)]">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-500">
            <span className="font-display text-2xl font-bold">M</span>
          </div>
          <p className="font-display text-xl font-bold text-ink">Menyiapkan MeowCare</p>
          <p className="mt-1 text-sm text-ink-faint">Menghubungkan browser storage dan Postgres sync...</p>
        </div>
      </div>
    );
  }

  const headers: Record<Section, { title: string; subtitle: string }> = {
    overview: {
      title: `Halo, ${state.profile.ownerName || "Cat Parent"}! 👋`,
      subtitle: `${catName} siap dipantau hari ini`,
    },
    "ai-check": {
      title: "Triase Lokal",
      subtitle: `Triase awal untuk gejala ${catName}`,
    },
    layanan: {
      title: "Layanan & Kontak",
      subtitle: "Vet, grooming, dan cat sitter siap dihubungi",
    },
    riwayat: {
      title: "Riwayat & Pengingat",
      subtitle: `Aktivitas perawatan ${catName} tersinkron ke Postgres`,
    },
    profil: {
      title: "Profil Kucing",
      subtitle: `Data kesehatan ${catName}`,
    },
  };

  const { title, subtitle } = headers[section];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-cream">
      <Sidebar
        active={section}
        onChange={setSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        state={state}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          profile={state.profile}
          reminders={state.reminders}
          syncStatus={app.syncStatus}
        />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {section === "overview" && (
            <OverviewSection state={state} syncStatus={app.syncStatus} onNavigate={setSection} />
          )}
          {section === "ai-check" && (
            <AiCheckSection
              catName={catName}
              onNavigate={setSection}
              onSaveCheck={app.addHealthCheck}
            />
          )}
          {section === "layanan" && <ServicesSection services={state.services} />}
          {section === "riwayat" && (
            <HistorySection
              state={state}
              onAddReminder={app.addReminder}
              onToggleReminder={app.toggleReminder}
              onDeleteReminder={app.deleteReminder}
            />
          )}
          {section === "profil" && (
            <ProfileSection
              profile={state.profile}
              reminders={state.reminders}
              onUpdateProfile={app.updateProfile}
              onAddReminder={app.addReminder}
              onToggleReminder={app.toggleReminder}
              onDeleteReminder={app.deleteReminder}
            />
          )}
        </div>
      </div>
    </div>
  );
}





