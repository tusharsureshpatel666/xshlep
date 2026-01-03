import Image from "next/image";
import { Heart, Share, Star, Trash } from "lucide-react";

import { getStoreById } from "@/lib/query/getstore";
import { auth } from "@/lib/auth";
import DeleteStoreButton from "./components/DeleteStore";

interface StorePageProps {
  params: {
    id: string;
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const storeId = await params;

  const userId = await auth();
  console.log(userId?.user?.id);

  if (!storeId) {
    return <div className="p-6">Store not found</div>;
  }

  const fetchStores = async () => {
    const store = await getStoreById(storeId.id);
    console.log(store);
    return store;
  };

  const store = await fetchStores();
  const isOwner = (await userId?.user?.id) === (await store?.ownerId);
  console.log(storeId.id, store?.ownerId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">{store?.title}</h1>
        </div>

        <div className="flex gap-4 text-sm">
          <button className="flex items-center gap-1 underline">
            <Share className="h-4 w-4" /> Share
          </button>
          <button className="flex items-center gap-1 underline">
            <Heart className="h-4 w-4" /> Save
          </button>

          {isOwner && <DeleteStoreButton storeId={store?.id} />}
        </div>
      </div>

      {/* ================= IMAGE GRID ================= */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative h-[420px]">
          <Image
            src={store?.bannerImageUrl || ""}
            alt="Main"
            fill
            priority
            className="object-cover"
          />
        </div>

        {store?.images.map((img) => (
          <div key={img.id} className="relative h-[205px]">
            <Image src={img.url} alt="Store" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* META */}
          <p className="text-sm">3 guests · 1 bedroom · 1 bed · 1 bathroom</p>

          {/* RATING */}
          <div className="flex items-center gap-4 border rounded-xl p-4 w-fit">
            <span className="flex items-center gap-1 font-medium">
              <Star className="h-4 w-4 fill-black" /> {store?.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              {store.reviews} reviews
            </span>
            <span className="text-sm font-medium text-green-600">
              Guest favourite
            </span>
          </div>

          {/* HOST */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div>
              <p className="font-medium">Hosted by Akash</p>
              <p className="text-sm text-muted-foreground">
                Superhost · 4 years hosting
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="pt-4">
            <p className="leading-relaxed text-muted-foreground">
              This beautifully designed studio apartment offers a luxurious and
              comfortable stay with modern interiors, premium furnishings, and
              access to top-class amenities including a swimming pool and
              balcony view.
            </p>
          </div>
        </div>

        {/* RIGHT – PRICE CARD */}
        <div className="sticky top-24 h-fit border rounded-2xl p-6 shadow-lg">
          <p className="text-xl font-semibold">
            ₹{store.priceInr} <span className="text-sm">night</span>
          </p>

          <div className="grid grid-cols-2 border rounded-lg mt-4 text-sm">
            <div className="p-3 border-r">
              <p className="font-medium">CHECK-IN</p>
              <p>12/19/2025</p>
            </div>
            <div className="p-3">
              <p className="font-medium">CHECK-OUT</p>
              <p>12/21/2025</p>
            </div>
          </div>

          <div className="border rounded-lg p-3 mt-2 text-sm">
            <p className="font-medium">GUESTS</p>
            <p>1 guest</p>
          </div>

          <button className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-medium transition">
            Reserve
          </button>

          <p className="text-center text-sm text-muted-foreground mt-2">
            You won’t be charged yet
          </p>
        </div>
      </div>
    </div>
  );
}
