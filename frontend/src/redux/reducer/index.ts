import { combineReducers } from 'redux'
import authSlice from './authSlice'
import registerInfoSlice from './registerInfoSlice'
import sessionSlice from './sessionSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    registerInfo: registerInfoSlice,
    session: sessionSlice,
})

export default rootReducer