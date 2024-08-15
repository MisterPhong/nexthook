import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { Email } from '../types/auth.type'
import { ErrorResponseSchema, ErrorResponse } from '../types/error.type'

async function challenge(payload: Email): Promise<void> {
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

export function useChallenge() {
    return useMutation<void, ErrorResponse, Email>({
        mutationFn: async (payload) => await challenge(payload),
        mutationKey: ['challenge'],
    })
}
