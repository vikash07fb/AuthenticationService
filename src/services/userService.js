const UserRepository =require("../repository/userRepo");

const {JWT_KEY} = require("../config/serverConfig");
const jwt = require('jsonwebtoken');
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
        try {
            const user = await this.userRepository.create(data);

            return user;
        } catch (error) {
            console.log("Someting wrong in the service layer");
            throw({error});
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{ expiresIn: '1h' });
            return result;
        } catch (error) {
            console.log(`Something went wrong in creating the token`);
            throw({error});
        }
        
    }
    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log(`Something went wrong in verifying the token`,error);
            throw({error})
        }
    }
}
 

module.exports =UserService