import Classroom from "../Models/Classroom.js";

export const createClassroom = async(req,res)=>{
    const classroom = await Classroom.create(req.body);
    res.status(201).json({msg:"Classroom Created!", classroom});
}

export const updateClassroom = async(req,res)=>{
    const updatedClassroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json({msg:"Classroom Updated!", updatedClassroom});
}

export const getAllClassrooms = async(req,res)=>{
    const allClassrooms = await Classroom.find({});
    res.status(200).json({allClassrooms});
}