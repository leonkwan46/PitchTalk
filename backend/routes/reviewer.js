import expres from "express"
import authHandler from "../handlers/authHandler.js"
import userDataHelper from "../helpers/userDataHelper.js"
import reviewerHelper from "../helpers/reviewerHelper.js"

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
    try {
        // Update application
        await reviewerHelper.updateApplicationStatus(req.body)

        // Send email
        await reviewerHelper.sendApplicationStatusEmail(req.body)
        
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router