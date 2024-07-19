import {
    PayloadAction,
    createSlice
} from "@reduxjs/toolkit"
import { RootState } from "../store"

type EmailState = {
    email: string | undefined
    load: boolean
}

const initialState: EmailState = {
    email: undefined,
    load: true
}

const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        setEmail(state: EmailState, action: PayloadAction<string>) {
            state.email = action.payload
            state.load = false
        }
    },
})

export const { setEmail } = emailSlice.actions
export const emailSelector = (store: RootState) => store.emailReducer
export default emailSlice.reducer
