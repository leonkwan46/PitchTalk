import { transporter } from "../mailer/config.js"
import dotenv from "dotenv"

dotenv.config()
const mailerHelper = {}

mailerHelper.sendEmail = async (params) => {
    const { email, details } = params
    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        ...details
    })
}

export default mailerHelper