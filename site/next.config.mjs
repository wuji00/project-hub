/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/project-hub',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
