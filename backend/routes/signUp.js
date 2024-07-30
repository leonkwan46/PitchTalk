import express from "express"
import { User, Document, Parent } from "../db/modals/index.js"
import authHelper from "../helpers/authHelper.js"
import authHandler from "../handlers/authHandler.js"
import OTPHelper from "../helpers/OTPHelper.js"

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const { user, token } = await authHelper.createAccount(email, password, role)

        // Return User
        let userData = await User.findOne({ email })
        userData = {
            userId: user._id,
            email,
            role: user.role,
            isRegistered: user.isRegistered,
        }

        return res.status(200).json({ user: userData, token })
    } catch (err) {
        next(err)
    }
})

router.post('/extra_details', async (req, res, next) => {
    try {
        const { name, DoB, gender, userId, isGeneralFormComplete } = req.body

        // Find user
        let user = await User.findById(userId)
        if (!user) throw new Error("User not found")

        // Update user
        user.name = name
        user.DoB = DoB
        user.gender = gender
        user.isGeneralFormComplete = isGeneralFormComplete

        // Save user
        await user.save()

        return res.status(200).json({ name, DoB, gender, userId, isGeneralFormComplete })
    } catch (err) {
        next(err)
    }
})

router.post('/extra_details/upload', async (req, res, next) => {
    try {
        const { userId, selectedDBS, selectedID, selectedProfessionalCert } = req.body
        // Find user
        let user = await User.findById(userId)
        if (!user) throw new Error("User not found")

        let documents = new Document({
            DBSCert: selectedDBS,
            ProofOfId: selectedID,
            ProfessionalCert: selectedProfessionalCert,
        })

        // Save documents
        let savingDocuments = await documents.save()
        if (!savingDocuments) throw new Error("Failed to save documents")

        // Update user
        user.isDocUploaded = true
        user.documents = savingDocuments

        // Save user
        await user.save()

        return res.status(200).json({ userId })
    } catch (err) {
        next(err)
    }
})

router.post('/extra_details/auth_invitation', authHandler, async (req, res, next) => {  
    try {
        const user = req.user
        const { invitationCode } = req.body

        const isVerified = await OTPHelper.verifyOTP(invitationCode, user.hashPassword)
        if (!isVerified) throw new Error("Invalid OTP Code")

        const isUpdated = await Parent.findOneAndUpdate({ email: user.email }, { isInvitationVerified: true })
        if (!isUpdated) throw new Error("Failed to update user")

        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router