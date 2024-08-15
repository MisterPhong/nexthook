import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { setEmail } from '../store/slices/emailSlice'
import { useAppDispatch } from '../store/store'
import { Email, Login } from '../types/auth.type'
import { ErrorResponseSchema, ErrorResponse } from '../types/error.type'

async function login(username: string, password: string): Promise<Email> {
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

export function useLogin() {
    const dipatch = useAppDispatch()

    return useMutation<Email, ErrorResponse, Login>({
        mutationFn: async ({ username, password }) =>
            await login(username, password),
        mutationKey: ['login'],
        onSuccess: ({ email }) => {
            dipatch(setEmail(email))
        },
    })
}
