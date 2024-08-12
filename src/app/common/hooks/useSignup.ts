import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { server } from '../constant'
import { httpClient } from '../services'
import { useAppDispatch, setEmail } from '../store'
import { Signup, Email, ErrorResponseSchema, ErrorResponse } from '../types'

async function signup(payload: Signup): Promise<Email> {
    try {
        const response = await httpClient.post(server.signup, payload)
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

export function useSignup() {
    const dispatch = useAppDispatch()

    return useMutation<Email, ErrorResponse, Signup>({
        mutationFn: async (payload) => await signup(payload),
        mutationKey: ['signup'],
        onSuccess: ({ email }) => {
            dispatch(setEmail(email))
        },
    })
}
