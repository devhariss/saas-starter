import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// DEMO / PREVIEW MODE
// All auth checks are bypassed. A fake session cookie is injected so any
// downstream code that reads `authjs.session-token` sees a non-empty value.
// DO NOT merge this branch into main.
// ---------------------------------------------------------------------------
const DEMO_MODE = true

const PROTECTED_PATHS = ['/dashboard']
const PROTECTED_API_PATHS = ['/api/user', '/api/stripe/checkout', '/api/stripe/portal']

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

function hasSessionCookie(request: NextRequest): boolean {
  if (DEMO_MODE) return true // always authenticated in preview
  const secure = request.cookies.get('__Secure-authjs.session-token')
  const dev    = request.cookies.get('authjs.session-token')
  return !!(secure?.value || dev?.value)
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Inject a fake demo session cookie so RSCs that check cookies() see a value
  if (DEMO_MODE) {
    response.cookies.set('authjs.session-token', 'demo-preview-token', {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    })
    // Tag the request so components can show the demo banner
    response.headers.set('x-demo-mode', '1')
  }

  if (request.headers.get('Sec-GPC') === '1') {
    response.cookies.set('gpc_detected', '1', {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: false,
    })
  }

  const isProtectedPage = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  const isProtectedApi  = PROTECTED_API_PATHS.some((p) => pathname.startsWith(p))

  if (!DEMO_MODE && (isProtectedPage || isProtectedApi)) {
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
    '/((?!_next/static|_next/image|favicon|public|api/auth|api/health|api/stripe/webhook).*)',
  ],
}
