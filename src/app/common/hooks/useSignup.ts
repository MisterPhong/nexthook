import { useMutation } from "react-query";
import { Email, Signup } from "../types/auth.type";
import { httpClient } from "@/app/common/services/httpClient";
import { server } from "../constant/server";
import { ErrorResponse, ErrorResponseSchema } from "../types/error.type";
import axios from "axios";
import { useAppDispatch } from "../store/store";
import { setEmail } from "../store/slices/emailSlice";

async function signup(payload: Signup): Promise<Email> {
  try {
    const response = await httpClient.post(server.signup, {
      email: payload.email,
      username: payload.username,
      password: payload.password,
    });
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

export function useSignup() {
  const dispatch = useAppDispatch();

  return useMutation<Email, ErrorResponse, Signup>(
    async (payload) => await signup(payload),
    {
      onSuccess: (data) => {
        dispatch(setEmail(data.email));
      },
    }
  );
}
