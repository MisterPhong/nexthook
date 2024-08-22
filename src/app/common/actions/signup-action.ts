'use server'

import axios from 'axios'
import { Email, Signup } from '../types/auth.type'
import { State } from '../types/state.type'
import { ZodError } from 'zod'
import { httpClient } from '../services/httpClient'
import { server } from '../constant/server'
import { cookies } from 'next/headers'

const cookie = cookies()

export async function signupAction(
    prevState: State | null,
    payload: Signup
): Promise<State | null> {
    try {
        const response = await httpClient.post<Email>(server.signup, payload)
        const cookies = response.headers['set-cookie']
        const userId = cookies![0].split(';')[0].split('=')[1]
        cookie.set('user_id', userId, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
            sameSite: 'strict',
        })

        return {
            status: 'success',
            message: response.data.email,
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // ดึงข้อมูลจาก error.response.data
            const errorData = error.response.data

            return {
                status: 'error',
                // message: errorData.message, // ใช้ข้อความจากข้อมูลข้อผิดพลาด
                message: errorData.message, // ใช้ข้อความจากข้อมูลข้อผิดพลาด
                errors: [
                    {
                        path: 'server',
                        message: errorData.message,
                    },
                ],
            }
        }

        // จัดการข้อผิดพลาดจาก ZodError
        if (error instanceof ZodError) {
            return {
                status: 'error',
                message: 'Invalid form data',
                errors: error.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: `Server validation: ${issue.message}`,
                })),
            }
        }

        // จัดการข้อผิดพลาดทั่วไป
        return {
            status: 'error',
            message: 'Something went wrong. Please try again.',
        }
    }
}
