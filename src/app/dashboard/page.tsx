import type { Metadata } from "next";
import { cookies } from "next/headers";
import DashboardLogin from "@/components/dashboard/DashboardLogin";
import DesktopDashboard from "@/components/dashboard/DesktopDashboard";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard — MeowCare ID",
  description: "Dashboard production MeowCare ID dengan Postgres sync.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ login?: string }>;
}) {
  const cookieStore = await cookies();
  const params = searchParams ? await searchParams : {};
  const authenticated = isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  if (!authenticated) {
    return <DashboardLogin failed={params.login === "failed"} />;
  }

  return <DesktopDashboard />;
}
