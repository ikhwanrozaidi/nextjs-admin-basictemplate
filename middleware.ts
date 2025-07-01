import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow access to auth pages
  if (pathname === "/signin" || pathname === "/forgot-password") {
    return NextResponse.next();
  }

  // Check if user has stored credentials
  const email = request.cookies.get("userEmail")?.value;
  const password = request.cookies.get("userPassword")?.value;

  // If no credentials and trying to access protected routes, redirect to signin
  if ((!email || !password) && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
