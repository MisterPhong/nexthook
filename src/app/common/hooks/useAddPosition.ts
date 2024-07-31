import axios from "axios"
import { server } from "../constant/server"
import { httpClient } from "../services/httpClient"
import { ErrorResponse, ErrorResponseSchema } from "../types/error.type"
import { Position } from "../types/position.type"
import { useMutation } from "react-query"
import { OK } from "../types/auth.type"

async function order(payload: Position) {
    try {
        const response = await httpClient.post(server.order, {
            ...payload,
            type: 'EMA'
        })
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

export function useAddPosition() {
    return useMutation<OK, ErrorResponse, Position>(
        async (payload) => await order(payload),
        {
            onSuccess: (data) => {
                // dipatch(setEmail(data.email))
            }
        },
    )
}