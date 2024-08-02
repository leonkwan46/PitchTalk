import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        ref: "User",
        required: true,
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Message",
    },
    createAt: {
        type: Number,
        default: Date.now,
    },
})

export default mongoose.model("Room", roomSchema)