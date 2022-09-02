import type { NextRequest } from "next/server"

import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"


export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;
    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
        const url = req.nextUrl.clone();
        console.log(url)
        url.pathname = "/login";
        url.search = "";
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: "/",
    };