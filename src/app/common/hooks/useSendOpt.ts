import { useMutation } from '@tanstack/react-query'
import { ErrorResponse } from '../types/error.type'
import { Otp } from '../types/otp.type'
import { sendOneTimePassAction } from '../actions'

export function useSendOtp() {
    return useMutation<Otp, ErrorResponse, number>({
        mutationFn: async (payload) => await sendOneTimePassAction(payload),
        mutationKey: ['sent-otp'],
    })
}
