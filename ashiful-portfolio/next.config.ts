import type { NextConfig } from "next";

const assetsHost = (
  process.env.NEXT_PUBLIC_ASSETS_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000"
)
  .replace(/\/api\/?$/, "")
  .replace(/^https?:\/\//, "");

const [hostname, port] = assetsHost.split(":");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: hostname || "localhost",
        port: port || "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: hostname || "localhost",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
