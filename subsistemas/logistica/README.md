# Logistics Subsystem

## Deployment Infrastructure

### Web Application Deployment

The web application is deployed on Vercel with the following configuration:

- **Domain**: www.ecocupon.cl
- **Framework**: Next.js
- **Build Command**: `pnpm install && pnpm build --filter=@eco/web...`
- **Install Command**: `pnpm install --frozen-lockfile`
- **Output Directory**: `.next`

### Security Headers

The application implements the following security headers:

- X-DNS-Prefetch-Control: on
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Deployment Process

1. The deployment is automatically triggered when changes are pushed to the connected GitHub repository
2. Vercel builds the application using the specified build command
3. The application is deployed to Vercel's global edge network
4. Traffic is automatically redirected from ecocupons-projects.vercel.app to www.ecocupon.cl

### Environment Configuration

Required environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL (defaults to http://localhost:3000 in development)

### Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and configure the environment variables
4. Run the development server: `pnpm dev`

### Production Build

To create a production build locally:

```bash
pnpm build
```

The application will be built with all optimizations enabled, including:
- Server-side rendering
- Static page generation
- Image optimization
- API routes