import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Apikey } from '../types/apikey.type'
import axios from 'axios'
import { httpClient } from '../services/httpClient'
import { server } from '../constant/server'
import { keys } from '../constant/key'

async function getKey(): Promise<Apikey> {
    try {
        const response = await httpClient.post<Apikey>(server.key)
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
        queryKey: [keys.key],
        queryFn: getKey,
    })
}
