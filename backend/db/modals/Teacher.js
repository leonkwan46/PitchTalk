import mongoose from "mongoose"
import { User } from "./index.js"

const teacherSchema = new mongoose.Schema({
    isDocUploaded: {
        type: Boolean,
        default: false,
    },
    isDocVerified: {
        type: Boolean,
        // Default set to True for dev purpose
        default: true,
    },
    documents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
    },
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
    }],
})

export default User.discriminator("Teacher", teacherSchema)