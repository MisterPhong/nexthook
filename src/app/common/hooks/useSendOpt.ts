import { useMutation } from '@tanstack/react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Otp } from '../types/otp.type'
import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { keys } from '../constant/key'

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
        mutationKey: [keys.sendOtp],
    })
}
