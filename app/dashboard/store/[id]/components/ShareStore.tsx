import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";

const ShareStore = ({ paramsId }: { paramsId: string }) => {
  const storeUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/store/${paramsId}`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this store 👇\n${storeUrl}`
  )}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Share className="w-4 h-4" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Store</DialogTitle>
          <DialogDescription>
            Share your store with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center gap-4 mt-4">
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareStore;
