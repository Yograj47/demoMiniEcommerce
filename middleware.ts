import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /auth/admin routes
    if (pathname.startsWith("/auth/admin")) {
        const authCookie = request.cookies.get("admin-auth");

        if (!authCookie || authCookie.value !== "true") {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/admin/:path*"],
};
