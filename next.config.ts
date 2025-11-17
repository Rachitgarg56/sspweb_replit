import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  /* config options here */
  images: {
    domains: ['files.sringeri.net', 'images.unsplash.com', 'plus.unsplash.com'],
  },
  // for mui icons
  experimental: {
    optimizePackageImports: ['@mui/icons-material']
  },
  async redirects() {
    return [
      {
        source: '/schedule',
        destination: 'https://onlineservices.sringeri.net/schedule',
        permanent: true,
      },{
        source: '/section/:deity',
        destination: '/stotras/:deity',
        permanent: true,
      },{
        source: '/wp-content/:path*',
        destination: 'https://files.sringeri.net/wp-content/:path*',
        permanent: true,
      }
    ]
  },
};

// module.exports = {
 
// }

export default nextConfig;
