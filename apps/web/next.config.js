/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "geist", "@ayasofyazilim/saas"],
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3001", "*.devtunnels.ms:3000"],
    },
  },
};
