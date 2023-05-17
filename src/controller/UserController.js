const UserService = require("../services/userService");

const userService = new UserService();

const createUser = async function(req,res){
    try {
        const Userdata = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            data: Userdata,
            success : true,
            message : "Successfully created a User",
            err : {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err : {error}
        })
    }
}

module.exports ={
    createUser
}