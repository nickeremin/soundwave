/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  experimental: {
    esmExternals: "loose",
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig
