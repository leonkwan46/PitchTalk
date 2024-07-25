import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        require: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    sentAt: {
        type: Number,
        default: Date.now,
        required: true,
    },
})

export default mongoose.model("Message", messageSchema)