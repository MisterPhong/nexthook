import { httpClient } from '@/app/common/services/httpClient'
import axios from 'axios'
import { server } from '../constant/server'
import { Profile } from '../types/auth.type'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { useQuery } from 'react-query'
import { useAppDispatch } from '../store/store'
import { setProfile } from '../store/slices/profileSlice'
import { getCookies } from '../actions/cookie-action'

async function profile(): Promise<Profile | null> {
  const refreshToken = await getCookies('refresh_token')
  if (!refreshToken) return null

  try {
    const response = await httpClient.get<Profile>(server.profile)
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

export function useProfile() {
  const dispatch = useAppDispatch()

  return useQuery<Profile | null, ErrorResponse>('profile', profile, {
    retry: false,
    onSuccess: (data) => {
      if (data) {
        dispatch(setProfile(data))
      }
    },
  })
}
