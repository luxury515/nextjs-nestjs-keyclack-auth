/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // 백엔드 서버 주소
      },
    ]
  },
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
  images: {
    domains: ['dev-cweb.vheld.com', 'cweb.vheld.com'], // 외부 이미지 호스트 추가
  },
};

export default nextConfig;