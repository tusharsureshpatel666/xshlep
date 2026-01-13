"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Heading from "../../components/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCardList from "../../yourstore/components/AddCardList";

const ProfileHeader = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center flex-col  rounded-xl  p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-38 w-38 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={session?.user?.image || "/avatar.png"} // replace with session image later
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl lg:text-2xl">{session?.user?.name}</h1>
          <p className="text-gray-500 text-sm">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
