/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
