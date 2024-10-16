import { NextRequest, NextResponse } from 'next/server'
import { routers } from './app/common/constant/path'
import { cookieKey } from './app/common/constant/cookie'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    // Check if the user is visiting the root path
    if (url.pathname === routers.root) {
        url.pathname = routers.landing
        return NextResponse.redirect(url)
    }

    // Check if the user is visiting the /login or /signup path
    if (url.pathname === routers.login || url.pathname === routers.signup) {
        const accessToken = request.cookies.get(cookieKey.accessToken)?.value
        if (accessToken) {
            url.pathname = routers.landing // Redirect to /app/predict if already logged in
            return NextResponse.redirect(url)
        }
    }

    // Check if the user is visiting the /app/position path
    if (url.pathname === routers.position || url.pathname === routers.profile) {
        const accessToken = request.cookies.get(cookieKey.accessToken)?.value
        if (!accessToken) {
            url.pathname = routers.landing // Redirect to /app/predict if no access token
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/app/position',
        '/app/profile',
        '/challenge',
        '/reset-password',
    ],
}
