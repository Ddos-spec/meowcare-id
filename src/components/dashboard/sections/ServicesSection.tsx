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
  MessageCircle,
} from "lucide-react";
import type { ServiceProvider } from "@/lib/meowcare-state";

type ServiceMeta = {
  icon: typeof Stethoscope;
  tint: string;
  label: string;
};

const META: Record<ServiceProvider["category"], ServiceMeta> = {
  vet: { icon: Stethoscope, tint: "from-brand-400 to-brand-600", label: "Vet" },
  grooming: { icon: Scissors, tint: "from-teal-400 to-teal-600", label: "Grooming" },
  sitter: { icon: HomeIcon, tint: "from-amber to-brand-500", label: "Cat Sitter" },
};

function waLink(service: ServiceProvider) {
  const text = encodeURIComponent(`Halo ${service.place}, saya ingin booking layanan ${service.name} untuk kucing saya via MeowCare ID.`);
  return `https://wa.me/${service.phone}?text=${text}`;
}

export default function ServicesSection({ services }: { services: ServiceProvider[] }) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink-soft shadow-sm">
          <MapPin size={14} className="text-brand-500" />
          Jakarta Selatan · provider contoh siap konfigurasi
          <ChevronDown size={14} />
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink-soft shadow-sm">
          <SlidersHorizontal size={14} />
          Terurut jarak terdekat
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const meta = META[service.category];
          const Icon = meta.icon;
          return (
            <div key={service.id} className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_30px_-22px_rgba(42,33,25,0.5)]">
              <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${meta.tint}`}>
                <Icon size={40} className="text-white" strokeWidth={1.8} />
                <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-teal-600">{service.emergency ? "24 JAM" : meta.label}</span>
              </div>
              <div className="p-4">
                <p className="font-display text-[15px] font-bold text-ink">{service.name}</p>
                <p className="text-[12px] text-ink-faint">{service.place}</p>
                <div className="mt-2 flex items-center gap-1 text-[12px] text-ink-soft">
                  <Star size={13} className="fill-amber text-amber" />
                  <span className="font-semibold">{service.rating.toFixed(1)}</span>
                  <span className="text-ink-faint">({service.reviews})</span>
                  <span className="text-ink-faint">· {service.distanceKm} km</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-faint"><Clock size={12} />{service.hours}</div>
                <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-faint"><MapPin size={12} />{service.address}</div>
                <a href={waLink(service)} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-500 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-600">
                  <MessageCircle size={14} />
                  Booking via WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-teal-500 p-6 sm:flex-row">
        <div>
          <p className="text-[15px] font-bold text-white">Butuh layanan lainnya?</p>
          <p className="text-[12.5px] text-teal-50">Daftar provider ini tersimpan sebagai konfigurasi lokal dan siap diganti saat backend/provider resmi tersedia.</p>
        </div>
        <a href="https://wa.me/6281234567890?text=Halo%20MeowCare%20ID%2C%20saya%20butuh%20bantuan%20layanan%20kucing." target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-teal-600 transition hover:bg-teal-50">
          <PhoneCall size={14} />
          Hubungi Admin
        </a>
      </div>
    </div>
  );
}
