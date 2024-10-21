import axios from 'axios'
import { server } from '../constant/server'
import { httpClient } from '../services/httpClient'
import { OK } from '../types/auth.type'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Apikey } from '../types/apikey.type'
import { keys } from '../constant/key'

async function addKey(payload: Apikey): Promise<OK> {
    try {
        console.log('hello world')
        const response = await httpClient.post<OK>(server.createKey, payload)
        return response.data
    } catch (error) {
        console.log(error)
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

export function useAddKey() {
    const queryClient = useQueryClient()

    return useMutation<OK, ErrorResponse, Apikey>({
        mutationFn: async (payload) => await addKey(payload),
        mutationKey: ['add-key'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [keys.key] })
        },
    })
}
