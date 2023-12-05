/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig

module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
