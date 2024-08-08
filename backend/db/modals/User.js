import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      requiredd: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "teacher",  "reviewer"],
      required: true,
    },
    chatRooms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Room",
      default: [],
    },

    name: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
      default: "Prefer not to say",
    },
    DoB: {
      type: Date,
      default: null,
    },

    isRegistered: {
      type: Boolean,
      default: false,
    },
    isGeneralFormComplete: {
      type: Boolean,
      default: false,
    },


    createAt: {
      type: Number,
      default: Date.now,
    },
  })

export default mongoose.model("User", userSchema)