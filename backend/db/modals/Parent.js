import mongoose from "mongoose"
import { User } from "./index.js"

const parentSchema = new mongoose.Schema({
    isInvited: {
        type: Boolean,
        default: false,
    },
    isInvitationVerified: {
        type: Boolean,
        default: false,
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    }],
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }],
})

export default User.discriminator("Parent", parentSchema)