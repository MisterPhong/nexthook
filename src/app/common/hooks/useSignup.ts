// import axios from 'axios'
// import { server } from '../constant/server'
// import { httpClient } from '../services/httpClient'
// import { Signup, Email } from '../types/auth.type'
// import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
// import { useMutation } from '@tanstack/react-query'
// import { setEmail } from '../store/slices/emailSlice'
// import { useAppDispatch } from '../store/store'

// async function signup(payload: Signup): Promise<Email> {
//     try {
//         const response = await httpClient.post(server.signup, payload)
//         return response.data
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response) {
//             const parsedError = ErrorResponseSchema.safeParse(
//                 error.response.data
//             )
//             if (!parsedError.success) {
//                 throw new Error('Unexpected error format')
//             }
//             throw parsedError.data
//         }
//         throw new Error('Network or unexpected error')
//     }
// }

// export function useSignup() {
//     const dispatch = useAppDispatch()

//     return useMutation<Email, ErrorResponse, Signup>({
//         mutationFn: async (payload) => await signup(payload),
//         mutationKey: ['signup'],
//         onSuccess: ({ email }) => {
//             dispatch(setEmail(email))
//         },
//     })
// }

import axios from 'axios';
import { server } from '../constant/server';
import { httpClient } from '../services/httpClient';
import { Signup, Email } from '../types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { setEmail } from '../store/slices/emailSlice';
import { useAppDispatch } from '../store/store';

async function signup(payload: Signup): Promise<Email> {
    try {
        const response = await httpClient.post(server.signup, payload);
        return response.data;
    } catch (error: any) {
        // Error handling
        if (axios.isAxiosError(error) && error.response) {
            throw {
                statusCode: error.response.status,
                message: error.response.data.message || 'Unexpected error occurred',
            };
        }
        throw new Error('Network or unexpected error');
    }
}

export function useSignup() {
    const dispatch = useAppDispatch();

    return useMutation<Email, any, Signup>({
        mutationFn: signup, // Directly using the signup function
        mutationKey: ['signup'],
        onSuccess: (data) => {
            // Dispatch the email to the store on successful signup
            dispatch(setEmail(data.email));
        },
        onError: (error: any) => {
            // You can handle error logging here if needed
            console.error('Signup error:', error);
            // Here you can also trigger a dialog or toast notification if necessary
        },
    });
}
