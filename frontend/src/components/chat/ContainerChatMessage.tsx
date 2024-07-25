import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { MessageData, receiveMessage, sendMessage } from '../../helpers/socketHelpers'
import Message from './Message'
import MessageInput from './MessageInput'
import { getSessionStatus } from '@/src/redux/selectors'

const ContainerChatMessage = () => {
    const { userId } = useTypedSelector(state => state.session.user)
    const { roomId, name, members, messages: chatHistory, createdAt } = useTypedSelector(state => state.session.currentChatRoom)

    const [oldMessages, setOldMessages] = useState<MessageData[]>([])
    const [message, setMessage] = useState<string>('')
    const flatListRef = useRef<FlatList>(null)
    const isLoading = getSessionStatus().isLoading

    const handleSendMessage = () => {
        sendMessage(roomId, message, userId)
        setMessage('')
    }

    const fetchNewMessage = async () => {
      const lastestMessage = await receiveMessage()
      const { message, roomId, senderId } = lastestMessage
      const newMessage = {
        id: new Date().getTime().toString(),
        message,
        roomId,
        senderId,
    }
      setOldMessages([...oldMessages, newMessage])
    }

    useEffect(() => {
        fetchNewMessage()
    }, [oldMessages])

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true })
    }, [chatHistory, oldMessages])

    return (
        <View style={styles.messageContainer}>
            <View style={styles.messageList} >
                <FlatList
                    ref={flatListRef}
                    data={chatHistory && oldMessages ? [...chatHistory, ...oldMessages] : []}
                    renderItem={item => <Message messageData={item} />}
                    keyExtractor={item => item.id || item._id}
                    onLayout={() => {
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }}
                />
            </View>
            <MessageInput
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
            />
        </View>
      )
    }

const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    messageList: {
        flex: 1,
        padding: 10,
        paddingVertical: 20,
    },
    chatHistoryList: {
        flexGrow: 0,
    },
})

export default ContainerChatMessage
