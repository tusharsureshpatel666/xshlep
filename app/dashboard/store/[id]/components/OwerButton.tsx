"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

type Props = {
  image?: string;
  name: string;
};

const OwnerButton = ({ image, name }: Props) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Avatar className="h-10 w-10">
        <Image
          src={image || ""}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
      </Avatar>

      <span className="text-sm font-medium capitalize">{name}</span>
    </div>
  );
};

export default OwnerButton;
