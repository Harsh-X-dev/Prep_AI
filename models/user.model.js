import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: [true,"username already taken"],
        required: [true, "email is reuired"]

    },
    username: {
        type: String,
        required:true,
        unique: [true,"username Already taken "],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
})


const UserModel = mongoose.model("userSchema", userSchema);

export default UserModel;