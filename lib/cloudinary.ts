import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export function uploadToCloudinary(
  file: File,
  folder = "store-images"
): Promise<UploadApiResponse> {
  return new Promise<UploadApiResponse>(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      cloudinary.uploader
        .upload_stream({ folder }, (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Cloudinary upload failed"));

          resolve(result);
        })
        .end(buffer);
    } catch (err) {
      reject(err);
    }
  });
}
