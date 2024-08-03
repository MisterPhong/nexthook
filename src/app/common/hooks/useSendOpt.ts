import { httpClient } from '@/app/common/services/httpClient'
import { server } from '../constant/server'
import { useMutation } from 'react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Otp } from '../types/otp.type'
import axios from 'axios'
import { useAppDispatch } from '../store/store'

async function postOtp(otp: number): Promise<Otp> {
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
    return useMutation<Otp, ErrorResponse, number>(
        async (payload) => await postOtp(payload),
        {
            onSuccess: () => {},
        }
    )
}
