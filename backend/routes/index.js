import express from "express"
import loginRoute from "./login.js"
import signUpRoute from "./signUp.js"

const router = express.Router()

router.use('/login', loginRoute)
router.use('/signup', signUpRoute)

export default router