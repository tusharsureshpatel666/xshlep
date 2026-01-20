import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // ===== VALIDATION =====
    const requiredFields = [
      "title",
      "desc",
      "country",
      "state",
      "city",
      "pin",
      "fullAddress",
      "priceInr",
      "businessType",
      "share",
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    const title = String(formData.get("title"));
    const desc = String(formData.get("desc"));
    const country = String(formData.get("country"));
    const state = String(formData.get("state"));
    const city = String(formData.get("city"));
    const pin = String(formData.get("pin"));
    const fullAddress = String(formData.get("fullAddress"));
    const priceInr = Number(formData.get("priceInr"));
    const businessType = String(formData.get("businessType"));
    const peopleDesc = String(formData.get("peopleDesc") || "");
    const storeSize = String(formData.get("storeSize") || "");
    const VideoUrl = String(formData.get("videoFile") || "");

    // ===== SHARE PARSE =====
    let share;
    try {
      share = JSON.parse(String(formData.get("share")));
    } catch {
      return NextResponse.json(
        { error: "Invalid share data" },
        { status: 400 },
      );
    }

    // ===== VIDEO UPLOAD =====

    // ===== GEOLOCATION =====
    let lat: number | null = null;
    let lng: number | null = null;

    try {
      const addressString = `${fullAddress}, ${city}, ${state}, ${country}, ${pin}`;
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          addressString,
        )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      );
      const geo = await res.json();

      if (geo.status === "OK") {
        lat = geo.results[0].geometry.location.lat;
        lng = geo.results[0].geometry.location.lng;
      }
    } catch (err) {
      console.error("GEOCODE_FAILED", err);
    }

    // ===== BANNER IMAGE =====
    let bannerUrl: string | null = null;
    const bannerImage = formData.get("bannerImage");

    if (bannerImage instanceof File && bannerImage.size > 0) {
      try {
        const uploaded = await uploadToCloudinary(bannerImage, "image");
        bannerUrl = uploaded.secure_url;
      } catch (err) {
        console.error("BANNER_UPLOAD_FAILED", err);
      }
    }

    // ===== OTHER IMAGES =====
    const imageUrls: string[] = [];
    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File && img.size > 0) {
        try {
          const uploaded = await uploadToCloudinary(img, "image");
          imageUrls.push(uploaded.secure_url);
        } catch (err) {
          console.error(`IMAGE_${i}_UPLOAD_FAILED`, err);
        }
      }
    }

    // ===== DATABASE =====
    const store = await prisma.store.create({
      data: {
        ownerId: session.user.id,
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
        videoUrl: VideoUrl,
        peopleDesc,
        storeSize,
        bannerImageUrl: bannerUrl,
        shareMode: share.mode,
        startTime: share.startTime,
        endTime: share.endTime,
        days: share.days ?? [],
        sqft: share.sqft,
        dayOrNight: share.dayOrNight,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            order: index,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(
      { message: "Post created successfully", store },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_STORE_FATAL", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export const runtime = "nodejs";
