import { useMutation } from '@tanstack/react-query'
import { setEmail } from '../store/slices/emailSlice'
import { useAppDispatch } from '../store/store'
import { Signup, Email } from '../types/auth.type'
import { ErrorResponse } from '../types/error.type'
import { signupAction } from '../actions'

export function useSignup() {
    const dispatch = useAppDispatch()

    return useMutation<Email, ErrorResponse, Signup>({
        mutationFn: async (payload) => await signupAction(payload),
        mutationKey: ['signup'],
        onSuccess: ({ email }) => {
            dispatch(setEmail(email))
        },
    })
}
