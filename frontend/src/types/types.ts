export interface StatusState {
  isLoading: boolean
  error: string | null
}

export interface AuthState {
  user: UserState
  status: StatusState
}

export interface SessionState {
  user: User
  status: StatusState
}

export interface RootState {
  auth: AuthState
  session: SessionState
}

export interface User {
  userId: string
  role: string
  token: string
  email: string
}

export interface UserState {
  userId: string
  email: string
  role: string
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

export interface RegisterInfoState {
    isTeacherOverlayOpen: boolean
    isStatusOverlayOpen: boolean
    role: string
    isLogin: boolean
  }
  
export interface RootState {
  registerInfo: RegisterInfoState
}
  