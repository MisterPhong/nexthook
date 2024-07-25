import {
    PayloadAction,
    createSlice
} from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Profile } from "../../types/auth.type"



type ProfileState = {
    result: Profile | undefined
}

const initialState: ProfileState = {
    result: undefined,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state: ProfileState, action: PayloadAction<Profile>) {
            state.result = action.payload
        },
        setLogout(state:ProfileState){
            state.result = undefined
        }
    },
})

export const { setProfile,setLogout } = profileSlice.actions
export const profileSelector = (store: RootState) => store.profileReducer
export default profileSlice.reducer
