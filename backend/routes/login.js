import expres from "express"
import authHelper from "../helpers/authHelper.js"

const router = expres.Router()

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password } = req.body

        const user = await authHelper.validateUserByEmail(email, true)
        console.log(user)
        await authHelper.validatePassword(password, user.hashPassword)

        const authToken = await authHelper.generateAuthToken(user)
        console.log(authToken)
        const userData = await authHelper.returnUserDataToClient(user, true)
        console.log(userData)

        return res.status(200).json({ user: userData, token: authToken })
    } catch (err) {
        next(err)
    }
})

export default router