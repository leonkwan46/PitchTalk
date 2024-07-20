import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import connectDB from "./db/config.js"
import errorHandler from "./handlers/errorHandler.js"
import routes from "./routes/index.js"
import http from 'http'

// App Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '5mb' }))
app.use(bodyParser.json())

// Server
const server = http.createServer(app)

// DB Conection
connectDB()

// Routes
app.use(routes)

// Error Handler, always keep this at the bottom (As it will catch any errors from the routes before)
app.use(errorHandler)

server.listen(process.env.PORT || 6000, () => console.log(`Server running on port ${process.env.PORT || 6000}`))