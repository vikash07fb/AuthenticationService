const UserRepository = require("../repository/userRepo");

const { JWT_KEY } = require("../config/serverConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name==="SequelizeValidationError"){
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signup(data) {
        try {
            const user = await this.userRepository.getByEmail(data.email);

            const passwordMatch = await this.checkPassword(data.password, user.password);
            if (!passwordMatch) {
                console.log("Wrong password entered");
                throw ({ error: "Wrong password" });
            } else {
                // console.log("password matched")
            }

            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;


        } catch (error) {
            console.log(`Something went wrong in service layer`);
            throw ({ error });
        }
    }
    checkPassword(plainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);

        } catch (error) {
            console.log(`Password does not matches`);
            throw ({ error: "Invalid password" })
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log(`Something went wrong in verifying the token`, error);
            throw ({ error })
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token, JWT_KEY);
            console.log(response);
            return response;
        } catch (error) {
            console.log(`Something went wrong in verifying the token`, error);
            throw ({ error })
        }
    }

    async isAdmin(userId) {
        try {
            const user = await this.userRepository.isAdmin(userId);
            return user;

        } catch (error) {
            console.log("Someting wrong in the service layer");
            throw ({ error });
        }
    }
}


module.exports = UserService