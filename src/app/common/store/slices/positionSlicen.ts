import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'
import { server } from '../../constant/server'
import { ErrorResponse, ErrorResponseSchema } from '../../types/error.type'
import { httpClient } from '../../services/httpClient'
import { Position } from '../../types/position.type'
import { OK } from '../../types/auth.type'
import { v4 as uuidv4 } from 'uuid'

type PositionState = {
    result: Position[]
    isPending: boolean
    isError: boolean
    error: ErrorResponse | undefined
}

const initialState: PositionState = {
    result: [],
    isPending: true,
    isError: false,
    error: undefined,
}

export const positionAsync = createAsyncThunk<
    Position[],
    void,
    { rejectValue: ErrorResponse }
>('position/positionAsync', async (_, { rejectWithValue }) => {
    try {
        const response = await httpClient.get<Position[]>(server.position)
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

export const positionAddAsync = createAsyncThunk<
    OK,
    Position,
    { rejectValue: ErrorResponse }
>(
    'positionAdd/positionAddAsync',
    async (
        { symbol, leverage, quantity, timeframe, ema, type },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const payload: Position = {
                symbol,
                leverage,
                quantity,
                timeframe,
                ema,
                type,
                id: uuidv4(),
                created_at: new Date().toISOString(),
            }
            dispatch(setAdd(payload))
            const response = await httpClient.post<OK>(server.createPosition, {
                symbol,
                leverage,
                quantity,
                timeframe,
                ema,
                type,
            })
            if (response.data.message !== 'Success') {
                // กำหนดข้อผิดพลาดแบบ custom และส่งไปยัง rejectWithValue
                return rejectWithValue({
                    message: 'Operation failed',
                    statusCode: response.status,
                    error: null,
                })
            }
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
    }
)

const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
        setAdd(state: PositionState, action: PayloadAction<Position>) {
            state.result.push(action.payload)
        },
    },
    extraReducers(builder) {
        builder.addCase(
            positionAsync.fulfilled,
            (state: PositionState, action: PayloadAction<Position[]>) => {
                state.result = action.payload
                state.isError = false
                state.isPending = false
                state.error = undefined
            }
        )
        builder.addCase(positionAsync.pending, (state: PositionState) => {
            state.result = []
            state.isError = false
            state.isPending = true
            state.error = undefined
        })
        builder.addCase(
            positionAsync.rejected,
            (
                state: PositionState,
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

export const { setAdd } = positionSlice.actions
export const positionSelector = (store: RootState) => store.positionReducer
export default positionSlice.reducer
