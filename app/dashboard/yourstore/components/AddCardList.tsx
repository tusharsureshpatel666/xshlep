"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../../components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Loader,
  MapPin,
  Store as StoreIcon,
  IndianRupee,
  Edit,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================
   STORE TYPE
========================= */
type Store = {
  id: string;
  title: string;
  businessType: string;
  city: string;
  state: string;
  country: string;
  priceInr: number;
  bannerImageUrl: string;
};

const AddCardList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Store[]>("/api/store/yourstore");
        setStores(res.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading your stores…</p>
      </div>
    );
  }

  /* =========================
     EMPTY
  ========================= */
  if (!stores.length) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <Image src="/not.svg" width={360} height={360} alt="No store" />
        <Heading
          title="No Store Found"
          description="You haven’t created any store yet."
        />
        <Link href="/dashboard/addstore">
          <Button size="lg" className="rounded-full px-10 py-6">
            Create Store
          </Button>
        </Link>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-8">
      <Heading
        title="Your Stores"
        description="Manage and view all your listed stores"
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="
              relative rounded-[28px] dark:bg-black  bg-neutral-50 p-3
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              transition hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            "
          >
            {/* IMAGE */}
            <div className="relative h-[370px] w-full overflow-hidden rounded-[22px]">
              <Image
                src={store.bannerImageUrl}
                alt={store.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="px-3 pb-3 pt-4 w-[350px] space-y-3">
              <div className="flex justify-between px-2">
                <div className="flex items-center">
                  <h3 className=" text-lg font-semibold ">{store.title}</h3>
                </div>
                {/* <Link href={`/dashboard/edit/${store.id}`}>
                  <Button>
                    <Edit className="w-5 h-5 rounded-full" />
                  </Button>
                </Link> */}
              </div>

              {/* <p className="text-sm text-neutral-500">{store.businessType}</p> */}

              {/* <div className="flex items-center gap-2 text-sm text-neutral-500">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">
                  {store.city}, {store.state}, {store.country}
                </span>
              </div> */}

              <div className="flex items-center justify-between pt-2 ">
                <div className="flex items-center gap-1 text-base font-semibold ">
                  <IndianRupee className="h-4 w-4" />
                  {store.priceInr}
                </div>

                <Link href={`/dashboard/store/${store.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-6"
                  >
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddCardList;
