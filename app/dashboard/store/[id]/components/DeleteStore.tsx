"use client";

import { DeleteStore } from "@/lib/query/deletestore";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteStoreButton({ storeId }: { storeId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await DeleteStore(storeId);
      router.push("/dashboard/yourstore"); // or "/stores"
      router.refresh();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-1 underline text-red-600"
    >
      <Trash className="h-4 w-4" />
      Delete
    </button>
  );
}
