import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  // Temel güvenlik başlıkları (Cloudflare önündeki katmana ek olarak,
  // uygulamanın kendisinin de sağladığı savunma) — clickjacking, MIME
  // sniffing ve referrer sızıntısına karşı standart, düşük riskli önlemler.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
