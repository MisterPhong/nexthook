'use server'

import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { Email } from '../types/auth.type'
import { ErrorResponseSchema } from '../types/error.type'

export async function login(
    username: string,
    password: string
): Promise<Email> {
    try {
        const response = await httpClient.post(server.login, {
            username,
            password,
        })
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
