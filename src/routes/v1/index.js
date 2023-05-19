const express = require("express");
const UserController = require("../../controller/UserController");
const router = express.Router();


const { authValidator } = require("../../middlewares/index");

//
router.post('/signup',
    authValidator.requestValidator,
    UserController.createUser);

router.post('/signin',
    authValidator.requestValidator,
    UserController.signin);


module.exports = router;