import React, { FC } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setCurrentChatRoom } from '../../redux/reducer/sessionSlice'
import { joinRoomAndGetChatHistory } from '../../helpers/socketHelpers'
import ChatRoomGroupImage from './ChatRoomGroupImage'
import { Typography } from '../atom'
import { router } from 'expo-router'
import { ChatRoomState } from '@/src/types/types'
import { AppDispatch } from '@/src/redux/store'

interface ChatRoomProps {
    roomData: ChatRoomState
}

const ChatRoom: FC<ChatRoomProps> = ({ roomData }) => {
    const dispatch: AppDispatch = useDispatch()

    const handleOnPress = async () => {
        const chatHistory = await joinRoomAndGetChatHistory(roomData._id)
        roomData.messages = chatHistory
        dispatch(setCurrentChatRoom(roomData))
        router.push('chat')
    }
    return (
        <View>
            <Pressable
                onPress={handleOnPress}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#333' : '#000' },
                    styles.pressableContainer,
                ]}
            >
                <View style={styles.container}>
                    <ChatRoomGroupImage />
                    <Typography color='secondary'>{roomData.name}</Typography>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressableContainer: {
        borderRadius: 10,
        padding: 5,
    },
})

export default ChatRoom
