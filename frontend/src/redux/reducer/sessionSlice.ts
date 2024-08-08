import { getErrorMessage } from '@/src/helpers/errorHandlingHelper'
import { ChatRoomState, CurrentChatRoomState, SessionState } from '@/src/types/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { isLoading } from 'expo-font'

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

interface ChatRoomData {
  token: string
}

interface fetchChildrenData {
  token: string
  selectedParentId: string
}

interface ApplicationData {
  token: string
}

interface UpdateApplicationData {
  token: string
  teacherId: string
  approved: boolean
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
      parent: {
        _id: '',
        name: '',
      },
    },
    currentChatRoom: {
        roomId: '',
        name: '',
        members: [],
        messages: [],
        createdAt: '',
    },
    currentCreateRoom: {
        children: [],
    },
    registeringNewUser: {
        isStudent: false,
    },
    status: {
        isLoading: false,
        error: null,
    },
    popoverStatus: {
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

export const getChatRooms = createAsyncThunk(
  'session/getChatRoom',
  async (chatRoomData: ChatRoomData, {rejectWithValue}) => {
    const { token } = chatRoomData
    try {
      const response = await axios.get('http://localhost:3000/chat_message/get_rooms', {
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

export const createChatRoom = createAsyncThunk(
  'session/createChatRoom',
  async (chatRoomData: ChatRoomData, { rejectWithValue }) => {
      const { token } = chatRoomData
      try {
        const response = await axios.post('http://localhost:3000/chat_message/create_chat_room', chatRoomData, {
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

export const fetchChildren = createAsyncThunk(
  'session/fetchChildren',
  async (fetchChildrenData: fetchChildrenData, { rejectWithValue }) => {
    const { token } = fetchChildrenData
    try {
        const response = await axios.post('http://localhost:3000/contacts/fetch_children', fetchChildrenData, {
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

export const getApplications = createAsyncThunk(
  'session/getApplications',
  async (applicationData: ApplicationData, { rejectWithValue }) => {
    const { token } = applicationData
    try {
        const response = await axios.get('http://localhost:3000/reviewer/get_applications', {
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

export const updateApplication = createAsyncThunk(
  'session/updateApplication',
  async (updateApplicationData: UpdateApplicationData, { rejectWithValue }) => {
    const { token } = updateApplicationData
    try {
        const response = await axios.post('http://localhost:3000/reviewer/update_application', updateApplicationData, {
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
        setCurrentChatRoom: (state, action: PayloadAction<ChatRoomState>) => {
          state.currentChatRoom.roomId = action.payload._id
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

            // Create Chat Rooms
            .addCase(createChatRoom.pending, (state) => {
              state.status.isLoading = true
            })
            .addCase(createChatRoom.fulfilled, (state) => {
              state.status.error = null
              state.status.isLoading = false
            })
            .addCase(createChatRoom.rejected, (state, action) => {
              state.status.error = action.error.message || 'Something went wrong'
              state.status.isLoading = false
            })

            // Get Chat Rooms
            .addCase(getChatRooms.pending, (state) => {
              state.status.isLoading = true
            })
            .addCase(getChatRooms.fulfilled, (state) => {
              state.status.error = null
              state.status.isLoading = false
            })
            .addCase(getChatRooms.rejected, (state, action) => {
              state.status.error = action.error.message || 'Something went wrong'
              state.status.isLoading = false
            })

            // Get Children
            .addCase(fetchChildren.pending, (state) => {
              state.popoverStatus.isLoading = true
            })
            .addCase(fetchChildren.fulfilled, (state, action) => {
              state.currentCreateRoom.children = action.payload
              state.popoverStatus.error = null
              state.popoverStatus.isLoading = false
            })
            .addCase(fetchChildren.rejected, (state, action) => {
              state.popoverStatus.error = action.error.message || 'Something went wrong'
              state.popoverStatus.isLoading = false
            })

            // Get Applications
            .addCase(getApplications.pending, (state) => {
              state.status.isLoading = true
            })
            .addCase(getApplications.fulfilled, (state, action) => {
              state.status.error = null
              state.status.isLoading = false
            })
            .addCase(getApplications.rejected, (state, action) => {
              state.status.error = action.error.message || 'Something went wrong'
              state.status.isLoading = false
            })

            // Update Application
            .addCase(updateApplication.pending, (state) => {
              state.status.isLoading = true
            })
            .addCase(updateApplication.fulfilled, (state, action) => {
              state.status.error = null
              state.status.isLoading = false
            })
            .addCase(updateApplication.rejected, (state, action) => {
              state.status.error = action.error.message || 'Something went wrong'
              state.status.isLoading = false
            })
    }
})

export const {
    setUser,
    setCurrentChatRoom,
    setRegisteringNewUser,
    clearLoggedInRequestStatus,
} = sessionSlice.actions

const sessionReducer = sessionSlice.reducer
export default sessionReducer