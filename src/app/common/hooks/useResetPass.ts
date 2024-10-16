import { useMutation } from '@tanstack/react-query'
import { ResetPassword } from '../types/auth.type'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { keys } from '../constant/key'

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
        mutationKey: [keys.resetPass],
        mutationFn: async (payload) => await resetPass(payload),
    })
}
