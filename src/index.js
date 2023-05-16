const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const {PORT}= require("../src/config/serverConfig");
const startAuthService = async function(){


     app.listen(PORT,function(){
        console.log(`Server started at ${PORT}`);
     })

}

startAuthService();