"use client";

import { useState } from "react";
import Sidebar, { Section } from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import AiCheckSection from "@/components/dashboard/sections/AiCheckSection";
import ServicesSection from "@/components/dashboard/sections/ServicesSection";
import HistorySection from "@/components/dashboard/sections/HistorySection";
import ProfileSection from "@/components/dashboard/sections/ProfileSection";

const HEADERS: Record<Section, { title: string; subtitle: string }> = {
  overview: { title: "Halo, Bos! 👋", subtitle: "Semoga Mochi sehat hari ini!" },
  "ai-check": { title: "AI Cat Check", subtitle: "Ceritakan gejala yang dialami Mochi" },
  layanan: { title: "Layanan Terdekat", subtitle: "Vet, grooming, dan cat sitter di sekitarmu" },
  riwayat: { title: "Riwayat", subtitle: "Aktivitas perawatan Mochi" },
  profil: { title: "Profil Kucing", subtitle: "Data & kesehatan Mochi" },
};

export default function DesktopDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { title, subtitle } = HEADERS[section];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-cream">
      <Sidebar
        active={section}
        onChange={setSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {section === "overview" && <OverviewSection onNavigate={setSection} />}
          {section === "ai-check" && <AiCheckSection onNavigate={setSection} />}
          {section === "layanan" && <ServicesSection />}
          {section === "riwayat" && <HistorySection />}
          {section === "profil" && <ProfileSection />}
        </div>
      </div>
    </div>
  );
}
