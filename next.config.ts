import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults this to [75] and rejects anything else, so every image
    // was being re-encoded at 75 on top of an already-lossy source. 90 is the
    // allowlisted step the photography uses; 75 stays for incidental art.
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pl",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
