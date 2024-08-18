import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type ForgotState = {
  email: string | undefined
  load: boolean
}

const initialState: ForgotState = {
  email: undefined,
  load: true,
}

const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {
    setForgotEmail(state: ForgotState, action: PayloadAction<string>) {
      state.email = action.payload
      state.load = false
    },
  },
})

export const { setForgotEmail } = forgotSlice.actions
export const forgotSelector = (store: RootState) => store.forgotReducer
export default forgotSlice.reducer
