import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, default: null },
    desc: { type: String, default: null },
    password: { type: String, default: null },
    avatarImgURL: {
        type: String,
        default: null,
    },
    profileImgURL: {
        type: String,
        default: null
    },
    joinedOn: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model("User", userSchema);
