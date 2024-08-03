import { httpClient } from '@/app/common/services/httpClient'
import axios from 'axios'
import { server } from '../constant/server'
import { OK } from '../types/auth.type'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { useMutation } from 'react-query'
import { useAppDispatch } from '../store/store'
import { setLogout } from '../store/slices/profileSlice'

async function logout(): Promise<OK> {
    try {
        const response = await httpClient.post(server.logout, {})
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

export function useLogout() {
    const dispatch = useAppDispatch()

    return useMutation<OK, ErrorResponse, void>(async () => await logout(), {
        onSuccess: () => {
            dispatch(setLogout())
        },
    })
}
