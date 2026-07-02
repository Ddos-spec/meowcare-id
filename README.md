# MeowCare ID — Postgres-backed Production MVP

MeowCare ID adalah MVP perawatan kucing berbasis **Next.js App Router**. Dashboard sudah bisa dipakai untuk single-tenant production: profil kucing, pengingat, triase gejala lokal, riwayat, dan kontak layanan.

Data disimpan di browser sebagai fallback cepat, lalu tersinkron ke PostgreSQL saat `DATABASE_URL` aktif.

## Fitur siap pakai

- Landing page client-facing dengan CTA ke dashboard.
- Dashboard `/dashboard` dengan state editable dan persistent:
  - profil kucing: nama, pemilik, ras, umur, berat, steril, tanggal lahir, catatan, makanan;
  - pengingat: tambah, tandai selesai, hapus;
  - triase gejala deterministic: muntah, diare, lemas, bersin/batuk, tidak makan, gatal/kulit, mata, urin/litter box;
  - hasil triase bisa disimpan ke riwayat;
  - overview membaca data profil, pengingat, dan riwayat terbaru;
  - layanan contoh dengan tombol WhatsApp (`wa.me`) tanpa secret.
- PostgreSQL cloud sync via `/api/state`.
- Health check database via `/api/health`.
- UX hardening: empty states, label input, CTA valid, disclaimer medis, dan responsive dashboard.
- PWA ringan: `public/manifest.webmanifest` dan app icon SVG.

## Database production

Database yang dipakai: `meocare`.

Runtime membutuhkan env berikut:

```bash
DATABASE_URL=postgres://.../meocare?sslmode=disable
```

Tabel yang dipakai:

- `app_state` — menyimpan state dashboard single-tenant sebagai JSONB.
- `app_events` — audit ringan event penyimpanan state.

Jika database tidak tersedia, aplikasi fallback ke browser storage agar tetap bisa dipakai.

## Cara run lokal

```bash
npm install
npm run dev
```

Buka:

- Landing: <http://localhost:3000>
- Dashboard MVP: <http://localhost:3000/dashboard>
- Health check: <http://localhost:3000/api/health>

## Validasi production build

```bash
npm run lint
npm run build
```

Stack saat ini:

- Next.js 16.2.10
- React 19.2.4
- Tailwind CSS v4
- TypeScript
- PostgreSQL (`pg`)

## Arsitektur

- `src/lib/meowcare-state.ts`
  - model `CatProfile`, `Reminder`, `HealthCheckRecord`, `ServiceProvider`, `MeowCareState`;
  - `defaultState` untuk data awal yang bisa langsung dipakai;
  - browser persistence + Postgres sync fallback-aware;
  - hook `useMeowCareState()` untuk client-side state.
- `src/lib/db.ts`
  - lazy `pg` pool agar aman saat `next build`;
  - `ensureAppTables()` untuk schema minimal.
- `src/app/api/state/route.ts`
  - `GET` load state dari Postgres;
  - `PUT` upsert state ke Postgres.
- `src/app/api/health/route.ts`
  - cek koneksi database.
- `src/lib/cat-health.ts`
  - analyzer deterministic tanpa API;
  - severity `low | medium | high`;
  - rekomendasi awal, kapan harus ke vet, dan disclaimer bukan diagnosis dokter hewan.

## Batasan saat ini

- Mode production saat ini single-tenant; belum ada auth atau isolasi multi-user.
- Provider layanan masih data contoh; nomor WhatsApp contoh harus diganti sebelum operasi nyata.
- Triase gejala adalah rule-based lokal, bukan AI model/API dan bukan diagnosis medis.
- Grafik berat masih visual contoh; angka berat utama sudah persistent di profil, tetapi histori berat granular belum dimodelkan.

## Roadmap setelah akuisisi

1. Auth + owner profile + multi-cat support.
2. Multi-tenant schema dan row-level isolation.
3. CRUD provider layanan, wilayah, harga, SLA, dan status operasional.
4. Booking flow nyata, notifikasi WhatsApp/email, dan reminder scheduler.
5. Medical content review oleh dokter hewan + audit log rekomendasi.
6. Riwayat berat granular dan chart berbasis data aktual.
7. PWA offline cache lebih lengkap dan export/import data lokal.
