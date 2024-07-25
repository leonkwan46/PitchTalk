import expres from "express"
import authHelper from "../helpers/authHelper.js"
import authHandler from "../handlers/authHandler.js"

const router = expres.Router()

router.post('/', async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await authHelper.validateUserByEmail(email, true)
        await authHelper.validatePassword(password, user.hashPassword)

        const authToken = await authHelper.generateAuthToken(user)
        const userData = await authHelper.returnUserDataToClient(user, true)

        return res.status(200).json({ user: userData, token: authToken })
    } catch (err) {
        next(err)
    }
})

router.post('/refetch_user', authHandler, async (req, res, next) => {
    const { userId } = req.body
    try {
        const user = await authHelper.validateUserById(userId, true)
        const authToken = await authHelper.generateAuthToken(user)
        const userData = await authHelper.returnUserDataToClient(user, true)

        return res.status(200).json({ user: userData, token: authToken })
    } catch (err) {
        next(err)
    }
})

export default router