import User from "../Models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:'Invalid Login!'});
    }
    const isPwdMatch = bcryptjs.compareSync(password, user.password);
    if(!isPwdMatch){
        return res.status(400).json({msg:'Incorrect Login or Password!'});
    }
    const token = jwt.sign({userId:user._id, role:user.role}, process.env.JWT_SECRET);
    const oneDay = 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + oneDay*3);
    console.log(expires);
    
    res.cookie("token", token, {
        httpOnly: true,
        expires,
        secure: true,
    });
    res.status(200).json({msg:'Login Success!'});
}

export const logout = async(req,res)=>{
    res.cookie("token", "logout", {
        httpOnly:true,
        expires: new Date(Date.now()),
        secure: true
    });
    res.status(200).json({msg : "logout success"});
}