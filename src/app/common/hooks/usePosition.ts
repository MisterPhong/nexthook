import { httpClient } from '@/app/common/services/httpClient'
import axios from 'axios'
import { server } from '../constant/server'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { useQuery } from 'react-query'
import { PositionResponse } from '../types/position.type'

async function profile(): Promise<PositionResponse[]> {
    try {
        const response = await httpClient.get<PositionResponse[]>(server.query_order)
        console.log(response.data)
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

export function usePosition() {
    return useQuery<PositionResponse[], ErrorResponse>('position', profile, {
        retry: false,
    })
}