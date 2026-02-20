import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Redireciona non-www para www (308 Permanent - transfere PageRank)
      {
        source: "/:path*",
        has: [{ type: "host", value: "devthru.com" }],
        destination: "https://www.devthru.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
