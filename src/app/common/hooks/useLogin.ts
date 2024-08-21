import { useMutation } from '@tanstack/react-query'
import { setEmail } from '../store/slices/emailSlice'
import { useAppDispatch } from '../store/store'
import { Email, Login } from '../types/auth.type'
import { ErrorResponse } from '../types/error.type'
import { loginAction } from '../actions'

export function useLogin() {
    const dipatch = useAppDispatch()

    return useMutation<Email, ErrorResponse, Login>({
        mutationFn: async ({ username, password }) =>
            await loginAction(username, password),
        mutationKey: ['login'],
        onSuccess: ({ email }) => {
            dipatch(setEmail(email))
        },
    })
}
