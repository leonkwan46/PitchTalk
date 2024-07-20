import jwt from 'jsonwebtoken'
import { User } from "../db/modals/index.js"

const authHandler = async (req, res, next) => {
    try {
        // Check if token exists
        const token = req.headers.authorization.split(" ")[1]
        if (!token) throw new Error("Authentication failed")

        // Verify token
        let user = jwt.verify(token, process.env.JWT_SECRET)
        if (!user) throw new Error("Authentication failed")

        // Get user from database
        const { email } = user
        user = await User.findOne({ email })

        // Set user
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

export default authHandler