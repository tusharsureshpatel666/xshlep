"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "../../components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";

const AddCardList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/store/yourstore");
        console.log(res.data);

        // Update state
        setStores(res.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center text-center items-center gap-3">
        <Loader className="w-5 h-5 animate-spin" />
      </div>
    );

  if (!stores.length)
    return (
      <div className="flex flex-col justify-center text-center items-center gap-3">
        <Image src={"/not.svg"} width={500} height={500} alt="hello" />
        <Heading
          title="No Store Found"
          description="No store found click to create one"
        />
        <Link href="/dashboard/addstore">
          <Button className="py-6 rounded-xl ">Create Store</Button>
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map((store, index) => (
        <div key={store.id || index} className="p-4 border rounded shadow">
          <Image
            src={store.bannerImageUrl}
            width={150}
            height={150}
            alt={store.title || "Store Banner"}
            className="rounded"
          />
          <h3 className="font-bold mt-2">{store.title}</h3>
          <p className="text-sm">{store.businessType}</p>
          <p className="text-sm">
            {store.city}, {store.state}, {store.country}
          </p>
          <p className="text-sm">Price: ₹{store.priceInr}</p>
        </div>
      ))}
    </div>
  );
};

export default AddCardList;
