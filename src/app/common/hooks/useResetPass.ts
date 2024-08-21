import { useMutation } from '@tanstack/react-query'
import { ResetPassword } from '../types/auth.type'
import { ErrorResponse } from '../types/error.type'
import { resetPassAction } from '../actions'

export function useResetPass() {
    return useMutation<void, ErrorResponse, ResetPassword>({
        mutationFn: async (payload) => await resetPassAction(payload),
        mutationKey: ['reset pass'],
    })
}
