import expres from "express"
import authHelper from "../helpers/authHelper.js"
import User from "../db/modals/User.js"

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

router.post('/reviewer', async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) user = await authHelper.createAccount(email, password, 'reviewer')
        const authToken = await authHelper.generateAuthToken(user)
        const userObj = user.toObject()
        if (userObj.hashPassword) delete userObj.hashPassword
        return res.status(200).json({ user: userObj, token: authToken })
    } catch (err) {
        next(err)
    }
})
export default router