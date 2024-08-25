import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'
import { OK, Profile } from '../../types/auth.type'
import { ErrorResponse, ErrorResponseSchema } from '../../types/error.type'
import { getCookies } from '../../actions/cookie-action'
import { server } from '../../constant/server'
import { httpClient } from '../../services/httpClient'

type ProfileState = {
    result: Profile | undefined
    isPending: boolean
    isError: boolean
    error: ErrorResponse | undefined
}

const initialState: ProfileState = {
    result: undefined,
    isPending: true,
    isError: false,
    error: undefined,
}

export const logoutAsync = createAsyncThunk<
    OK,
    void,
    { rejectValue: ErrorResponse }
>('logout/logoutAsync', async (_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLogout())
        const response = await httpClient.post<OK>(server.logout, {})
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

export const profileAsync = createAsyncThunk<
    Profile | undefined,
    void,
    { rejectValue: ErrorResponse }
>('profile/profileAsync', async (_, { rejectWithValue }) => {
    try {
        const refreshToken = await getCookies('refresh_token')
        if (!refreshToken) {
            return undefined
        }

        const response = await httpClient.get<Profile>(server.profile)
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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setLogout(state: ProfileState) {
            state.result = undefined
        },
    },
    extraReducers(builder) {
        builder.addCase(
            profileAsync.fulfilled,
            (
                state: ProfileState,
                action: PayloadAction<Profile | undefined>
            ) => {
                state.result = action.payload
                state.isError = false
                state.isPending = false
                state.error = undefined
            }
        )
        builder.addCase(profileAsync.pending, (state: ProfileState) => {
            state.result = undefined
            state.isError = false
            state.isPending = true
            state.error = undefined
        })
        builder.addCase(
            profileAsync.rejected,
            (
                state: ProfileState,
                action: PayloadAction<ErrorResponse | undefined>
            ) => {
                state.result = undefined
                state.isError = false
                state.isPending = false
                state.error = action.payload as ErrorResponse
            }
        )
    },
})

export const { setLogout } = profileSlice.actions
export const profileSelector = (store: RootState) => store.profileReducer
export default profileSlice.reducer
