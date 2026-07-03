import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DesktopDashboard from "@/components/dashboard/DesktopDashboard";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard — MeowCare ID",
  description: "Dashboard production MeowCare ID dengan Postgres sync.",
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return <DesktopDashboard />;
}
