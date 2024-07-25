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
  status: StatusState
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

export interface ContactsState {
  teachers: any[]
  students: any[]
  children: any[]
  parents: any[]
  parent: string
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
  