import { getErrorMessage } from '@/src/helpers/errorHandlingHelper'
import { SessionState, User } from '@/src/types/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface CodeData {
    email: string
    token: string
}

const initialState: SessionState = {
    user: {
        userId: '',
        email: '',
        role: '',
        token:'',
    },
    status: {
        isLoading: false,
        error: null,
    }
}

export const sendInvitationCode = createAsyncThunk<any, CodeData, { rejectValue: string }>(
    'session/sendInvitationCode',
    async (codeData, {rejectWithValue}) => {
        const { email, token } = codeData
        try {
            const response = await axios.post('http://localhost:5000/contacts/send_invitation', { email }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
            // Basic Info
            state.user.userId = action.payload.user.userId,
            state.user.email = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.user.token = action.payload.token
        },
        clearLoggedInRequestStatus: (state) => {
            state.status.isLoading = false
            state.status.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Send Invitation Code
            .addCase(sendInvitationCode.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(sendInvitationCode.fulfilled, (state, action) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(sendInvitationCode.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })
    }
})

export const {
    setUser,
    clearLoggedInRequestStatus
} = sessionSlice.actions

const sessionReducer = sessionSlice.reducer
export default sessionReducer