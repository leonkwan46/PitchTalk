import express from "express"
import authHandler from "../handlers/authHandler.js"
import OTPHelper from "../helpers/OTPHelper.js"
import { Parent, Student, Teacher, User } from "../db/modals/index.js"
import authHelper from "../helpers/authHelper.js"

const router = express.Router()

router.post('/send_invitation', authHandler, async (req, res, next) => {  
    try {
        const teacherID = req.user._id
        const { email } = req.body

        let recipient = await User.findOne({ email })
        
        // If user exists, wrap it in an user object
        if (recipient) recipient = { user: recipient }

        // If user does not exist, create user
        if (!recipient) {
            recipient = await authHelper.createAccount(email, '123123', 'parent')

            const isUpdatedParent = await Parent.updateMany({ _id: recipient.user._id }, { $push: { teachers: teacherID } })
            if (!isUpdatedParent) throw new Error("Failed to update parent's teacher list")

            const isUpdatedTeacher = await Teacher.updateMany({ _id: teacherID }, { $push: { parents: recipient.user._id } })
            if (!isUpdatedTeacher) throw new Error("Failed to update teacher's parent list")
        }

        // Generate OTP and send to user
        const otpCode = await OTPHelper.generateOTP(recipient.user.hashPassword)
        await OTPHelper.sendOTPByEmail(email, otpCode)
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

router.post('/create_student_account', authHandler, async (req, res, next) => {
    try {
        const { _id: parentID } = req.user
        const { email, password, name, DoB, gender, teacher, instrument } = req.body

        // Create student account
        const student = await authHelper.createAccount(email, password, 'student')
        // Update student details
        await Student.updateMany({ _id: student.user._id }, {
            $set: { name: name, DoB: DoB, gender: gender, isGeneralFormComplete: true, parent: parentID},
            $push: { teachers: teacher.split(',')[1], instrument: instrument }
        })
        // Update parent details
        await Parent.updateMany({ _id: parentID }, {
            $push: { children: student.user._id }
        })

        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

router.get('/get_contacts', authHandler, async (req, res, next) => {
    try {
        const userData = await authHelper.returnUserDataToClient(req.user, true)
        return res.status(200).json(userData.contacts)
    } catch (err) {
        next(err)
    }
})

router.post('/fetch_children', authHandler, async (req, res, next) => {
    const { selectedParentId } = req.body
    try {
        const parent = await Parent.findById(selectedParentId)
        const userData = await authHelper.returnUserDataToClient(parent)
        return res.status(200).json(userData?.contacts?.children)
    } catch (err) {
        next(err)
    }
})

export default router