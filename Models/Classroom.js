import mongoose from "mongoose";
import { Days } from "../utils/constants.js";

const Classroom = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    schedule: {
        type: Array,
        required: true,
        items: {
            day: {
                type: String,
                enum: Days
            },
            startTime: Date,
            endTime: Date
        }
    },
    timeTable: {
        type: mongoose.Types.ObjectId,
        ref: "TimeTable"
    },
    assignedTeacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    },
})

const classroom = mongoose.model("Classroom", Classroom);
export default classroom;