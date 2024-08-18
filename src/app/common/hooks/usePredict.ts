import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Predict } from '../types/predict.type'
import axios from 'axios'
import { httpClient } from '../services/httpClient'

async function predict(): Promise<Predict> {
    try {
        const response = await httpClient.get<Predict>(
            'http://82.112.231.165/api/predict'
        )
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

export function usePredict() {
    return useQuery<Predict, ErrorResponse>({
        queryKey: ['predict'],
        queryFn: predict,
    })
}
