/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        DEVELOPMENT_BACKEND_URL: 'localhost:8080',
    }
};

export default nextConfig;
