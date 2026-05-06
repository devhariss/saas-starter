import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];
const PROTECTED_API_PATHS = ["/api/user", "/api/stripe/checkout", "/api/stripe/portal"];

function applySecurityHeaders(response: NextResponse): NextResponse {
  const headers = response.headers;
  headers.set(
    "Content-Security-Policy",
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
    ].join("; ")
  );
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return response;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // GPC detection
  const gpc = request.headers.get("Sec-GPC");
  const response = NextResponse.next();

  if (gpc === "1") {
    response.cookies.set("gpc_detected", "1", {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  // Protect dashboard routes
  const isProtectedPath = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isProtectedApi = PROTECTED_API_PATHS.some((p) => pathname.startsWith(p));

  if (isProtectedPath || isProtectedApi) {
    const session = await auth();
    if (!session) {
      if (isProtectedApi) {
        return applySecurityHeaders(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        );
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|public|api/auth|api/health|api/stripe/webhook).*)",
  ],
};
