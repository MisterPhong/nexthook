'use server'

import { ZodError } from 'zod'
import { State } from '../types/state.type'
import axios from 'axios'
import { Apikey } from '../types/apikey.type'
import { httpClient } from '../services/httpClient'
import { server } from '../constant/server'
import { cookies } from 'next/headers'
import { cookieKey } from '../constant/cookie'
import { OK } from '../types/auth.type'

const cookie = cookies()

export async function apiKeyAction(
    prevState: State | null,
    payload: Apikey
): Promise<State | null> {
    try {
        if (!payload.apiKey || !payload.secretKey) {
            return {
                status: 'error',
                message: 'required',
            }
        }

        const accessToken = cookie.get(cookieKey.accessToken)?.value
        if (!accessToken) {
            return {
                status: 'error',
                message: 'not found accessToken',
            }
        }

        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }

        const response = await httpClient.post<OK>(
            server.createKey,
            payload,
            config
        )

        return {
            message: response.data.message,
            status: 'success',
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // ดึงข้อมูลจาก error.response.data
            const errorData = error.response.data

            return {
                status: 'error',
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
