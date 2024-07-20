import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../types/types'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
