import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  
  // Protected paths that require authentication
  const protectedPaths = ['/admin', '/dosen', '/mahasiswa'];

  // If user is not authenticated and trying to access protected routes
  if (!token && protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and trying to access auth pages
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Role-based access control
  if (token && protectedPaths.some(path => pathname.startsWith(path))) {
    // We can't decode token in middleware easily, so we'll handle this in components
    // This middleware just ensures authentication
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

