import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    /* ----------------------------- */
    /* 1. Auth */
    /* ----------------------------- */
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", step: "TITLE" },
        { status: 401 },
      );
    }

    const ownerId = session.user.id;

    /* ----------------------------- */
    /* 2. Form Data */
    /* ----------------------------- */
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const country = formData.get("country") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const pin = formData.get("pin") as string;
    const fullAddress = formData.get("fullAddress") as string;
    const businessType = formData.get("businessType") as string;
    const peopleDesc = formData.get("peopleDesc") as string;
    const storeSize = formData.get("storeSize") as string;
    const priceInr = Number(formData.get("priceInr"));
    const videoFile = formData.get("videoFile") as string;
    const bannerImage = formData.get("bannerImage") as string;

    /* ----------------------------- */
    /* 3. Validation (FAIL FAST) */
    /* ----------------------------- */
    if (!title) {
      return NextResponse.json(
        { error: "Title is required", step: "TITLE" },
        { status: 400 },
      );
    }

    if (!country || !state || !city || !pin || !fullAddress) {
      return NextResponse.json(
        { error: "Invalid location", step: "LOCATION" },
        { status: 400 },
      );
    }

    if (!videoFile) {
      return NextResponse.json(
        { error: "Video is required", step: "VIDEO" },
        { status: 400 },
      );
    }

    if (!desc) {
      return NextResponse.json(
        { error: "Description required", step: "DESCRIPTION" },
        { status: 400 },
      );
    }

    if (Number.isNaN(priceInr)) {
      return NextResponse.json(
        { error: "Invalid price", step: "PRICE" },
        { status: 400 },
      );
    }

    const shareRaw = formData.get("share") as string;
    if (!shareRaw) {
      return NextResponse.json(
        { error: "Share data missing", step: "SHARE" },
        { status: 400 },
      );
    }

    let share;
    try {
      share = JSON.parse(shareRaw);
    } catch {
      return NextResponse.json(
        { error: "Invalid share data", step: "SHARE" },
        { status: 400 },
      );
    }

    /* ----------------------------- */
    /* 4. Collect Media */
    /* ----------------------------- */

    const imageFiles: File[] = [];
    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File && img.size > 0) {
        imageFiles.push(img);
      }
    }

    if (imageFiles.length < 4 || !bannerImage) {
      return NextResponse.json(
        { error: "Images missing", step: "IMAGES" },
        { status: 400 },
      );
    }

    /* ----------------------------- */
    /* 5. Upload Media (PARALLEL ⚡) */
    /* ----------------------------- */
    let uploads;
    try {
      uploads = await Promise.all([
        ...imageFiles.map((f) => uploadToCloudinary(f, "image")),
      ]);
    } catch {
      return NextResponse.json(
        { error: "Media upload failed", step: "IMAGES" },
        { status: 500 },
      );
    }

    const [...imageUploads] = uploads;

    /* ----------------------------- */
    /* 6. Google Geocoding (SOFT FAIL) */
    /* ----------------------------- */
    let lat: number | null = null;
    let lng: number | null = null;

    try {
      const address = `${fullAddress}, ${city}, ${state}, ${country}, ${pin}`;
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      );

      const data = await res.json();
      if (data.status === "OK") {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;
      }
    } catch {
      // intentionally NOT failing the request
      console.warn("Geocoding failed");
    }

    /* ----------------------------- */
    /* 7. Create Store */
    /* ----------------------------- */
    const store = await prisma.store.create({
      data: {
        ownerId,
        title,
        desc,
        country,
        state,
        city,
        pin,
        fullAddress,
        priceInr,
        businessType,
        latitude: lat,
        longitude: lng,
        videoUrl: videoFile,
        peopleDesc,
        storeSize,
        bannerImageUrl: bannerImage,
        shareMode: share.mode,
        startTime: share.startTime,
        endTime: share.endTime,
        days: share.days ?? [],
        sqft: share.sqft,
        dayOrNight: share.dayOrNight,
        images: {
          create: imageUploads.map((u, i) => ({
            url: u.secure_url,
            order: i,
          })),
        },
      },
      include: { images: true },
    });

    /* ----------------------------- */
    /* 8. Success */
    /* ----------------------------- */
    return NextResponse.json(
      { message: "Store created successfully", store },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create store error:", error);

    return NextResponse.json(
      { error: "Internal server error", step: "TITLE" },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
