// selectors.ts

import { useTypedSelector } from '../hooks/useTypedSelector'

const getAuthUser = () => {
  return useTypedSelector(state => state.auth.user)
}

const getAuthStatus = () => {
  return useTypedSelector(state => state.auth.status)
}

const getSessionStatus = () => {
  return useTypedSelector(state => state.session.status)
}


const getLoggedInUser = () => {
  return useTypedSelector(state => state.session.user)
}
const getUserRole = () => {
  return useTypedSelector(state => state.session.user.role)
}

const getUserToken = () => {
  return useTypedSelector(state => state.session.user.token)
}

const getUserID = () => {
  return useTypedSelector(state => state.session.user.userId)
}

const getUserStatus = () => {
  return useTypedSelector(state => state.session.status)
}

const getRequestStatus = () => {
  const authStatus = getAuthStatus()
  const sessionStatus = getSessionStatus()
  return { auth: authStatus, session: sessionStatus }
}

export {
  getAuthStatus,
  getSessionStatus,
  getAuthUser,
  getLoggedInUser,
  getRequestStatus,
  getUserID,
  getUserRole,
  getUserStatus,
  getUserToken
}

