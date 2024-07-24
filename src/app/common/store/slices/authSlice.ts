import {
    PayloadAction,
    createSlice
} from "@reduxjs/toolkit"
import { RootState } from "../store"

type StatusState = {
    status: boolean
    load: boolean
}

const initialState: StatusState = {
    status: false,
    load: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setStatus(state: StatusState, action: PayloadAction<boolean>) {
            state.status = action.payload
            state.load = false
        }
    },
})

export const { setStatus } = authSlice.actions
export const authSelector = (store: RootState) => store.authReducer
export default authSlice.reducer
