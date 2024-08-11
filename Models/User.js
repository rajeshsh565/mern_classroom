import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['principal', 'teacher', 'student']
    },
    assignedClassroom: String
})

User.methods.toJSON = function (){
    const obj = this.toObject();
    return obj;
}

const user = mongoose.model("User", User);
export default user;