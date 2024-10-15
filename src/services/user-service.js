


const {UserRepository} = require('../repositories');

const userRepository = new UserRepository();


async function signup(data){

    try {

        console.log(data);

        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        throw error;
    }
}



async function getUserByEmail(email){
    try {

        const user = await userRepository.findBy({email});
        return user;
        
    } catch (error) {
        throw error;
    }
}


async function signin(data){
    
    try {
        const user = await getUserByEmail(data.email);
        if(!user){
            throw {
                message: 'no user found'
            };
        }

        if(!user.comparePassword(data.password)){
            throw {
                message: 'incorrect password',
            };
        }

        const token = user.genJWT();
        return token;

    } catch (error) {
        throw error;
    }
}


module.exports = {
    signup,
    signin
}