"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navHref = [
    { name: "Find Store", href: "/" },
    { name: "About Us", href: "/common/about" },
    { name: "Careers", href: "/common/career" },
    { name: "Contact Us", href: "/common/contact" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Main Wrapper */}
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <h2 className="text-xl font-semibold dark:text-white text-black">
            2k1s
          </h2>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 ml-10">
          {navHref.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="text-gray-600 text-sm hover:text-black dark:text-gray-400 dark:hover:text-white transition font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href={"/dashboard"}>
            <Button
              variant="outline"
              className="rounded-full cursor-pointer dark:text-white text-black"
            >
              Login
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className="rounded-full cursor-pointer font-semibold">
              Get Start Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden cursor-pointer text-gray-700 dark:text-gray-300"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ⭐ Mobile Menu Animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
          >
            <div className="flex flex-col mt-5 px-4 pb-4 gap-4">
              {navHref.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-gray-700 dark:text-gray-300 text-lg py-2 border-b last:border-none border-gray-200 dark:border-gray-800"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="flex flex-col gap-3 mt-2">
                <Link href={"/dashboard"}>
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer dark:text-white text-black w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/dashboard"}>
                  <Button className="rounded-full cursor-pointer w-full">
                    Get 2k1s Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
