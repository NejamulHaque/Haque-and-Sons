/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'haqueandsons.vercel.app', // The old domain
          },
        ],
        destination: 'https://haquestudio.me/:path*', // The new domain
        permanent: true, // 301 Redirect (Permanent)
      },
    ];
  },
};

export default nextConfig;