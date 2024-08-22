import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'
import { ErrorResponse, ErrorResponseSchema } from '../../types/error.type'
import {
    NotificationElement,
    Notification,
} from '../../types/notification.type'
import { server } from '../../constant/server'
import { httpClient } from '../../services/httpClient'

type NotificationState = {
    result: Notification | undefined
    isPending: boolean
    isError: boolean
    error: ErrorResponse | undefined
    isDisabled: boolean
}

const initialState: NotificationState = {
    result: undefined,
    isPending: true,
    isError: false,
    error: undefined,
    isDisabled: false,
}

export const notificationAsync = createAsyncThunk<
    Notification,
    void,
    { rejectValue: ErrorResponse }
>('notification/notificationAsync', async (_, { rejectWithValue }) => {
    try {
        const response = await httpClient.get<Notification>(server.notification)
        return response.data
    } catch (error) {
        // Handling error logic remains the same
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                return rejectWithValue(parsedError.data)
            } else {
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
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
        await httpClient.patch<void>(server.notification)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                return rejectWithValue(parsedError.data)
            } else {
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
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
        await httpClient.delete<void>(`${server.notification}/${id}`)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const parsedError = ErrorResponseSchema.safeParse(
                error.response.data
            )
            if (parsedError.success) {
                return rejectWithValue(parsedError.data)
            } else {
                return rejectWithValue({
                    message: 'Unexpected error format',
                    statusCode: 500,
                    error: null,
                })
            }
        }
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
            if (state.result) {
                state.result.notifications = state.result.notifications.map(
                    (item) => ({
                        ...item,
                        isReaded: true,
                    })
                )
            }
        },
        setPop(state: NotificationState, action: PayloadAction<string>) {
            if (state.result) {
                state.result.notifications = state.result.notifications.filter(
                    (item) => item._id !== action.payload
                )
            }
        },
        setAddNotification(
            state: NotificationState,
            action: PayloadAction<NotificationElement>
        ) {
            if (state.result) {
                state.result.notifications.push(action.payload)
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(
            notificationAsync.fulfilled,
            (state: NotificationState, action: PayloadAction<Notification>) => {
                state.result = action.payload
                state.isError = false
                state.isPending = false
                state.error = undefined
            }
        )
        builder.addCase(
            notificationAsync.pending,
            (state: NotificationState) => {
                state.result = undefined
                state.isError = false
                state.isPending = true
                state.error = undefined
            }
        )
        builder.addCase(
            notificationAsync.rejected,
            (state: NotificationState, action) => {
                state.result = undefined
                state.isError = true
                state.isPending = false
                state.error = action.payload
            }
        )
    },
})

export const { setAllAsRead, setPop, setAddNotification } =
    notificationSlice.actions
export const notificationSelector = (store: RootState) =>
    store.notificationReducer
export default notificationSlice.reducer
