"use client";

import Image from "next/image";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoreCardProps {
  store: {
    id: string;
    title: string;
    city: string;
    state: string;
    bannerImageUrl?: string | null;
    priceInr: number;
  };
  initialLiked?: boolean;
}

export default function StoreCard({
  store,
  initialLiked = false,
}: StoreCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border",
        "bg-white shadow-sm transition hover:shadow-md"
      )}
    >
      {/* 🖼 Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={store.bannerImageUrl || "/placeholder-store.jpg"}
          alt={store.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* ❤️ Like Button */}
        <div className="absolute top-3 right-3 z-10"></div>
      </div>

      {/* 📦 Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">{store.title}</h3>

        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="h-4 w-4" />
          <span>
            {store.city}, {store.state}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">Starting from</span>
          <span className="text-lg font-bold">₹{store.priceInr}</span>
        </div>
      </div>
    </div>
  );
}
