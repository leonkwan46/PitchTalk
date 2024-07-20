import { RegisterInfoState } from '@/src/types/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: RegisterInfoState = {
    isTeacherOverlayOpen: false,
    isStatusOverlayOpen: false,
    isLogin: true,
    role: 'parent',
}

const registerInfoSlice = createSlice({
    name: 'registerInfo',
    initialState: {...initialState},
    reducers: {
        collectUserRole: (state, action) => {
            state.role = action.payload.role
        },
        openTeacherOverlay: (state) => {
            state.isTeacherOverlayOpen = true
        },
        closeTeacherOverlay: (state) => {
            state.isTeacherOverlayOpen = false
        },
        openStatusOverlay: (state) => {
            state.isStatusOverlayOpen = true
        },
        closeStatusOverlay: (state) => {
            state.isStatusOverlayOpen = false
        },
        changeToLogin: (state) => {
            state.isLogin = true
        },
        changeToRegister: (state) => {
            state.isLogin = false
        }
    }
})

export const {
    collectUserRole,
    openTeacherOverlay,
    closeTeacherOverlay,
    openStatusOverlay,
    closeStatusOverlay,
    changeToLogin,
    changeToRegister
} = registerInfoSlice.actions
export default registerInfoSlice.reducer