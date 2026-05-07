import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Route matchers
// ---------------------------------------------------------------------------
const PROTECTED_PATHS = ['/dashboard']
const PROTECTED_API_PATHS = ['/api/user', '/api/stripe/checkout', '/api/stripe/portal']

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------
function applySecurityHeaders(response: NextResponse): NextResponse {
  const h = response.headers
  h.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://api.fontshare.com https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com https://fonts.gstatic.com",
      "font-src 'self' https://api.fontshare.com https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.stripe.com",
      "frame-src https://js.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  )
  h.set('X-Frame-Options', 'SAMEORIGIN')
  h.set('X-Content-Type-Options', 'nosniff')
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  h.set('Cross-Origin-Opener-Policy', 'same-origin')
  h.set('Cross-Origin-Resource-Policy', 'same-origin')
  return response
}

// ---------------------------------------------------------------------------
// Session check — reads the NextAuth session cookie without importing lib/auth.
// lib/auth pulls in Prisma + bcryptjs + Resend which exceed the 1 MB Edge limit.
// The cookie name used by next-auth v5 in production is:
//   __Secure-authjs.session-token  (HTTPS)
//   authjs.session-token           (HTTP / dev)
// A non-empty cookie value means a session exists; the actual JWT is verified
// by the API routes and RSCs where Node.js is available.
// ---------------------------------------------------------------------------
function hasSessionCookie(request: NextRequest): boolean {
  const secure = request.cookies.get('__Secure-authjs.session-token')
  const dev = request.cookies.get('authjs.session-token')
  return !!(secure?.value || dev?.value)
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Build the base response (pass-through)
  const response = NextResponse.next()

  // GPC detection — honor Global Privacy Control
  if (request.headers.get('Sec-GPC') === '1') {
    response.cookies.set('gpc_detected', '1', {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: false,
    })
  }

  // Route protection
  const isProtectedPage = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  const isProtectedApi = PROTECTED_API_PATHS.some((p) => pathname.startsWith(p))

  if (isProtectedPage || isProtectedApi) {
    if (!hasSessionCookie(request)) {
      if (isProtectedApi) {
        return applySecurityHeaders(
          NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        )
      }
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return applySecurityHeaders(NextResponse.redirect(loginUrl))
    }
  }

  return applySecurityHeaders(response)
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (Next.js static assets)
     * - _next/image   (image optimisation)
     * - favicon / public
     * - api/auth      (NextAuth routes — handle their own auth)
     * - api/health    (public health check)
     * - api/stripe/webhook (Stripe sends raw POST, no session cookie)
     */
    '/((?!_next/static|_next/image|favicon|public|api/auth|api/health|api/stripe/webhook).*)',
  ],
}
