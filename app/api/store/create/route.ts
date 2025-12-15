import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); //  <-- YOU FORGOT await

    const session = await auth();

    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const country = formData.get("country") as string;
    const state = formData.get("state") as string;
    const city = formData.get("city") as string;
    const pin = formData.get("pin") as string;
    const fullAddress = formData.get("fullAddress") as string;
    const priceInr = Number(formData.get("priceInr"));

    const businessType = formData.get("businessType") as string;

    let lat: number | null = null;
    let lng: number | null = null;

    const addressString = `${fullAddress}, ${city}, ${state}, ${country}, ${pin}`;

    const geocodeApiKey = process.env.GOOGLE_MAPS_API_KEY;
    const geocodeRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        addressString
      )}&key=${geocodeApiKey}`
    );
    const geocodeData = await geocodeRes.json();

    if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
      lat = geocodeData.results[0].geometry.location.lat;
      lng = geocodeData.results[0].geometry.location.lng;
    }

    const ownerId = session?.user?.id;
    console.log(ownerId);
    console.log(formData);

    const bannerImage = formData.get("bannerImage") as File | null;

    const otherImages: File[] = [];
    for (let i = 0; i < 5; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File) otherImages.push(img);
    }
    let bannerUrl: string | null = null;

    if (bannerImage) {
      const uploaded = await uploadToCloudinary(bannerImage);
      bannerUrl = uploaded.secure_url;
    }

    const imageUrls: string[] = [];
    for (const file of otherImages) {
      const uploaded: any = await uploadToCloudinary(file);
      imageUrls.push(uploaded.secure_url);
    }

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
        bannerImageUrl: bannerUrl,
        images: {
          create: imageUrls.map((url, index) => ({
            url,
            order: index,
          })),
        },
      },
      include: {
        images: true, // 👈 THIS
      },
    });

    return NextResponse.json(
      {
        message: "Form received successfully",
        store,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error creating store:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
