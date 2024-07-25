import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  userId: string
  email: string
  role: string
  token: string
}

interface SessionState {
  user: User
  status: {
    isLoading: boolean
    error: string | null
  }
}

const initialState: SessionState = {
  user: {
    userId: '',
    email: '',
    role: '',
    token: '',
  },
  status: {
    isLoading: false,
    error: null,
  },
}

const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = {
        userId: 'dummyUserId123',
        email: 'dummyemail@example.com',
        role: 'dummyRole',
        token: 'dummyToken',
      }
    },
    setStatus: (state, action: PayloadAction<{ isLoading: boolean; error: string | null }>) => {
      state.status.isLoading = action.payload.isLoading
      state.status.error = action.payload.error
    },
  },
})

export const { setUser, setStatus } = testingSlice.actions

export default testingSlice.reducer
