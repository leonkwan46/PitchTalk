import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import connectDB from "./db/config.js"
import errorHandler from "./handlers/errorHandler.js"
import routes from "./routes/index.js"
import http from 'http'
import { Server } from "socket.io"
import connectSocketIO from "./socket/config.js"

// App Config
const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(bodyParser.json())

// Server
const server = http.createServer(app)

// Socket.io
const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
  connectSocketIO(io)

// DB Conection
connectDB()

// Routes
app.use(routes)

// Error Handler, always keep this at the bottom (As it will catch any errors from the routes before)
app.use(errorHandler)


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))