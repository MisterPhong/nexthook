'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { httpClient } from '../_components/services/httpClient'
import { Login } from '../common/types/login.type'
import { server } from '../common/constant/server'

const cookie = cookies()

export const handleSignin = async ({ username, password }: Login) => {
    try {
        console.log(username, password)
        const response = await httpClient.post(server.login, { username, password })
        console.log(response.data.email)
        const cookies = response.headers['set-cookie']
        const userId = cookies![0].split(';')[0].split('=')[1]
        cookie.set('user_id', userId)
        return {
            email: response.data.email
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data.statusCode === 401) {
                return {
                    message: "Unauthorized",
                    statusCode: 401
                }
            }
        }
        return {
            message: "Internal server error",
            statusCode: 500
        }
    }
}