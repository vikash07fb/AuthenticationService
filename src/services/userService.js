const UserRepository =require("../repository/userRepo");


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
}

module.exports =UserService