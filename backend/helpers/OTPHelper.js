import { totp } from "otplib"
import mailerHelper from "./mailerHelper.js"
import OTPEmail from "../mailer/templates/OTPEmail.js"
import dotenv from 'dotenv'
import { Parent } from "../db/modals/index.js"

dotenv.config()
const OTPHelper = {}

totp.options = {
    ...totp.options,
    digits: 6,
    step: 7 * 24 * 60 * 60, // 7 days
    window: [1, 10] // [past, future]
}

OTPHelper.generateOTP = async (secret) => {
    return await totp.generate(secret)
}

OTPHelper.verifyOTP = async (otp, secret) => {
    const isVerified = await totp.check(otp, secret)
    if (!isVerified) throw new Error("Invalid Invitation Code")
    return isVerified
}

OTPHelper.sendOTPByEmail = async (email, code) => {
    const isUpdated = await Parent.findOneAndUpdate({ email: email }, { isInvited: true })
    if (!isUpdated) throw new Error("Failed to update user")

    const details = OTPEmail(code)
    await mailerHelper.sendEmail({ email, details })
}

export default OTPHelper