import { NextRequest, NextResponse } from "next/server";
import { ensureAppTables, getPool, hasDatabaseUrl } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_ID = "default";

function localFallback(reason: string) {
  return NextResponse.json({ ok: false, mode: "local", state: null, reason }, { status: 200 });
}

export async function GET() {
  if (!hasDatabaseUrl()) return localFallback("database_url_missing");

  try {
    await ensureAppTables();
    const db = getPool();
    const result = await db.query(
      "SELECT data, updated_at FROM app_state WHERE id = $1 LIMIT 1",
      [STATE_ID],
    );

    return NextResponse.json({
      ok: true,
      mode: "postgres",
      state: result.rows[0]?.data ?? null,
      updatedAt: result.rows[0]?.updated_at ?? null,
    });
  } catch (error) {
    console.error("Failed to load MeowCare state", error);
    return localFallback("database_unavailable");
  }
}

export async function PUT(request: NextRequest) {
  if (!hasDatabaseUrl()) return localFallback("database_url_missing");

  try {
    const body = (await request.json()) as { state?: unknown };
    if (!body.state || typeof body.state !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_state" }, { status: 400 });
    }

    await ensureAppTables();
    const db = getPool();
    await db.query(
      `INSERT INTO app_state (id, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [STATE_ID, JSON.stringify(body.state)],
    );
    await db.query(
      "INSERT INTO app_events (event_type, payload) VALUES ($1, $2::jsonb)",
      ["state_saved", JSON.stringify({ source: "dashboard" })],
    );

    return NextResponse.json({ ok: true, mode: "postgres" });
  } catch (error) {
    console.error("Failed to save MeowCare state", error);
    return NextResponse.json(
      { ok: false, mode: "local", error: "database_unavailable" },
      { status: 503 },
    );
  }
}
