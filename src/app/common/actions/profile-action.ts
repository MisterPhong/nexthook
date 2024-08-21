'use server'

import { cookies } from 'next/headers'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { Profile } from '../types/auth.type'

const cookieStore = cookies()

export async function profileAction(): Promise<Profile | undefined> {
    const refreshToken = cookieStore.get('refresh_token')
    if (!refreshToken) {
        return undefined
    }
    const response = await httpClient.get<Profile>(server.profile)
    return response.data
}
