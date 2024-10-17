const validateUserSignup = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: "Email or password missing in the request"
        });
    }
    next();
}

const validateAdminRequest = (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            data:{},
            message:"Something went wrong",
            err: "User id missing in the request"
        });
    }
    next();
}
module.exports = {
    validateUserSignup,
    validateAdminRequest,
}