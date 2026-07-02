export type Severity = "low" | "medium" | "high";

export type AnalysisResult = {
  severity: Severity;
  title: string;
  summary: string;
  matchedSymptoms: string[];
  recommendations: string[];
  whenToVet: string;
  disclaimer: string;
};

type Rule = {
  keywords: string[];
  symptom: string;
  severity: Severity;
  title: string;
  recommendations: string[];
  whenToVet: string;
};

const DISCLAIMER =
  "Analisis ini adalah triase awal berbasis gejala, bukan diagnosis dokter hewan. Untuk kondisi berat atau memburuk, segera hubungi dokter hewan.";

const RULES: Rule[] = [
  {
    keywords: ["tidak pipis", "susah pipis", "pipis", "urin", "litter", "kencing", "urin berdarah", "kencing darah", "darah", "kejang", "sesak", "napas cepat"],
    symptom: "urin/litter box atau tanda bahaya",
    severity: "high",
    title: "Butuh Pemeriksaan Dokter Segera",
    recommendations: [
      "Jangan menunda konsultasi jika ada darah, sesak, kejang, atau tidak bisa pipis.",
      "Simpan catatan waktu gejala muncul dan perubahan perilaku.",
      "Bawa sampel urin/foto gejala bila memungkinkan untuk membantu dokter hewan.",
    ],
    whenToVet: "Segera ke vet hari ini, terutama jika kucing tampak nyeri, lemas ekstrem, atau tidak bisa buang air.",
  },
  {
    keywords: ["muntah", "vomit", "memuntahkan"],
    symptom: "muntah",
    severity: "medium",
    title: "Gangguan Pencernaan / Iritasi Lambung",
    recommendations: [
      "Berikan air bersih dan pantau frekuensi muntah.",
      "Sajikan makanan mudah dicerna dalam porsi kecil setelah kondisi lebih tenang.",
      "Hindari mengganti makanan mendadak dan jauhkan benda asing dari jangkauan.",
    ],
    whenToVet: "Hubungi vet jika muntah berulang lebih dari 2-3 kali, disertai darah, lemas, atau tidak mau minum.",
  },
  {
    keywords: ["diare", "mencret", "feses cair", "bab cair"],
    symptom: "diare",
    severity: "medium",
    title: "Gangguan Pencernaan Ringan hingga Sedang",
    recommendations: [
      "Pastikan hidrasi cukup dan litter box tetap bersih.",
      "Catat warna, frekuensi, dan bau feses untuk bahan konsultasi.",
      "Berikan makanan yang biasa dikonsumsi; jangan eksperimen makanan baru dulu.",
    ],
    whenToVet: "Konsultasi jika diare berlangsung lebih dari 24-48 jam, ada darah, atau kucing terlihat lemas.",
  },
  {
    keywords: ["tidak mau makan", "nafsu makan", "ga makan", "nggak makan", "mogok makan"],
    symptom: "nafsu makan turun",
    severity: "medium",
    title: "Penurunan Nafsu Makan",
    recommendations: [
      "Coba hangatkan makanan basah agar aromanya lebih kuat.",
      "Pastikan tidak ada stres lingkungan seperti pindah tempat atau suara bising.",
      "Pantau minum, buang air, dan berat badan harian.",
    ],
    whenToVet: "Kucing yang tidak makan lebih dari 24 jam sebaiknya diperiksa, apalagi anak kucing atau kucing senior.",
  },
  {
    keywords: ["lemas", "lesu", "tidur terus", "tidak aktif", "diam saja"],
    symptom: "lemas",
    severity: "medium",
    title: "Energi Menurun / Perlu Dipantau",
    recommendations: [
      "Ukur suhu bila punya termometer khusus hewan.",
      "Pastikan kucing tetap minum dan bisa ke litter box normal.",
      "Kurangi aktivitas dan amati perubahan selama beberapa jam.",
    ],
    whenToVet: "Ke vet jika lemas disertai tidak makan, muntah, diare, demam, atau memburuk cepat.",
  },
  {
    keywords: ["bersin", "batuk", "pilek", "ingus", "mata berair"],
    symptom: "saluran napas",
    severity: "low",
    title: "Gejala Pernapasan Ringan",
    recommendations: [
      "Jaga ruangan tetap hangat, bersih, dan bebas asap/debu.",
      "Bersihkan area mata/hidung dengan kain lembut lembap.",
      "Pisahkan sementara dari kucing lain jika ada gejala flu.",
    ],
    whenToVet: "Periksa jika napas berat, tidak mau makan, demam, atau gejala tidak membaik dalam 2-3 hari.",
  },
  {
    keywords: ["mata", "belekan", "mata merah", "kelopak", "bengkak", "sipitan"],
    symptom: "mata",
    severity: "medium",
    title: "Iritasi atau Infeksi Mata",
    recommendations: [
      "Bersihkan kotoran mata perlahan memakai kasa/kain lembut yang dibasahi air hangat.",
      "Hindari tetes mata manusia atau obat tanpa arahan dokter hewan.",
      "Amati apakah mata tampak keruh, bengkak, atau kucing terus menggaruk area mata.",
    ],
    whenToVet: "Ke vet jika mata tertutup, keruh, bengkak berat, berdarah, atau tidak membaik dalam 24 jam.",
  },
  {
    keywords: ["gatal", "garuk", "kutu", "rontok", "jamur", "kulit"],
    symptom: "kulit/bulu",
    severity: "low",
    title: "Iritasi Kulit atau Masalah Bulu",
    recommendations: [
      "Periksa kutu, kemerahan, luka, atau area botak.",
      "Cuci alas tidur dan bersihkan area favorit kucing.",
      "Jangan gunakan obat manusia atau salep tanpa arahan vet.",
    ],
    whenToVet: "Konsultasi jika ada luka basah, botak meluas, bau menyengat, atau kucing terus menggaruk.",
  },
];

