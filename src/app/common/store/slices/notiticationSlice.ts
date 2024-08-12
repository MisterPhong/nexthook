import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { httpClient } from '../../services'
import { server } from '../../constant'
import axios from 'axios'
import { ErrorResponse, ErrorResponseSchema, Notification } from '../../types'

type NotificationState = {
    result: Notification[]
    isReading: Notification[]
    isPending: boolean
    isError: boolean
    error: ErrorResponse | undefined
}

const initialState: NotificationState = {
    result: [],
    isReading: [],
    isPending: true,
    isError: false,
    error: undefined,
}

export const notificationAsync = createAsyncThunk<
    Notification[],
    void,
    { rejectValue: ErrorResponse }
>('notification/notificationAsync', async (_, { rejectWithValue }) => {
    try {
        const response = await httpClient.get<Notification[]>(
            server.notification
        )

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                // ส่งข้อผิดพลาดที่จัดการแล้วกลับไป
                return rejectWithValue(parsedError.data)
            } else {
                // ข้อผิดพลาดรูปแบบไม่ตรงตามที่คาดไว้
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
        // ข้อผิดพลาดทางเครือข่ายหรือตรวจจับไม่ได้
        return rejectWithValue({
            message: 'Network or unexpected error',
            statusCode: 500,
            error: null,
        })
    }
})

export const isReadedAsync = createAsyncThunk<
    void,
    void,
    { rejectValue: ErrorResponse }
>('isReaded/isReadedAsync', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setAllAsRead())
        const response = await httpClient.patch<void>(server.notification)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                // ส่งข้อผิดพลาดที่จัดการแล้วกลับไป
                return rejectWithValue(parsedError.data)
            } else {
                // ข้อผิดพลาดรูปแบบไม่ตรงตามที่คาดไว้
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
        // ข้อผิดพลาดทางเครือข่ายหรือตรวจจับไม่ได้
        return rejectWithValue({
            message: 'Network or unexpected error',
            statusCode: 500,
            error: null,
        })
    }
})

export const isDeletedAsync = createAsyncThunk<
    void,
    string,
    { rejectValue: ErrorResponse }
>('isDeleted/isDeletedAsync', async (id, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setPop(id))
        const response = await httpClient.delete<void>(
            `${server.notification}/${id}`
        )
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                // ส่งข้อผิดพลาดที่จัดการแล้วกลับไป
                return rejectWithValue(parsedError.data)
            } else {
                // ข้อผิดพลาดรูปแบบไม่ตรงตามที่คาดไว้
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
        // ข้อผิดพลาดทางเครือข่ายหรือตรวจจับไม่ได้
        return rejectWithValue({
            message: 'Network or unexpected error',
            statusCode: 500,
            error: null,
        })
    }
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setAllAsRead(state: NotificationState) {
            state.result = state.result.map((item) => ({
                ...item,
                isReaded: true,
            }))
        },
        setPop(state: NotificationState, action: PayloadAction<string>) {
            state.result = state.result.filter(
                (item) => item._id != action.payload
            )
        },
    },
    extraReducers(builder) {
        builder.addCase(
            notificationAsync.fulfilled,
            (
                state: NotificationState,
                action: PayloadAction<Notification[]>
            ) => {
                state.result = action.payload
                state.isError = false
                state.isPending = false
                state.error = undefined
            }
        )
        builder.addCase(
            notificationAsync.pending,
            (state: NotificationState) => {
                state.result = []
                state.isError = false
                state.isPending = true
                state.error = undefined
            }
        )
        builder.addCase(
            notificationAsync.rejected,
            (
                state: NotificationState,
                action: PayloadAction<ErrorResponse | undefined>
            ) => {
                state.result = []
                state.isError = false
                state.isPending = false
                state.error = action.payload as ErrorResponse
            }
        )
    },
})

export const { setAllAsRead, setPop } = notificationSlice.actions
export const notificationSelector = (store: RootState) =>
    store.notificationReducer
export default notificationSlice.reducer
