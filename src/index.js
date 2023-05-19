const bodyParser = require("body-parser");
const express = require("express");

// const router = express.Router();
const apiRoutes = require("./routes/index");

// const bcrypt = require("bcrypt");
// const {User}= require("./models/index");
const db = require("./models/index");
const { PORT } = require("../src/config/serverConfig");
const startAuthService = async function () {


   const app = express();

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use('/api', apiRoutes);

   app.listen(PORT,async function () {
      console.log(`Server started at ${PORT}`);
      if(process.env.DB_SYNC){
         db.sequelize.sync({alter:true})
      }
      // const tp ="123456";
      // const user = await User.findByPk(3);
      // const tp1= bcrypt.compareSync(tp,user.password );
      // console.log(tp1);


   });

}

startAuthService();