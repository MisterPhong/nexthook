import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { server } from '../constant'
import { httpClient } from '../services'
import { Otp, ErrorResponseSchema, ErrorResponse } from '../types'

async function sendOneTimePass(otp: number): Promise<Otp> {
    try {
        const response = await httpClient.post<Otp>(server.otp, { otp: otp })
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

export function useSendOtp() {
    return useMutation<Otp, ErrorResponse, number>({
        mutationFn: async (payload) => await sendOneTimePass(payload),
        mutationKey: ['sent-otp'],
    })
}
