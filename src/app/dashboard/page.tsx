import type { Metadata } from "next";
import DesktopDashboard from "@/components/dashboard/DesktopDashboard";

export const metadata: Metadata = {
  title: "Dashboard — MeowCare ID",
  description: "Tampilan dashboard MeowCare ID versi desktop/PC.",
};

export default function DashboardPage() {
  return <DesktopDashboard />;
}
