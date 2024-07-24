import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routers } from './app/common/constant/path'
import { cookieKey } from './app/common/constant/cookie'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    // Check if the user is visiting the root path
    if (url.pathname === routers.root) {
        url.pathname = routers.predict
        return NextResponse.redirect(url)
    }

    // Check if the user is visiting the /otp path
    if (url.pathname === routers.otp) {
        const userId = request.cookies.get(cookieKey.userId)
        if (!userId) {
            url.pathname = routers.login // Redirect to login page or any other page
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [routers.root, routers.otp],
}
