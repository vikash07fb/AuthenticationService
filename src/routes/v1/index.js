const express = require("express");
const UserController  = require("../../controller/UserController");
const router = express.Router();


//
router.post('/signup',UserController.createUser);


module.exports = router;