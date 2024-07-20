import { getErrorMessage } from '@/src/helpers/errorHandlingHelper'
import { AuthState, StatusState, UserState } from '@/src/types/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserStatePayload {
    user: UserState
    token: string
}

interface SignUpPayload {
    email: string
    password: string
    confirmPassword: string
}

interface LoginPayload {
    email: string
    password: string
}

interface UpdateUserPayload {
    name: string
    DoB: string
    gender: string
    isGeneralFormComplete: boolean
}

interface AuthInvitationPayload {
    token: string
    invitationCode: string
}

interface UpdateTeacherDocumentsPayload {
    document: Blob
}

const initialState: AuthState = {
    user: {
        userId: '',
        email: '',
        role: '',
        token: '',

        // Basic
        name: '',
        DoB: '',
        gender: '',
        isRegistered: false,
        isGeneralFormComplete: false,

        // Parent
        isInvited: false,
        isInvitationVerified: false,

        // Teacher
        isDocUploaded: false,
        isDocVerified: false,
    },
    status: {
        isLoading: false,
        error: null,
    }
}
export const signUpUser = createAsyncThunk<
        UserStatePayload,
        SignUpPayload,
        { rejectValue: string }
    >(
        'auth/signUpUser',
        async (userData, { rejectWithValue }) => {
            try {
                const response = await axios.post('http://localhost:6000/signup', userData)
                return response.data
            } catch (error) {
                return rejectWithValue(getErrorMessage(error))
            }
        }
    )

export const loginUser = createAsyncThunk<
        UserStatePayload,
        LoginPayload,
        { rejectValue: string }
    >(
        'auth/loginUser',
        async (userData, { rejectWithValue }) => {
            try {
                const response = await axios.post('http://localhost:6000/login', userData)
                return response.data
            } catch (error) {
                return rejectWithValue(getErrorMessage(error))
            }
        }
    )

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData: UpdateUserPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:6000/signup/extra_details', userData)
            return response.data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

export const authInvitationCode = createAsyncThunk(
    'session/authInvitationCode',
    async (codeData: AuthInvitationPayload, { rejectWithValue }) => {
        const { token, invitationCode } = codeData
        try {
            const response = await axios.post(
                'http://localhost:6000/signup/extra_details/auth_invitation',
                { invitationCode },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

export const updateTeacherDocuments = createAsyncThunk(
    'auth/updateTeacherDocuments',
    async (teacherData: UpdateTeacherDocumentsPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:6000/signup/extra_details/upload', teacherData)
            return response.data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error))
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {...initialState},
    reducers: {
        clearAuthStates: (state) => {
            state.user = {
                userId: '',
                email: '',
                role: '',
                token: '',
                name: '',
                DoB: '',
                gender: '',
                isRegistered: false,
                isGeneralFormComplete: false,
                isInvited: false,
                isInvitationVerified: false,
                isDocUploaded: false,
                isDocVerified: false,
            }
            state.status.isLoading = false
            state.status.error = null
        },
        clearAuthRequestStatus: (state) => {
            state.status.isLoading = false
            state.status.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // SignUp Status
            .addCase(signUpUser.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user.token = action.payload.token
                state.user.userId = action.payload.user.userId
                state.user.email = action.payload.user.email
                state.user.role = action.payload.user.role

                // Basic Info
                state.user.name = action.payload.user.name
                state.user.DoB = action.payload.user.DoB
                state.user.gender = action.payload.user.gender
                state.user.isRegistered = action.payload.user.isRegistered
                state.user.isGeneralFormComplete = action.payload.user.isGeneralFormComplete
                
                if (action.payload.user.role === 'teacher') {
                    // Teacher Info
                    state.user.isDocUploaded = action.payload.user.isDocUploaded
                    state.user.isDocVerified = action.payload.user.isDocVerified
                } else if (action.payload.user.role === 'parent') {
                    // Parent Info
                    state.user.isInvited = action.payload.user.isInvited
                    state.user.isInvitationVerified = action.payload.user.isInvitationVerified
                }

                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.user = {
                    userId: '',
                    email: '',
                    role: '',
                    token: '',
                    name: '',
                    DoB: '',
                    gender: '',
                    isRegistered: false,
                    isGeneralFormComplete: false,
                    isInvited: false,
                    isInvitationVerified: false,
                    isDocUploaded: false,
                    isDocVerified: false,
                }
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Login Status
            .addCase(loginUser.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user.token = action.payload.token
                state.user.userId = action.payload.user.userId
                state.user.email = action.payload.user.email
                state.user.role = action.payload.user.role
                
                // Basic Info
                state.user.name = action.payload.user.name
                state.user.DoB = action.payload.user.DoB
                state.user.gender = action.payload.user.gender
                state.user.isRegistered = action.payload.user.isRegistered
                state.user.isGeneralFormComplete = action.payload.user.isGeneralFormComplete
                
                if (action.payload.user.role === 'teacher') {
                    // Teacher Info
                    state.user.isDocUploaded = action.payload.user.isDocUploaded
                    state.user.isDocVerified = action.payload.user.isDocVerified
                } else if (action.payload.user.role === 'parent') {
                    // Parent Info
                    state.user.isInvited = action.payload.user.isInvited
                    state.user.isInvitationVerified = action.payload.user.isInvitationVerified
                }

                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = {
                    userId: '',
                    email: '',
                    role: '',
                    token: '',
                    name: '',
                    DoB: '',
                    gender: '',
                    isRegistered: false,
                    isGeneralFormComplete: false,
                    isInvited: false,
                    isInvitationVerified: false,
                    isDocUploaded: false,
                    isDocVerified: false,
                }
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Update User Status
            .addCase(updateUser.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user.name = action.payload.name,
                state.user.DoB = action.payload.DoB,
                state.user.gender = action.payload.gender,
                state.user.isGeneralFormComplete = action.payload.isGeneralFormComplete
                state.status.isLoading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.user = {
                    ...state.user,
                    name: '',
                    DoB: '',
                    gender: '',
                }
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Auth Invitation Code
            .addCase(authInvitationCode.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(authInvitationCode.fulfilled, (state, action) => {
                state.user.isInvitationVerified = true
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(authInvitationCode.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Update Teacher Status
            .addCase(updateTeacherDocuments.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(updateTeacherDocuments.fulfilled, (state) => {
                state.user.isDocUploaded = true
                state.status.isLoading = false
            })
            .addCase(updateTeacherDocuments.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })
    }
})

export const { clearAuthStates, clearAuthRequestStatus } = authSlice.actions
export default authSlice.reducer