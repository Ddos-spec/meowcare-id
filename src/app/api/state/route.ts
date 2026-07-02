import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isSameOriginRequest, isValidAdminSession } from "@/lib/auth";
import { ensureAppTables, getPool, hasDatabaseUrl } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_ID = "default";
const MAX_STATE_BYTES = 250_000;

type StatePayload = {
  revision?: unknown;
  version?: unknown;
  profile?: unknown;
  reminders?: unknown;
  healthChecks?: unknown;
  services?: unknown;
};

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}

function unauthorized() {
  return json({ ok: false, error: "unauthorized" }, { status: 401 });
}

function localFallback(reason: string) {
  return json({ ok: false, mode: "local", state: null, reason }, { status: 200 });
}

function isAdminRequest(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

function validateState(input: unknown): input is StatePayload & { revision: number } {
  if (!input || typeof input !== "object") return false;
  const state = input as StatePayload;
  return (
    typeof state.revision === "number" &&
    Number.isInteger(state.revision) &&
    state.revision >= 1 &&
    typeof state.version === "number" &&
    Boolean(state.profile) &&
    typeof state.profile === "object" &&
    Array.isArray(state.reminders) &&
    Array.isArray(state.healthChecks) &&
    Array.isArray(state.services)
  );
}

function stateSizeOk(input: unknown) {
  return Buffer.byteLength(JSON.stringify(input), "utf8") <= MAX_STATE_BYTES;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();
  if (!hasDatabaseUrl()) return localFallback("database_url_missing");

  try {
    await ensureAppTables();
    const db = getPool();
    const result = await db.query(
      "SELECT data, updated_at FROM app_state WHERE id = $1 LIMIT 1",
      [STATE_ID],
    );

    return json({
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
  if (!isAdminRequest(request)) return unauthorized();
  if (!isSameOriginRequest(request)) {
    return json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }
  if (!hasDatabaseUrl()) return localFallback("database_url_missing");

  try {
    const body = (await request.json()) as { state?: unknown };
    if (!validateState(body.state) || !stateSizeOk(body.state)) {
      return json({ ok: false, error: "invalid_state" }, { status: 400 });
    }

    await ensureAppTables();
    const db = getPool();
    const current = await db.query(
      "SELECT COALESCE((data->>'revision')::int, 0) AS revision FROM app_state WHERE id = $1 LIMIT 1",
      [STATE_ID],
    );
    const currentRevision = Number(current.rows[0]?.revision ?? 0);

    if (currentRevision > 0 && body.state.revision <= currentRevision) {
      return json(
        {
          ok: false,
          mode: "postgres",
          error: "stale_state",
          currentRevision,
        },
        { status: 409 },
      );
    }

    await db.query(
      `INSERT INTO app_state (id, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [STATE_ID, JSON.stringify(body.state)],
    );
    await db.query(
      "INSERT INTO app_events (event_type, payload) VALUES ($1, $2::jsonb)",
      ["state_saved", JSON.stringify({ source: "dashboard", revision: body.state.revision })],
    );

    return json({ ok: true, mode: "postgres", revision: body.state.revision });
  } catch (error) {
    console.error("Failed to save MeowCare state", error);
    return json(
      { ok: false, mode: "local", error: "database_unavailable" },
      { status: 503 },
    );
  }
}
