const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const express = require("express");
dotenv.config();

module.exports ={
    PORT: process.env.PORT,
    SALT : bcrypt.genSaltSync(10)
}