/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXTAUTH_SECRET:"Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
        FRONTEND_URL: process.env.FRONTEND_URL,
        BACKEND_URL: process.env.BACKEND_URL
    },
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['@acme/ui'],
    },
}

module.exports = nextConfig
