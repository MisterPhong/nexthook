import { useMutation } from '@tanstack/react-query'
import { Email } from '../types/auth.type'
import { ErrorResponse } from '../types/error.type'
import { challengeAction } from '../actions'

export function useChallenge() {
    return useMutation<void, ErrorResponse, Email>({
        mutationFn: async (payload) => await challengeAction(payload),
        mutationKey: ['challenge'],
    })
}
