/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // CSP nativo de Next.js - automático, seguro y simple
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js necesita esto
              "style-src 'self' 'unsafe-inline'", // MUI necesita esto
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
