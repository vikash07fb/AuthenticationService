function requestValidator(req,res,next){
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
             success:false,
            message : `Either password or email is missing`,
            err : "Something missing in the credintals"
        })
    }

    next()
}

module.exports ={
    requestValidator
}