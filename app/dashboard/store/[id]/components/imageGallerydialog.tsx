"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  initialIndex: number;
};

export function ImageGalleryDialog({
  open,
  onOpenChange,
  images,
  initialIndex,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
        flex justify-center items-center
        
           w-screen h-[100dvh]
    md:h-[80vh] md:max-w-[800px]
          p-0 
          bg-black 
          border-none
        "
      >
        <DialogTitle className="sr-only">Image gallery</DialogTitle>

        {/* Swiper MUST have height */}
        <Swiper
          initialSlide={initialIndex}
          slidesPerView={1}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-full">
              {/* Image wrapper MUST be relative + height */}
              <div className="relative h-full w-full">
                <Image
                  src={img}
                  alt="Fullscreen image"
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={index === initialIndex}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
