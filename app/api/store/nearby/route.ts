// app/api/stores/nearby/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userlat, userlog, minprice, maxprice } = await req.json();

  const stores = await prisma.$queryRaw`
  SELECT *
  FROM (
    SELECT *,
      (
        6371 * acos(
          cos(radians(${userlat}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${userlog}))
          + sin(radians(${userlat}))
          * sin(radians(latitude))
        )
      ) AS distance
    FROM "Store"
    WHERE "priceInr" BETWEEN ${minprice} AND ${maxprice}
  ) AS s
  WHERE distance <= 20
  ORDER BY distance ASC;
`;

  return NextResponse.json(stores);
}
