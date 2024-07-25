import { Message } from '../db/modals/index.js'

const chatHelper = {}

chatHelper.handleSendMessage = async (io, socket, props) => {
    const { message, userId } = props

    const newMessage = Message({
        message,
        senderId: userId,
        sentAt: Date.now(),
        isRead: false,
    })

    // Save message to database
    await newMessage.save()

    io.emit('chatMessage', { sender: socket.id, data: newMessage })
}

export default chatHelper
