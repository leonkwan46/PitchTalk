import mongoose from "mongoose"
import User from "./User.js"

const reviewerSchema = new mongoose.Schema({

})

export default User.discriminator("Reviewer", reviewerSchema)