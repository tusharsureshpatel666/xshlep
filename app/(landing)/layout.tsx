"use client";

import React from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      {/* Navbar for every page */}
      <Navbar />

      {/* Page Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t dark:border-gray-800 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 2k1s — All Rights Reserved</p>
          <div className="flex gap-4">
            <Link
              href="/common/privacy"
              className="hover:text-black dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/common/terms"
              className="hover:text-black dark:hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/common/contact"
              className="hover:text-black dark:hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
