const UserService = require('../services/user-service.js');

const userService = new UserService();

const create = async (req, res)=>{
    try {        
        const user = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            data:user,
            message: "User created",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data:{},
            success:false,
            err:error.explanation
        });
    }
}

const destroy = async (req, res)=>{
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(200).json({
            data:response,
            message: "User deleted",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "User not deleted",
            data:{},
            success:false,
            err:error
        });
    }
}

const signIn = async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:response,
            message: "User signed in",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Email or password not matched",
            data:{},
            success:false,
            err:error
        });
    }
}
const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const result = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:result,
            message: "User authenticated",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "User not authenticated",
            data:{},
            success:false,
            err:error
        });
    }
}
const isAdmin = async (req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            message: "User is admin",
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "User not admin",
            data:{},
            success:false,
            err:error
        });
    }
}


module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
    isAdmin,
}