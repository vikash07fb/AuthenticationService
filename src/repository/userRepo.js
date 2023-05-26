
const { User, Role } = require("../models/index");
const UniqueConstraintError = require("../utils/errors/unique-constraint");
const ValidationError = require("../utils/errors/validation-error");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
           
           
            return user;
        } catch (error) {
            // console.log(error);
            if(error.name==="SequelizeValidationError"){
                
                throw new ValidationError(error);
            }
            if(error.name==="SequelizeUniqueConstraintError"){
                throw new UniqueConstraintError(error)
            }
            console.log("Something went wrong in repo layer");
            throw ({ error });
        }
    }
    async update(userId, data) {
        try {
            const user = await User.update(data, {
                where: {
                    id: userId
                }
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw error;
        }
    }
    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw ({ error });
        }
    }
    async getByEmail(emailId) {
        try {
            const user = await User.findOne({
                where: {
                    email: emailId
                }
            });

            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw ({ error });
        }
    }
    async delete(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw ({ error });
        }
    }
    async isAdmin(userId){
        try {
            const user = User.findByPk(userId);
            const chkAdmin = Role.findOne({
                where : {
                    name : "ADMIN"
                }
            })

            return user.hasRole(chkAdmin);
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw({error});
        }
    }
}

module.exports = UserRepository;