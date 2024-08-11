import ClassRoom from "../Models/Classroom.js";
import User from "../Models/User.js";
import bcryptjs from "bcryptjs";

export const getCurrentUser = async (req, res) => {
    const user = await User.findById({_id:req.user.userId});
    const obj = user.toJSON();
    delete obj.password;
    res.status(200).json({user: obj})
};

export const createPrincipal = async(req,res)=>{
    const {firstName, lastName, email, password} = req.body;
    const userCount = await User.countDocuments();
    if(userCount>0){
        return res.status(400).json({msg:"Principal already exists!"});
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPwd = bcryptjs.hashSync(password, salt);
    const principal = await User.create({firstName, lastName, email, password:hashedPwd, role:'principal'});
    res.status(201).json({msg:"Pricipal created", principal});
}

export const createTeacher = async(req,res)=>{
    const {firstName, lastName, email, password} = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPwd = bcryptjs.hashSync(password, salt);
    const teacher = await User.create({firstName, lastName, email, password:hashedPwd, role:'teacher'});
    res.status(201).json({msg:"Teacher created", teacher});
}

export const createStudent = async(req,res)=>{
    const {firstName, lastName, email, password} = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPwd = bcryptjs.hashSync(password, salt);
    const student = await User.create({firstName, lastName, email, password:hashedPwd, role:'student'});
    res.status(201).json({msg:"Student created", student});
}

export const getAllTeachers = async(req,res)=>{
    const teachers = await User.find({role:'teacher'});
    const teachersArr = teachers.map((teacher)=>{
        const obj = teacher.toJSON();
        delete obj.password;
        return obj;
    })
    res.status(200).json({teachers:teachersArr});
}

export const getAllStudents = async(req,res)=>{
    const students = await User.find({role:'student'});
    const studentsArr = students.map((student)=>{
        const obj = student.toJSON();
        delete obj.password;
        return obj;
    })
    res.status(200).json({students:studentsArr});
}

export const getClassStudents = async(req,res)=>{
    const user = await User.findOne({_id:req.user.userId});
    if(user.role === 'principal') {
        return res.status(400).json({msg:"Classroom Unavailable for Principal!"});
    }
    const userClassroom = user.assignedClassroom;

    const classStudents = await User.find({role:'student', assignedClassroom:userClassroom});
    const studentsArr = classStudents.map((student)=>{
        const obj = student.toJSON();
        delete obj.password;
        return obj;
    })
    res.status(200).json({classStudents:studentsArr});
}

export const updateTeacher = async(req,res)=>{
    const {id} = req.params;
    const {assignedClassroom, email} = req.body;
    const user = await User.findOne({email});
    if(user._id!=id){
        return res.status(400).json({msg:'Email already exists!'});
    }
    if(assignedClassroom){
        const classroom = await ClassRoom.findOne({name:assignedClassroom});
        if(!classroom){
            return res.status(400).json({msg:'Provided Classroom not Found. Please create one first'});
        }
        console.log("early: ",classroom.assignedTeacher);
        
        if(classroom.assignedTeacher && classroom.assignedTeacher!=id){
            return res.status(400).json({msg:'Provided Classroom already has a teacher assigned.'});
        }
        await ClassRoom.findByIdAndUpdate(classroom._id, {assignedTeacher:id})
    }
    const updatedTeacher = await User.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({msg:"Teacher Info Updated!", updatedTeacher});
}

export const updateStudent = async(req,res)=>{
    const {id} = req.params;
    const updatedStudent = await User.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({msg:"Student Info Updated", updatedStudent});
}

export const deleteTeacher = async(req,res)=>{
    const {id} = req.params;
    const deletedTeacher = await User.findByIdAndDelete(id);
    res.status(200).json({msg:"Teacher Acc Deleted!", deletedTeacher});
}

export const deleteStudent = async(req,res)=>{
    const {id} = req.params;
    const deletedStudent = await User.findByIdAndDelete(id);
    res.status(200).json({msg:"Student Acc Deleted!", deletedStudent});
}