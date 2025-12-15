"use client";

import React, { useState } from "react";
import Heading from "../heading";
import { motion } from "framer-motion";
import { Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FormSetup = () => {
  const [renter, setRenter] = useState("");
  const router = useRouter();

  const options = [
    {
      id: "find",
      title: "Find Store Partner",
      desc: "Search available shared stores and collaborate with the ideal business match.",
      icon: <Search className="w-7 h-7" />,
    },
    {
      id: "add",
      title: "Add Your Store",
      desc: "List your store and connect with reliable partners to reduce rent costs.",
      icon: <Store className="w-7 h-7" />,
    },
  ];

  const handleAction = () => {
    if (renter === "find") router.push("/dashboard/findstore");
    if (renter === "add") router.push("/dashboard/addstore");
  };

  return (
    <div className="space-y-10">
      <Heading
        title="Choose What You're Looking For"
        description="Want to search for a store partner or add your own store to find someone?"
      />

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mt-6">
        {options.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => setRenter(item.id)}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0px 8px 28px rgba(0,0,0,0.08)",
            }}
            transition={{ duration: 0.25 }}
            className={`p-8 rounded-3xl border cursor-pointer transition-all
              ${
                renter === item.id
                  ? "border-black dark:border-white bg-gray-100 dark:bg-black shadow-md"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-black shadow-sm"
              }
            `}
          >
            <div className="flex flex-col items-center gap-5">
              <div
                className={`p-4 rounded-2xl flex items-center justify-center transition-all
                ${
                  renter === item.id
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 dark:bg-gray-900"
                }`}
              >
                {item.icon}
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl text-center font-semibold dark:text-white">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-center dark:text-gray-400 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      {renter && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <Button
            onClick={handleAction}
            className="rounded-lg cursor-pointer w-full px-8 py-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {renter === "find" ? "Find Stores" : "Add Store"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FormSetup;
