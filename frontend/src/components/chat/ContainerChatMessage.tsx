import { useTypedSelector } from '@/src/hooks/useTypedSelector'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { MessageData, receiveMessage, sendMessage } from '../../helpers/socketHelpers'
import Message from './Message'
import MessageInput from './MessageInput'

const ContainerChatMessage: FC = () => {
    const { userId, role } = useTypedSelector(state => state.session.user)
    const { roomId, name, members, messages: chatHistory } = useTypedSelector(state => state.session.currentChatRoom)

    const [oldMessages, setOldMessages] = useState<MessageData[]>([])
    const [message, setMessage] = useState<string>('')
    const flatListRef = useRef<FlatList>(null)

    const handleSendMessage = () => {
        if (message === '') return
        sendMessage(roomId, message, userId, role)
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
            senderRole: role
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
                    onContentSizeChange={() => {
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
