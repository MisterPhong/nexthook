import { httpClient } from "@/app/_components/services/httpClient"
import axios from "axios"
import { server } from "../constant/server"
import { OK } from "../types/auth.type"
import { ErrorResponse, ErrorResponseSchema } from "../types/error.type"
import { useMutation } from "react-query"
import { useAppDispatch } from "../store/store"
import { setStatus } from "../store/slices/authSlice"

async function logout(): Promise<OK> {
    try {
        console.log('hello world')
        const response = await httpClient.post(server.logout, {})
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(error.response.data)
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

    return useMutation<OK, ErrorResponse, void>(
        async () => await logout(),
        {
            onSuccess: () => {
                dispatch(setStatus(false))
            }
        }
    )
}