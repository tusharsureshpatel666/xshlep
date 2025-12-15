import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // allow Cloudinary images
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
