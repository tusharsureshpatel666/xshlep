"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ChevronDown } from "lucide-react";

interface DetailList {
  price: number;
  sharetype: string;
  partnerBussiness: string;
}
export default function ReserveCard({
  price,
  sharetype,
  partnerBussiness,
}: DetailList) {
  return (
    <Card className="w-full max-w-sm rounded-2xl p-8 shadow-lg">
      {/* Price */}
      <div className="mb-4 text-lg font-semibold">
        ₹ {price} <span className="text-sm font-normal">for Month</span>
      </div>

      <div className="flex">
        {sharetype} | {partnerBussiness}
      </div>
      <div className=" rounded-lg bg-muted px-3 py-2 text-center text-sm">
        Free cancellation before <strong>22 January</strong>
      </div>

      {/* Reserve button */}
      <Button className="mt-4 w-full rounded-full py-6 text-base font-semibold bg-rose-600 hover:bg-rose-700">
        Reserve
      </Button>

      {/* Footer text */}
      <p className="mt-2 text-center text-sm text-muted-foreground">
        You won&apos;t be charged yet
      </p>

      {/* Report */}
      <button className="mt-4 w-full text-center text-sm underline text-muted-foreground">
        Report this listing
      </button>
    </Card>
  );
}
