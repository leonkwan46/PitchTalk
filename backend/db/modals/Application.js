import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    isRejected: {
        type: Boolean,
        default: false,
    },
    isPending: {
        type: Boolean,
        default: true,
    },
})

export default mongoose.model("Application", applicationSchema)