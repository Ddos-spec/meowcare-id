"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import PhoneFrame from "@/components/phone/PhoneFrame";
import BottomNav, { TabKey } from "@/components/phone/BottomNav";
import SplashScreen from "@/components/screens/SplashScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import AiCheckScreen from "@/components/screens/AiCheckScreen";
import ServicesScreen from "@/components/screens/ServicesScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import RiwayatScreen from "@/components/screens/RiwayatScreen";

type Route = "splash" | "onboarding" | "app";

const JUMP_LINKS: { label: string; route: Route; tab?: TabKey; check?: boolean }[] = [
  { label: "Splash", route: "splash" },
  { label: "Onboarding", route: "onboarding" },
  { label: "Beranda", route: "app", tab: "home" },
  { label: "AI Check", route: "app", tab: "home", check: true },
  { label: "Layanan", route: "app", tab: "layanan" },
  { label: "Profil", route: "app", tab: "profil" },
];

export default function AppPrototype() {
  const [route, setRoute] = useState<Route>("splash");
  const [tab, setTab] = useState<TabKey>("home");
  const [checkingSymptoms, setCheckingSymptoms] = useState(false);

  function jump(link: (typeof JUMP_LINKS)[number]) {
    setCheckingSymptoms(Boolean(link.check));
    setRoute(link.route);
    if (link.tab) setTab(link.tab);
  }

  let screen: React.ReactNode;

  if (route === "splash") {
    screen = (
      <PhoneFrame>
        <SplashScreen onStart={() => setRoute("onboarding")} />
      </PhoneFrame>
    );
  } else if (route === "onboarding") {
    screen = (
      <PhoneFrame>
        <OnboardingScreen
          onNext={() => setRoute("app")}
          onSkip={() => setRoute("app")}
        />
      </PhoneFrame>
    );
  } else if (checkingSymptoms) {
    screen = (
      <PhoneFrame>
        <div className="flex h-full flex-col bg-cream">
          <AiCheckScreen
            onBack={() => setCheckingSymptoms(false)}
            onFindVet={() => {
              setCheckingSymptoms(false);
              setTab("layanan");
            }}
          />
        </div>
      </PhoneFrame>
    );
  } else {
    screen = (
      <PhoneFrame>
        <div className="flex h-full flex-col bg-cream">
          <div className="no-scrollbar flex-1 overflow-y-auto">
            {tab === "home" && (
              <HomeScreen
                onOpenCatCheck={() => setCheckingSymptoms(true)}
                onOpenProfile={() => setTab("profil")}
                onOpenServices={() => setTab("layanan")}
              />
            )}
            {tab === "riwayat" && <RiwayatScreen />}
            {tab === "layanan" && <ServicesScreen />}
            {tab === "profil" && <ProfileScreen onBack={() => setTab("home")} />}
          </div>
          <BottomNav active={tab} onChange={setTab} />
        </div>
      </PhoneFrame>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {screen}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {JUMP_LINKS.map((link) => {
          const isActive =
            route === link.route &&
            (!link.tab || (route === "app" && tab === link.tab)) &&
            Boolean(link.check) === checkingSymptoms;
          return (
            <button
              key={link.label}
              onClick={() => jump(link)}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-brand-100 bg-white text-ink-soft hover:border-brand-300"
              }`}
            >
              {link.label}
            </button>
          );
        })}
        <button
          onClick={() => jump({ label: "Reset", route: "splash" })}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-transparent px-2 py-1.5 text-xs font-semibold text-ink-faint hover:text-ink-soft"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}
