import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images:{
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  }
  /* config options here */
};

export default nextConfig;
