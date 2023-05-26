// const { response } = require("express");
const UserService = require("../services/userService");
const { StatusCodes } = require('http-status-codes');

const userService = new UserService();

const createUser = async function(req,res){
    try {
      
        const Userdata = await userService.createUser({
            email: req.body.email ,
            password: req.body.password
        })

        console.log(Userdata)
        return res.status(201).json({
            data: Userdata,
            success : true,
            message : "Successfully created a User",
            err : {}
        })
    } catch (error) {
       
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err : error.explanation
        })
    }
}

const signin = async function(req,res){
    try {
        const response = await userService.signup({email: req.body.email, password : req.body.password});

        return res.status(201).json({
            data : response,
            success: true,
            message : "Succesfull signin",
            err : {}
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            err : {error}
        })
    }
}

const isAuthenticated = async function(req,res){

    try {
        const response = await userService.isAuthenticated(req.headers.x_token);

        return res.status(201).json({
            data : {email : response.email, id: response.id},
            success : true ,
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

const isAdmin = async function(req,res){

    try {
        const response = await userService.isAdmin(req.body.id);


        return res.status(201).json({
            data : response,
            success : true ,
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
    createUser,
    signin,
    isAuthenticated,
    isAdmin
   
}