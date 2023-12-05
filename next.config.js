/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "auction-api-4.vercel.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "etfkgazymc6eqtvf.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.vectorstock.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
