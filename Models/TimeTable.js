import mongoose from "mongoose";
import { Days } from "../utils/constants";

const TimeTable = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: Days
    },
    schedule: [
        {
            subject: String,
            startTime: Date,
            endTime: Date
        }
    ],
})

const timetable = mongoose.model("TimeTable", TimeTable);
export default timetable;