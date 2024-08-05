import { useMutation } from 'react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { ResetPassword } from '../types/auth.type'
import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'

async function resetPassword({ token, password }: ResetPassword): Promise<void> {
    try {
        const response = await httpClient.post(
            `${server.resetPassword}/${token}`,
            { password }
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

export function useResetPassword() {
    return useMutation<void, ErrorResponse, ResetPassword>(
        async (payload) => await resetPassword(payload)
    )
}
