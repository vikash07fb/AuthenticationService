const {User} = require("../models/index");

class UserRepository{
    async create(data){
        try {
            const user =await User.create(data);
            return user ;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw({error});
        }
    }
    async update(userId,data){
        try {
            const user =await User.update(data,{
                where : {
                    id: userId
                }
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw({error});
        }
    }
    async get(userId){
        try {
            const user =await User.findByPk(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw({error});
        }
    }
    async delete(userId){
        try {
            await User.destroy(userId);
            return true;
        } catch (error) {
            console.log("Something went wrong in repo layer");
            throw({error});
        }
    }
}

module.exports= UserRepository;