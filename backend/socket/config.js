import chatHelper from "../helpers/chatHelper.js"

const connectSocketIO = (io) => {
    let onlineUsers = new Set()

    io.on('connection', (socket) => {
        console.log('User connected')
        console.log('===Online Users===')
        console.log(onlineUsers)
        console.log('==================')
        // Add user to online users
        onlineUsers.add(socket.id)

        // Send message
        socket.on('sendMessage', (props) => {
            chatHelper.handleSendMessage(io, socket, props)
        })
        // Disconnect
        socket.on('disconnect', () => {
            onlineUsers.delete(socket.id)
            console.log('=======Disconnected User=======')
            console.log(socket.id)
            console.log('==========================')
        })
        
    })
}

export default connectSocketIO