const SEVERITY_RANK: Record<Severity, number> = { low: 1, medium: 2, high: 3 };

export function analyzeCatSymptoms(input: string): AnalysisResult {
  const normalized = input.trim().toLowerCase();
  const matched = RULES.filter((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (!normalized) {
    return {
      severity: "low",
      title: "Belum Ada Gejala yang Dianalisis",
      summary: "Tuliskan keluhan kucing terlebih dahulu agar MeowCare bisa memberi triase awal.",
      matchedSymptoms: [],
      recommendations: ["Isi gejala utama, durasi, nafsu makan, minum, dan aktivitas kucing."],
      whenToVet: "Jika ada kondisi darurat seperti sesak, kejang, atau tidak bisa pipis, segera hubungi vet.",
      disclaimer: DISCLAIMER,
    };
  }

  if (matched.length === 0) {
    return {
      severity: "low",
      title: "Gejala Perlu Dipantau",
      summary:
        "Belum ada pola spesifik yang kuat dari input ini. Pantau perubahan perilaku, makan, minum, dan litter box.",
      matchedSymptoms: ["keluhan umum"],
      recommendations: [
        "Catat kapan gejala mulai muncul dan seberapa sering terjadi.",
        "Pastikan air bersih tersedia dan lingkungan tetap tenang.",
        "Gunakan riwayat MeowCare untuk membandingkan perkembangan gejala.",
      ],
      whenToVet: "Konsultasi jika gejala berlanjut lebih dari 24-48 jam atau muncul tanda bahaya.",
      disclaimer: DISCLAIMER,
    };
  }

  const primary = matched.reduce((best, rule) =>
    SEVERITY_RANK[rule.severity] > SEVERITY_RANK[best.severity] ? rule : best,
  );
  const symptoms = Array.from(new Set(matched.map((rule) => rule.symptom)));
  const recommendations = Array.from(
    new Set(matched.flatMap((rule) => rule.recommendations)),
  ).slice(0, 5);

  return {
    severity: primary.severity,
    title: primary.title,
    summary: `Input terdeteksi berkaitan dengan ${symptoms.join(", ")}. Prioritas saat ini adalah memantau kondisi, menjaga hidrasi, dan menyiapkan catatan untuk dokter hewan bila perlu.`,
    matchedSymptoms: symptoms,
    recommendations,
    whenToVet: primary.whenToVet,
    disclaimer: DISCLAIMER,
  };
}

export function severityLabel(severity: Severity) {
  if (severity === "high") return "Darurat";
  if (severity === "medium") return "Perlu Dipantau";
  return "Ringan";
}
