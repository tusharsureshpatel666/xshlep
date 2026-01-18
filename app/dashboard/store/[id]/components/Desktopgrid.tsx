"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGalleryDialog } from "./imageGallerydialog";
import { Button } from "@/components/ui/button";

export function DesktopImageGrid({
  banner,
  images,
}: {
  banner: string;
  images: string[];
}) {
  const allImages = [banner, ...images];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="relative hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[580px]">
        {/* LEFT BIG IMAGE */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          <Image
            src={banner}
            alt="Main image"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* RIGHT 4 IMAGES */}
        {images.slice(0, 4).map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer"
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
          >
            <Image
              src={img}
              alt="Gallery image"
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* SHOW ALL PHOTOS BUTTON */}
        <Button
          variant="secondary"
          className="absolute bottom-4 text-white right-4 z-10 bg-red-500 hover:bg-red-600 text-sm font-medium"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
        >
          Get Video Tour
        </Button>
      </div>

      <ImageGalleryDialog
        open={open}
        onOpenChange={setOpen}
        images={allImages}
        initialIndex={index}
      />
    </>
  );
}
