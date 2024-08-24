import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Apikey } from '../types/apikey.type'
import axios from 'axios'
import { httpClient } from '../services/httpClient'
import { server } from '../constant/server'

async function getKey() {
    try {
        const response = await httpClient.post(server.key)
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

export function useKey() {
    return useQuery<Apikey, ErrorResponse>({
        queryKey: ['key'],
        queryFn: getKey,
    })
}
