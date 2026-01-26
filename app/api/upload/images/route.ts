import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const bannerImage = formData.get("bannerImage") as File;
    const videoFile = formData.get("videoFile") as File;

    if (!bannerImage || !videoFile) {
      return NextResponse.json({ error: "Missing files" }, { status: 400 });
    }

    const bannerUpload = await uploadToCloudinary(bannerImage, "image");
    const videoUpload = await uploadToCloudinary(videoFile, "video");

    return NextResponse.json({
      bannerUrl: bannerUpload.secure_url,
      videoUrl: videoUpload.secure_url,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
