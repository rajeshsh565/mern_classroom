import mongoose from "mongoose";

export const mongoConnect = async(mongouri)=>{
    return await mongoose.connect(mongouri);
}