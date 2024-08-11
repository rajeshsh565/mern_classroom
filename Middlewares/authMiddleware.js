import jwt from "jsonwebtoken";

export const validateUser = (req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        return res.status(400).json({msg:'Invalid Login, Token Missing!'});
    }
    try {
        const {userId, role} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId, role};
        next();
    } catch (error) {
        return res.status(400).json({msg:'Invalid Login, JWT error!'});
    }
}