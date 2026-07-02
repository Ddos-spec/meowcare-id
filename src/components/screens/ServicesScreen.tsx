"use client";

import {
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

export default function ServicesScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[17px] font-bold text-ink">
              Layanan Terdekat
            </h1>
            <div className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-soft">
              <MapPin size={12} className="text-brand-500" />
              Area layanan sample: Jakarta Selatan
            </div>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-ink-faint shadow-sm">
            Terdekat
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-4">
        <div className="space-y-3.5 pt-2">
          {SERVICES.map((s) => (
            <div
              key={s.key}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-16px_rgba(42,33,25,0.4)]"
            >
              <div className="flex gap-3 p-3">
                <div
                  className={`relative grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${s.tint}`}
                >
                  <s.icon size={26} className="text-white" strokeWidth={2} />
                  {s.badge && (
                    <span className="absolute top-1.5 left-1.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-bold text-teal-600">
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[14px] font-bold text-ink">
                    {s.name}
                  </p>
                  <p className="truncate text-[11.5px] text-ink-faint">
                    {s.place}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-soft">
                    <Star size={12} className="fill-amber text-amber" />
                    <span className="font-semibold">{s.rating}</span>
                    <span className="text-ink-faint">({s.reviews})</span>
                    <span className="text-ink-faint">· {s.distance}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-ink-faint">
                    <Clock size={11} />
                    {s.hours}
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-brand-50 px-3 py-2">
                <button className="cursor-pointer rounded-lg bg-brand-500 px-4 py-1.5 text-[12px] font-semibold text-white transition hover:bg-brand-600">
                  Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-teal-500 p-4">
          <div className="flex-1">
            <p className="text-[13px] font-bold text-white">
              Butuh layanan lainnya?
            </p>
            <p className="text-[11.5px] text-teal-50">
              Kami siap membantu!
            </p>
          </div>
          <button className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-[12px] font-semibold text-teal-600 transition hover:bg-teal-50">
            <PhoneCall size={13} />
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
}

