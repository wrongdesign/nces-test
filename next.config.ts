import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/dashboard/task',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
