'use server'
import { cookies } from 'next/headers'

export async function getCookies(cookie: string): Promise<string | undefined> {
    const cookieStore = cookies()
    const accessToken = cookieStore.get(cookie)
    return accessToken?.value
}