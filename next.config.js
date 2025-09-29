/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BLOB_DOMAIN,
        port: "",
        pathname: "/media/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.js"
);
module.exports = withNextIntl(nextConfig);
