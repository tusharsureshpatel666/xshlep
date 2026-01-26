"use client";

import Heading from "@/app/dashboard/components/heading";
import { Video, Loader2, CloudUpload } from "lucide-react";
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

    setVideoFile(file); // backend
    setVideoUrl(URL.createObjectURL(file)); // UI preview

    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Show Us Your Store"
        description="Record a short video of your store (30–60 seconds works best)."
      />

      {/* Upload Box */}
      {!videoUrl && (
        <label
          htmlFor="video-upload"
          className="
            group flex h-[500px] flex-col items-center justify-center gap-4
            rounded-xl border-2 border-dashed
            border-gray-300 dark:border-gray-700
            cursor-pointer transition
            hover:border-[var(--primary)]
            hover:bg-[color:var(--primary)/0.04]
          "
        >
          {uploading ? (
            <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
          ) : (
            <CloudUpload className="h-10 w-10 text-gray-400 group-hover:text-[var(--primary)]" />
          )}

          <div className="text-center space-y-1">
            <p className="font-medium">
              {uploading ? "Processing video..." : "Click to record or upload"}
            </p>
            <p className="text-sm text-gray-500">MP4 / MOV • Max 60 sec</p>
          </div>

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

      {/* Preview */}
      {videoUrl && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-black/90 p-2">
            <video
              src={videoUrl}
              controls
              className="
                w-full
                max-h-[500px]
                rounded-lg
                object-contain
              "
            />
          </div>

          <button
            type="button"
            className="
              mx-auto block text-sm font-medium
              text-gray-600 hover:text-[var(--primary)]
              underline underline-offset-4
            "
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
