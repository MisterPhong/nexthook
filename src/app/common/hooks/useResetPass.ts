import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { ResetPassword, ErrorResponse, ErrorResponseSchema } from '../types'
import { server } from '../constant'
import { httpClient } from '../services'

async function resetPass({ password, token }: ResetPassword): Promise<void> {
    try {
        const response = await httpClient.post(
            `${server.resetPassword}/${token}`,
            {
                password,
            }
        )
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

export function useResetPass() {
    return useMutation<void, ErrorResponse, ResetPassword>({
        mutationFn: async (payload) => await resetPass(payload),
        mutationKey: ['reset pass'],
    })
}
