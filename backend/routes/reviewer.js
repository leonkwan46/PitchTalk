import expres from "express"
import authHandler from "../handlers/authHandler.js"
import userDataHelper from "../helpers/userDataHelper.js"
import User from "../db/modals/User.js"
import Application from "../db/modals/Application.js"

const router = expres.Router()

router.get('/get_applications', authHandler, async (req, res, next) => {
    try {
        const result = await userDataHelper.fetchReviewerUserData()
        return res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.post('/update_application', authHandler, async (req, res, next) => {
    const { teacherId, approved } = req.body

    try {
        // Find Teacher
        const teacher = await User.findById(teacherId)
        if (!teacher) throw new Error('No teacher found')

        // Update application and teacher
        const application = await Application.findOne({ teacher: teacher })
        if (!application) throw new Error('No application found')
        application.isPending = false
        if (approved) {
            application.isAccepted = true
            application.isRejected = false
            teacher.isDocVerified = true
            teacher.isDocRejected = false
        } else {
            application.isRejected = true
            application.isAccepted = false
            teacher.isDocVerified = false
            teacher.isDocRejected = true
        }
        const updatingApplication = await application.save()
        if (!updatingApplication) throw new Error('Failed to update application')
        const updatingTeacher = await teacher.save()
        if (!updatingTeacher) throw new Error('Failed to update application')

        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router