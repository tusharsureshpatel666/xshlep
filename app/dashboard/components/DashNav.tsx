import Userbtn from "@/app/components/login/userbtn";
import { Button } from "@/components/ui/button";
import { Search, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashNav = () => {
  return (
    <div
      className="
        flex justify-between items-center
        px-4 py-4
        md:px-6 md:py-5
        lg:px-9 lg:py-6
        h-auto
      "
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" width={40} height={40} alt="logo" />
        <h2 className="text-xl font-semibold dark:text-white text-black">
          2k1s
        </h2>
      </Link>

      <div className="flex gap-3">
        {/* Button 1 — Find Store Partner */}
        <Link href="/dashboard/findstore">
          <Button
            variant="outline"
            className="rounded-md lg:rounded-full  cursor-pointer dark:text-white text-black flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            {/* label hidden on small & medium screens */}
            <span className="hidden lg:inline">Find Store Partner</span>
          </Button>
        </Link>

        {/* Button 2 — Share Your Store */}
        <Link href="/dashboard/addstore">
          <Button className="rounded-md lg:rounded-full cursor-pointer font-semibold flex items-center gap-2">
            <Store className="w-5 h-5" />
            {/* label hidden on small & medium screens */}
            <span className="hidden lg:inline">Share Your Store</span>
          </Button>
        </Link>
        <Userbtn />
      </div>
    </div>
  );
};

export default DashNav;
