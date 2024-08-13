import { io, Socket } from 'socket.io-client'
import { Message } from '../types/types'
import { Platform } from 'react-native'
import { API_URL } from './generalHelpers'

export interface MessageData {
  id: string
  message: string
  roomId: string
  senderId: string
  senderRole: string
}

const socket: Socket = io(API_URL)

const getSocketId = (): string => {
  if (!socket.id) throw new Error('Socket ID is undefined')
  return socket.id
}

const disconnectSocket = async (): Promise<void> => {
  await socket.disconnect()
}

const sendMessage = async (roomId: string, message: string, userId: string, userRole: string): Promise<void> => {
  await socket.emit('sendMessage', { roomId, message, userId, userRole })
}

const receiveMessage = (): Promise<MessageData>=> {
  return new Promise((resolve) => {
    socket.on('chatMessage', (res) => {
      resolve(res.data)
    })
  })
}

const joinRoomAndGetChatHistory = (roomId: string): Promise<Message[]> => {
  return new Promise((resolve, reject) => {
      socket.emit('joinRoom', { roomId })
      socket.once('roomJoined', (result) => {
          resolve(result.chatHistory.messages)
      })
      socket.once('roomJoinError', (error) => {
          reject(error)
      })
  })
}

export { disconnectSocket, getSocketId, receiveMessage, sendMessage, joinRoomAndGetChatHistory }
