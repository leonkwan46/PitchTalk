export interface StatusState {
  isLoading: boolean
  error: string | null
}

export interface AuthState {
  user: AuthUserState
  status: StatusState
}

export interface SessionState {
  user: SessionUserState
  currentChatRoom: CurrentChatRoomState
  contacts: ContactsState
  registeringNewUser: RegisteringNewUserState
  currentCreateRoom: CurrentCreateRoomState
  status: StatusState
  popoverStatus: StatusState
}

export interface RootState {
  auth: AuthState
  session: SessionState
}

export interface SessionUserState {
  userId: string
  role: string
  token: string
  email: string
}

export interface AuthUserState {
  userId: string
  email: string
  role: string
  contacts?: ContactsState
  token: string
  name: string
  DoB: string
  gender: string
  isRegistered: boolean
  isGeneralFormComplete: boolean
  isInvited: boolean
  isInvitationVerified: boolean
  isDocUploaded: boolean
  isDocVerified: boolean
}

export interface Message {
  id: string
  senderId: string
  roomId: string
  message: string
  isRead: boolean
  sentAt: number
}

export interface CurrentChatRoomState {
  roomId: string
  name: string
  members: any[]
  messages: Message[]
  createdAt: string
}

interface Contact {
  _id: string
  name: string
}

export interface ContactsState {
  teachers: Contact[]
  students: Contact[]
  children: Contact[]
  parents: Contact[]
  parent: Contact
}

export interface CurrentCreateRoomState {
  children: Contact[]
}

export interface RegisteringNewUserState {
  isStudent: boolean
}

export interface RegisterInfoState {
    isTeacherOverlayOpen: boolean
    isStatusOverlayOpen: boolean
    role: string
    isLogin: boolean
  }
  
export interface RootState {
  registerInfo: RegisterInfoState
}

export interface ChatRoomState {
  _id: string
  name: string
  members: any[]
  messages: Message[]
  createdAt: string
}