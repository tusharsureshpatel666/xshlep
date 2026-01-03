import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"], // allow Cloudinary images
  },
  productionBrowserSourceMaps: false,

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
