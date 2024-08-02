import express from "express"
import loginRoute from "./login.js"
import signUpRoute from "./signUp.js"
import contactsRoute from "./contacts.js"
import chatMessageRoute from "./chat_message.js"

const router = express.Router()

router.use('/login', loginRoute)
router.use('/signup', signUpRoute)
router.use('/contacts', contactsRoute)
router.use('/chat_message', chatMessageRoute)

export default router