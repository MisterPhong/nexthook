import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { Predict } from '../types/predict.type'
import axios from 'axios'
import { httpClient } from '../services/httpClient'
import { keys } from '../constant/key'
import { server } from '../constant/server'

export async function predict(): Promise<Predict> {
    try {
        const response = await httpClient.get<Predict>(server.predict)

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
        queryKey: [keys.predict],
        queryFn: predict,
    })
}

// export type Predict =
//     | {
//           date: Date
//           symbols: Symbol[]
//       }
//     | Error

// export type Error = {
//     statusCode: string
//     message: string
// }

// export type Symbol = {
//     symbol: string
//     actualPrice: number
//     predictedPrice: number
// }
