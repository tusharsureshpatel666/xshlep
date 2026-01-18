import Image from "next/image";
import { Heart, Share, Star, Trash } from "lucide-react";

import { getStoreById } from "@/lib/query/getstore";
import { auth } from "@/lib/auth";
import DeleteStoreButton from "./components/DeleteStore";
import ShareStore from "./components/ShareStore";
import { findUserById } from "@/lib/findUser";
import LoveStore from "./components/LoveStore";
import { MobileImageSlider } from "./components/MobileNav";
import { DesktopImageGrid } from "./components/Desktopgrid";
import VideoPlay from "./components/videoplay";
import OwnerButton from "./components/OwerButton";
import Heading from "../../components/heading";
import ReserveCard from "./components/priceCard";

interface StorePageProps {
  params: {
    id: string;
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const storeId = await params;
  console.log(storeId.id);

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
  const OwerDetail = await findUserById(store?.ownerId);
  console.log(OwerDetail);
  const isOwner = (await userId?.user?.id) === (await store?.ownerId);
  console.log(storeId.id, store?.ownerId);

  const allImages = [
    store?.bannerImageUrl,
    ...(store?.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl space-y-6 w-full">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT: Heading */}
        <h1 className="text-2xl font-semibold break-words">{store?.title}</h1>

        {/* RIGHT: Actions */}
        <div className="flex gap-4 items-center text-sm self-start sm:self-auto">
          <ShareStore paramsId={storeId} />
          <LoveStore storeId={storeId.id} initialLiked={userId?.user?.id} />
          {isOwner && <DeleteStoreButton storeId={store?.id} />}
        </div>
      </div>

      <MobileImageSlider images={allImages} />

      <DesktopImageGrid
        banner={store?.bannerImageUrl || ""}
        images={store?.images.map((img) => img.url) || []}
      />

      {/* <VideoPlay
        videoUrl={store?.videoUrl || ""}
        poster={store?.bannerImageUrl || ""}
      /> */}

      <Heading
        title={`Rental Store on ${store?.fullAddress}, ${store?.city}` || ""}
      />
      <div className="flex justify-between items-center">
        <OwnerButton
          image={userId?.user?.image || "/avatar.avif"}
          name={userId?.user?.name || ""}
        />

        <ReserveCard
          price={store?.priceInr}
          sharetype={store?.shareMode}
          partnerBussiness={store?.businessType}
        />
      </div>
    </div>
  );
}
