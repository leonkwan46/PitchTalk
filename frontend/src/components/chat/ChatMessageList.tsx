import React, { FC, useCallback, useState } from 'react'
import { View } from 'react-native'
import ChatRoom from './ChatRoom'
import { Box, VStack } from '@react-native-material/core'
import { getSessionStatus, getUserToken } from '../../redux/selectors'
import { useDispatch } from 'react-redux'
import { getChatRooms } from '../../redux/reducer/sessionSlice'
import { useFocusEffect } from '@react-navigation/native'
import { AppDispatch } from '@/src/redux/store'
import { ChatRoomState } from '@/src/types/types'
import { Loading } from '../shared'

const ChatMessageList: FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [rooms, setRooms] = useState<ChatRoomState[]>([])
    const token = getUserToken()
    const isLoading = getSessionStatus().isLoading
    
    const fetchRooms = async () => {
        const response = await dispatch(getChatRooms({ token }))
        if (response.payload) setRooms(response.payload)
    }

    useFocusEffect(
        useCallback(() => {
            fetchRooms()
        }, [])
    )

    return (
        <>
            { isLoading ? <Loading isLoggedIn /> : (
                <>
                    <VStack spacing={10}>
                        {typeof rooms === 'object' && rooms.map((room: ChatRoomState) => (
                            <Box key={room._id}>
                                <ChatRoom roomData={room} />
                            </Box>
                        ))}
                    </VStack>
                </>
            )}
        </>
    )
}

export default ChatMessageList
