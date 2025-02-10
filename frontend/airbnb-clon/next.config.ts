import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images:{
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com"
    ]
  }
  /* config options here */
};

export default nextConfig;
