"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-6 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={session?.user?.image || "/avatar.png"} // replace with session image later
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Profile</h2>
          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>
      </div>

      {/* Right */}
      <button className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
