import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/c1";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  });
}
