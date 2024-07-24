import { useMutation } from 'react-query'
import { ErrorResponse } from 'react-router-dom'
import { setEmail } from '../store/slices/emailSlice'
import { Email, Login } from '../types/auth.type'
import { httpClient } from '@/app/_components/services/httpClient'
import { server } from '../constant/server'
import { useAppDispatch } from '../store/store'

async function login(username: string, password: string): Promise<Email> {
    const response = await httpClient.post(server.login, { username, password })
    return response.data
}

export function useLogin() {
    const dipatch = useAppDispatch()

    return useMutation<Email, ErrorResponse, Login>(
        async ({ username, password }) => await login(username, password),
        {
            onSuccess: (data) => {
                dipatch(setEmail(data.email))
            }
        },
    )
}