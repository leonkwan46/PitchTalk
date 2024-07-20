import mongoose from "mongoose"
import User from "./User.js"

const adminSchema = new mongoose.Schema({

})

export default User.discriminator("Admin", adminSchema)