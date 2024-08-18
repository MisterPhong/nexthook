import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import emailReducer from './slices/emailSlice'
import profileReducer from './slices/profileSlice'
import notificationReducer from './slices/notiticationSlice'
import forgotReducer from './slices/forgotSlice'
import positionReducer from './slices/positionSlicen'

const reducer = {
    emailReducer,
    profileReducer,
    notificationReducer,
    forgotReducer,
    positionReducer,
}

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
