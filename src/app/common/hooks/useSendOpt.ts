import { httpClient } from "@/app/_components/services/httpClient"
import { server } from "../constant/server"
import { useMutation, useQueryClient } from 'react-query'
import { ErrorResponse } from "../types/error.type"
import { Otp } from "../types/otp.type"
import axios, { AxiosError, AxiosResponse } from "axios"

async function postOtp(otp: number): Promise<Otp> {
    const response: AxiosResponse<Otp> = await httpClient.post<Otp>(server.otp, { otp });
    return response.data;
}

export function useSendOtp() {
    return useMutation<Otp, ErrorResponse, number>(
        postOtp, {
        onError: (error: ErrorResponse) => {
            // จัดการข้อผิดพลาดที่นี่
            console.error("Error occurred:", error);
        },
        onSuccess: (data: Otp) => {
            // จัดการผลลัพธ์ที่ได้จากการร้องขอที่สำเร็จที่นี่
            console.log("Success:", data);
        }
    })
}