import { combineReducers } from 'redux'
import authSlice from './authSlice'
import registerInfoSlice from './registerInfoSlice'
import sessionSlice from './sessionSlice'
import testingSlice from './testingSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    registerInfo: registerInfoSlice,
    session: sessionSlice,
    testing: testingSlice
})

export default rootReducer