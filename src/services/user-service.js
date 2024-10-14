const UserRepository = require('../repository/user-repository.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig.js');
const { use } = require('../routes/v1/index.js');

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong: Service layer");
            throw (error);
        }
    }

    async destroy(userId){
        try {
            await this.userRepository.destroy(userId);
            return true
        } catch (error) {
            console.log("Something went wrong: Service layer");
            throw (error);
        }
    }

    async signIn(email,password){
        try {
            const user = await this.userRepository.getByEmail(email);
            if(user === null){
                console.log("User not found");
                throw (error);
            }
            const isPasswordMatched = this.comparePassword(password, user.password);
            if(!isPasswordMatched){
                console.log("Password not matched");
                throw (error);
            }
            const token = await this.createToken({email:user.email, id: user.id});
            return token;

        } catch (error) {
            console.log("Something went wrong: Signing In");
            throw (error);
        }
    }
    async createToken(user){
        try {
            const token = await jwt.sign(user,JWT_KEY,{expiresIn: '1h'});
            return token;
        } catch (error) {
            console.log("Something went wrong: generating token");
            throw (error);
        }
    }

    async verifyToken(token){
        try {
            const result = await jwt.verify(token,JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong: verifying token");
            throw (error);
        }
    }

    comparePassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong: comparing password");
            throw (error);
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!token){
                throw {error:'Invalid token'};
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error:'no user with the corresponding token'}
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong: isAuthenticated");
            throw (error);
        }
    }
}

module.exports = UserService;