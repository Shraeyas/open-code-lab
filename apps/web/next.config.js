/** @type {import('next').NextConfig} */

const nextConfig = {
    transpilePackages: ['@code-ide/ui', '@code-ide/custom-errors', '@code-ide/prisma'],
}

module.exports = nextConfig