import { io, Socket } from 'socket.io-client'

export interface MessageData {
  message: string;
  roomId: string;
  senderId: string;
}

const socket: Socket = io('http://localhost:3000')

const getSocketId = (): string => {
  if (!socket.id) throw new Error('Socket ID is undefined')
  return socket.id
}

const disconnectSocket = async (): Promise<void> => {
  await socket.disconnect()
}

const sendMessage = async (roomId: string, message: string, userId: string): Promise<void> => {
  await socket.emit('sendMessage', { roomId, message, userId })
}

const receiveMessage = (): Promise<MessageData>=> {
  return new Promise((resolve) => {
    socket.on('chatMessage', (res) => {
      resolve(res.data)
    })
  })
}

export { disconnectSocket, getSocketId, receiveMessage, sendMessage }
