/** @type {import('next').NextConfig} */
const { createSupabaseClient } = require('@supabase/auth-helpers-nextjs');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@eco/ui'],
  output: 'standalone',
  hostname: '0.0.0.0',
  port: 3000,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'www.ecocupon.cl']
    },
    turbo: {
      resolveAlias: {
        '@eco/ui': '../../packages/ui',
        '@eco/database': '../../packages/database',
        '@eco/shared': '../../packages/shared'
      }
    }
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'www.ecocupon.cl']
    },
    turbo: {
      resolveAlias: {
        '@eco/ui': '../../packages/ui',
        '@eco/shopify': '../../packages/shopify',
        '@eco/database': '../../packages/database',
        '@eco/shared': '../../packages/shared'
      }
    }
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js']
    };
    return config;
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ]
  }
}

module.exports = nextConfig