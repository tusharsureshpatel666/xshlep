import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { auth } from "../../../../lib/auth";
import prisma from "@/lib/prisma";
import type { UploadApiResponse } from "cloudinary";

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
    const peopleDesc = formData.get("peopleDesc") as string;
    const storeSize = formData.get("storeSize") as string;

    const businessType = formData.get("businessType") as string;
    const videoFile = formData.get("videoFile") as File;

    const uploadedVideo = await uploadToCloudinary(videoFile, "video");

    const videoUrl = uploadedVideo.secure_url;

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
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bannerImage = formData.get("bannerImage");

    let bannerUrl: string | null = null;

    if (bannerImage instanceof File && bannerImage.size > 0) {
      const uploaded = await uploadToCloudinary(bannerImage, "image");
      bannerUrl = uploaded.secure_url;
    }

    const otherImages: File[] = [];
    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File) otherImages.push(img);
    }
    // let bannerUrl: string | null = null;

    // if (bannerImage) {
    //   const uploaded: UploadApiResponse = await uploadToCloudinary(bannerImage);
    //   bannerUrl = uploaded.secure_url;
    // }

    const imageUrls: string[] = [];

    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);

      if (img instanceof File && img.size > 0) {
        const uploaded = await uploadToCloudinary(img, "image");
        imageUrls.push(uploaded.secure_url);
      }
    }

    const shareRaw = formData.get("share") as string;
    console.log(shareRaw);
    if (!shareRaw) throw new Error("Share data missing");

    const share = JSON.parse(shareRaw);
    const shareMode = share.mode;

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
        videoUrl,
        peopleDesc,
        storeSize: storeSize,
        bannerImageUrl: bannerUrl,
        shareMode,
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
