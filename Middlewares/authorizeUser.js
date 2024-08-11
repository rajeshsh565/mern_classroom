export const authorizeUser = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({msg:'UnAuthorized Access!'});
        }
        next();
    }
}