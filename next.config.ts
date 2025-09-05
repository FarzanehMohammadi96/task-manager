import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "loremflickr.com"],
  },
};

module.exports = nextConfig;

export default nextConfig;
