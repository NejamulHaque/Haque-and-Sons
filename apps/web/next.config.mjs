/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Only redirect the OLD vercel.app domain → new domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'haqueandsons.vercel.app',
          },
        ],
        destination: 'https://haquestudio.me/:path*',
        permanent: true,
      },
      // Also redirect www → non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.haquestudio.me',
          },
        ],
        destination: 'https://haquestudio.me/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;