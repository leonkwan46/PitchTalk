import { getErrorMessage } from '@/src/helpers/errorHandlingHelper'
import { CurrentChatRoomState, SessionState } from '@/src/types/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface CodeData {
    email: string
    token: string
    userId: string
}

interface StudentSignUpData {
  parentToken: string
}

interface ContactData {
  token: string
}

const initialState: SessionState = {
    user: {
        userId: '',
        email: '',
        role: '',
        token:'',
    },
    contacts: {
      teachers: [],
      students: [],
      children: [],
      parents: [],
      parent: '',
    },
    currentChatRoom: {
        roomId: '',
        name: '',
        members: [],
        messages: [],
        createdAt: '',
    },
    registeringNewUser: {
        isStudent: false,
    },
    status: {
        isLoading: false,
        error: null,
    }
}

export const sendInvitationCode = createAsyncThunk(
  'session/sendInvitationCode',
  async (codeData: CodeData, { rejectWithValue }) => {
    const { email, token } = codeData
    try {
      const response = await axios.post('http://localhost:3000/contacts/send_invitation', { email }, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const createStudentAccount = createAsyncThunk(
  'session/createStudentAccount',
  async (studentData: StudentSignUpData, {rejectWithValue}) => {
      const { parentToken } = studentData
      try {
          const response = await axios.post('http://localhost:3000/contacts/create_student_account', studentData, {
              headers: {
                  'authorization': `Bearer ${parentToken}`
              }
          })
          return response.data
        } catch (error: any) {
          return rejectWithValue(getErrorMessage(error))
        }
  }
)

  export const getContacts = createAsyncThunk(
    'session/getContacts',
    async (contactData: ContactData, { rejectWithValue }) => {
      const { token } = contactData
      try {
          const response = await axios.get('http://localhost:3000/contacts/get_contacts', {
              headers: {
                  'authorization': `Bearer ${token}`
              }
          })
          return response.data
        } catch (error: any) {
          return rejectWithValue(getErrorMessage(error))
        }
    }
  )

const sessionSlice = createSlice({
    name: 'session',
    initialState: {...initialState},
    reducers: {
        setUser: (state, action) => {
          // Ensure the payload has the necessary user data
          if (action.payload.user) {
            // Basic Info
            state.user.userId = action.payload.user.userId || state.user.userId;
            state.user.email = action.payload.user.email || state.user.email;
            state.user.role = action.payload.user.role || state.user.role;
            state.user.token = action.payload.user.token || action.payload.token || state.user.token;
          }
        
        // Ensure the payload has the necessary contacts data
          if (action.payload.user && action.payload.user.contacts) {
            // Contacts
            state.contacts.teachers = action.payload.user.contacts.teachers || [];
            state.contacts.students = action.payload.user.contacts.students || [];
            state.contacts.children = action.payload.user.contacts.children || [];
            state.contacts.parents = action.payload.user.contacts.parents || [];
            state.contacts.parent = action.payload.user.contacts.parent || '';
          }
        },
        setCurrentChatRoom: (state, action: PayloadAction<CurrentChatRoomState>) => {
          state.currentChatRoom.roomId = action.payload.roomId
          state.currentChatRoom.name = action.payload.name
          state.currentChatRoom.members = action.payload.members
          state.currentChatRoom.messages = action.payload.messages
          state.currentChatRoom.createdAt = action.payload.createdAt
        },
        setRegisteringNewUser: (state, action: PayloadAction<{ isStudent: boolean }>) => {
          state.registeringNewUser.isStudent = action.payload.isStudent
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
            .addCase(sendInvitationCode.fulfilled, (state) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(sendInvitationCode.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Create Student Account
            .addCase(createStudentAccount.pending, (state) => {
              state.status.isLoading = true
            })
            .addCase(createStudentAccount.fulfilled, (state) => {
                state.status.error = null
                state.status.isLoading = false
            })
            .addCase(createStudentAccount.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })

            // Get Contacts
            .addCase(getContacts.pending, (state) => {
                state.status.isLoading = true
            })
            .addCase(getContacts.fulfilled, (state, action) => {
                state.status.error = null
                state.status.isLoading = false
                state.contacts.teachers = action.payload.teachers,
                state.contacts.students = action.payload.students,
                state.contacts.children = action.payload.children,
                state.contacts.parents = action.payload.parents,
                state.contacts.parent = action.payload.parent
            })
            .addCase(getContacts.rejected, (state, action) => {
                state.status.error = action.error.message || 'Something went wrong'
                state.status.isLoading = false
            })
    }
})

export const {
    setUser,
    setCurrentChatRoom,
    setRegisteringNewUser,
    clearLoggedInRequestStatus
} = sessionSlice.actions

const sessionReducer = sessionSlice.reducer
export default sessionReducer