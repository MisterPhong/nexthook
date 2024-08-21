'use server'

import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { Email, OK, ResetPassword, Signup } from '../types/auth.type'
import { ErrorResponseSchema } from '../types/error.type'
import { Otp } from '../types/otp.type'


export async function challengeAction(payload: Email): Promise<void> {
    try {
        const response = await httpClient.post(server.forgotPassword, payload)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (!parsedError.success) {
                throw new Error('Unexpected error format')
            }
            throw parsedError.data
        }
        throw new Error('Network or unexpected error')
    }
}

export async function logoutAction(): Promise<OK> {
    const response = await httpClient.post<OK>(server.logout, {})
    return response.data
}
