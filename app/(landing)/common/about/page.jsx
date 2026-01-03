"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold"
        >
          About 2k1s
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl"
        >
          We help individuals and small businesses reduce rent by connecting
          them with compatible co-renters. Whether it's rooms, shops,
          micro-businesses or shared workspaces — our mission is to make space
          affordable for everyone.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Rent is one of the biggest expenses for individuals and small
            business owners. Yet thousands of hours and spaces go unused every
            single day. We bridge this gap by allowing two compatible renters to
            share one space, reducing cost and increasing opportunities.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-60 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>
      </section>

      {/* Values */}
      <section className="flex flex-col gap-6 mt-6">
        <h2 className="text-3xl font-semibold text-center">Our Core Values</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["Affordability", "Community", "Simplicity"].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="p-6 rounded-xl border dark:border-gray-800 flex flex-col gap-3 bg-white dark:bg-gray-900"
            >
              <h3 className="text-xl font-semibold">{value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {value === "Affordability" &&
                  "We reduce rent for individuals and businesses by enabling shared spaces."}
                {value === "Community" &&
                  "We help people work together, collaborate and grow side-by-side."}
                {value === "Simplicity" &&
                  "Our platform makes sharing a space effortless, safe and transparent."}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
