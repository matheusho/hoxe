/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.producthunt.com",
        port: "",
        pathname: "/widgets/embed-image/**",
      },
    ],
  },
};

export default nextConfig;
