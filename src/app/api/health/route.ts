import { NextResponse } from "next/server";
import { ensureAppTables, getPool, hasDatabaseUrl } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ ok: true, app: "meocare", database: "not_configured" });
  }

  try {
    await ensureAppTables();
    const result = await getPool().query("SELECT current_database() AS database, now() AS checked_at");
    return NextResponse.json({ ok: true, app: "meocare", database: "ok", ...result.rows[0] });
  } catch (error) {
    console.error("Health check database error", error);
    return NextResponse.json({ ok: false, app: "meocare", database: "error" }, { status: 503 });
  }
}
