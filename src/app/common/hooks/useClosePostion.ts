import { Mutation, useMutation } from '@tanstack/react-query'
import { keys } from '../constant/key'
import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { ErrorResponseSchema } from '../types/error.type'

async function closePosition(id: string) {
    try {
        const response = await httpClient.post(
            `${server.closePosition}?id=${id}`
        )
        console.log(response.data)
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

export function useClosePosition() {
    return useMutation({
        mutationKey: [keys.closePostion],
        mutationFn: (id: string) => closePosition(id),
    })
}
