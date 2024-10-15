


const CrudRepository = require('./crud-repository');
const Like = require('../models/like');




class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }

    async findByUserAndLikeable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        } catch(error) {
            throw error;
        }
    }
}


module.exports = LikeRepository;
