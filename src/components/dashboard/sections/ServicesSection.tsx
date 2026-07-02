"use client";

import {
  ChevronDown,
  SlidersHorizontal,
  Star,
  MapPin,
  Clock,
  Stethoscope,
  Scissors,
  Home as HomeIcon,
  PhoneCall,
} from "lucide-react";

type Service = {
  key: string;
  name: string;
  place: string;
  rating: string;
  reviews: string;
  distance: string;
  hours: string;
  icon: typeof Stethoscope;
  tint: string;
  badge?: string;
};

const SERVICES: Service[] = [
  {
    key: "vet",
    name: "Vet 24 Jam",
    place: "Animalia Clinic",
    rating: "4.8",
    reviews: "320",
    distance: "1.2 km",
    hours: "Buka 24 Jam",
    icon: Stethoscope,
    tint: "from-brand-400 to-brand-600",
    badge: "24 JAM",
  },
  {
    key: "grooming",
    name: "Grooming Purrfect",
    place: "Pet Grooming Studio",
    rating: "4.7",
    reviews: "189",
    distance: "1.5 km",
    hours: "Buka 09.00 – 20.00",
    icon: Scissors,
    tint: "from-teal-400 to-teal-600",
  },
  {
    key: "sitter",
    name: "Cat Sitter Jakarta",
    place: "Meow Buddy",
    rating: "4.9",
    reviews: "256",
    distance: "1.8 km",
    hours: "Buka 07.00 – 22.00",
    icon: HomeIcon,
    tint: "from-amber to-brand-500",
  },
];

export default function ServicesSection() {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink-soft shadow-sm">
          <MapPin size={14} className="text-brand-500" />
          Jl. Kemang Raya, Jakarta Selatan
          <ChevronDown size={14} />
        </button>
        <button className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink-soft shadow-sm">
          <SlidersHorizontal size={14} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.key}
            className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]"
          >
            <div
              className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${s.tint}`}
            >
              <s.icon size={40} className="text-white" strokeWidth={1.8} />
              {s.badge && (
                <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-teal-600">
                  {s.badge}
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="font-display text-[15px] font-bold text-ink">
                {s.name}
              </p>
              <p className="text-[12px] text-ink-faint">{s.place}</p>
              <div className="mt-2 flex items-center gap-1 text-[12px] text-ink-soft">
                <Star size={13} className="fill-amber text-amber" />
                <span className="font-semibold">{s.rating}</span>
                <span className="text-ink-faint">({s.reviews})</span>
                <span className="text-ink-faint">· {s.distance}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-faint">
                <Clock size={12} />
                {s.hours}
              </div>
              <button className="mt-4 w-full cursor-pointer rounded-xl bg-brand-500 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600">
                Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-teal-500 p-6 sm:flex-row">
        <div>
          <p className="text-[15px] font-bold text-white">
            Butuh layanan lainnya?
          </p>
          <p className="text-[12.5px] text-teal-50">Kami siap membantu!</p>
        </div>
        <button className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-teal-600 transition hover:bg-teal-50">
          <PhoneCall size={14} />
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}
