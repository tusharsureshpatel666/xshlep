"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) setStatus("Message sent successfully!");
    else setStatus("Failed to send message.");
  };

  return (
    <div className=" bg-gray-50 dark:bg-black flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-white dark:bg-black  rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-green-600 font-medium">
            {status}
          </p>
        )}
      </motion.div>
    </div>
  );
}
