import { httpClient } from "@/app/_components/services/httpClient"
import { server } from "../constant/server"
import { useMutation, useQueryClient } from 'react-query'
import { ErrorResponse } from "../types/error.type"
import { Otp } from "../types/otp.type"
import { AxiosResponse } from "axios"

async function postOtp(otp: number): Promise<Otp> {
    const response: AxiosResponse<Otp> = await httpClient.post<Otp>(server.otp, { otp })
    return response.data
}

export function useSendOtp() {
    return useMutation<Otp, ErrorResponse, number>(postOtp)
}