import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },firstname: {
        type: String,
        required: true,
    }
},{timestamps:true});

const User = mongoose.models.User || mongoose.model('User',UserSchema);
export default User;

