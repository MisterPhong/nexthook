import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ErrorResponse, ErrorResponseSchema } from '../types/error.type'
import { io } from 'socket.io-client'
import { AppDispatch, useAppDispatch } from '../store/store'
import {
  setAddNotify,
  setIsReadNotification,
} from '../store/slices/notitySlice'
import { Notify } from '../types/notify.type'
import { httpClient } from '@/app/common/services/httpClient'
import { server } from '../constant/server'
import { getCookies } from '../actions/cookie-action'

async function fetchNotifications(): Promise<Notify[]> {
  try {
    const res = await httpClient.get<Notify[]>(server.notification)
    return res.data
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

export function useNotification() {
  const dispatch = useAppDispatch()

  return useQuery<Notify[], ErrorResponse>('notification', fetchNotifications, {
    retry: false,
    onSuccess: (data) => {
      console.log(data)
      dispatch(setIsReadNotification(data))
    },
  })
}

// ฟังก์ชันสำหรับเปิดการเชื่อมต่อ WebSocket และรอรับการแจ้งเตือน
async function realNotify(dispatch: AppDispatch): Promise<Notify> {
  const accessToken = await getCookies('access_token')

  return new Promise((resolve, reject) => {
    // const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmE4ZjNhYjExOTgxMDc2NjdmOGZkMWQiLCJ1c2VybmFtZSI6InRoZXdhcmF0LnRhbzE5QGdtYWlsLmNvbSIsImlhdCI6MTcyMjQxMTA2NiwiZXhwIjoxNzIyNDk3NDY2fQ.syE598gUcW8KgCav4IAACxZglF36Z5xgjT8Jg8voqV8`

    const socket = io('http://localhost:8002', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}` // Use access token from cookies
          }
        }
      }
    })

    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    // Event listener for incoming messages
    socket.on('notification', (msg) => {
      dispatch(setAddNotify(msg))
      console.log('Received notification:', msg)
      resolve(msg)
    })

    socket.on('error', (error) => {
      reject(error)
    })
  })
}

export function useRealNotify() {
  const dispatch = useAppDispatch()

  return useQuery<Notify, ErrorResponse>(
    'real-notify',
    () => realNotify(dispatch),
    {
      refetchInterval: false, // Disable automatic refetching
      refetchOnWindowFocus: false, // Disable refetching on window focus
    }
  )
}

async function updateIsRead(): Promise<void> {
  try {
    const res = await httpClient.patch<void>(server.notification)
    return res.data
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

export function useUpdateIsRead() {
  const queryClient = useQueryClient()

  return useMutation<void, ErrorResponse, void>(
    async () => await updateIsRead(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notification')
      },
    }
  )
}

async function deleteNotify(id: string): Promise<void> {
  try {
    const res = await httpClient.delete<void>(
      `${server.notification}/${id}`
    )
    return res.data
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

export function useDeleteNotify() {
  const queryClient = useQueryClient()

  return useMutation<void, ErrorResponse, string>(
    async (id: string) => await deleteNotify(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notification')
      },
    }
  )
}
