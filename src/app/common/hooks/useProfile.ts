import { httpClient } from "@/app/common/services/httpClient";
import axios from "axios";
import { server } from "../constant/server";
import { Profile } from "../types/auth.type";
import { ErrorResponse, ErrorResponseSchema } from "../types/error.type";
import { useQuery } from "react-query";
import { useAppDispatch } from "../store/store";
import { setProfile } from "../store/slices/profileSlice";
import { parseCookies } from "nookies"; // ใช้สำหรับการอ่าน cookies

async function profile(): Promise<Profile | null> {
  const cookies = parseCookies(); // อ่าน cookies
  const hasRefreshToken = !!cookies.refresh_token;

  if (!hasRefreshToken) {
    return null;
  }

  try {
    const response = await httpClient.get<Profile>(server.profile, {});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const parsedError = ErrorResponseSchema.safeParse(error.response.data);
      if (!parsedError.success) {
        throw new Error("Unexpected error format");
      }
      throw parsedError.data;
    }
    throw new Error("Network or unexpected error");
  }
}

export function useProfile() {
  const dispatch = useAppDispatch();
  const cookies = parseCookies(); // อ่าน cookies

  // ตรวจสอบว่า refresh_token มีอยู่ใน cookies หรือไม่
  const hasRefreshToken = !!cookies.refresh_token;

  return useQuery<Profile | null, ErrorResponse>("profile", profile, {
    retry: hasRefreshToken,
    onSuccess: (data) => {
      if (data) {
        dispatch(setProfile(data));
      }
    },
  });
}
