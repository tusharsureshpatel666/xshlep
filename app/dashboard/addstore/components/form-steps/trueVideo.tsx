"use client";

import Heading from "@/app/dashboard/components/heading";
import { Video } from "lucide-react";
import { useState } from "react";

interface TrueVideoProps {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  setVideoFile: (file: File | null) => void;
}

const TrueVideo = ({ videoUrl, setVideoUrl, setVideoFile }: TrueVideoProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = (file: File) => {
    setUploading(true);

    // ✅ store real file (for backend upload)
    setVideoFile(file);

    // ✅ store preview URL (ONLY for UI)
    const localUrl = URL.createObjectURL(file);
    setVideoUrl(localUrl);

    setUploading(false);
  };

  return (
    <div className="space-y-5">
      <Heading
        title="Show Us Your Store"
        description="Record a short video of your store using your camera."
      />

      {!videoUrl && (
        <label
          htmlFor="video-upload"
          className="flex h-[400px] flex-col items-center justify-center gap-3
                     rounded-xl border-2 border-dashed cursor-pointer"
        >
          <Video className="h-10 w-10" />
          <p>{uploading ? "Processing..." : "Click to record video"}</p>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      )}

      {videoUrl && (
        <div className="space-y-3">
          <video
            src={videoUrl}
            controls
            className="w-full max-w-2xl mx-auto rounded-lg"
          />

          <button
            className="underline text-center w-full"
            onClick={() => {
              setVideoUrl(null);
              setVideoFile(null);
            }}
          >
            Record again
          </button>
        </div>
      )}
    </div>
  );
};

export default TrueVideo;
