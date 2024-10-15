



const CrudRepository = require('./crud-repository');
const User = require('../models/user');




class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }


    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch(error) {
            throw error;
        }
    }

}


module.exports = UserRepository;



