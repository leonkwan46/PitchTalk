import { Application, User } from "../db/modals/index.js"
import ApplicationStatusEmail from "../mailer/templates/ApplicationStatusEmail.js"
import mailerHelper from "./mailerHelper.js"

const reviewerHelper = {}

reviewerHelper.updateApplicationStatus = async (params) => {
    const { teacherId, approved } = params
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
}

reviewerHelper.sendApplicationStatusEmail = async (params) => {
    const { teacherId, approved } = params
    const teacher = await User.findById(teacherId)
    if (!teacher) throw new Error('No teacher found')

    const details = ApplicationStatusEmail(approved ? 'accepted' : 'rejected')
    await mailerHelper.sendEmail({ email: teacher.email, details })
}

export default reviewerHelper