

const CrudRepository = require('./crud-repository');
const Tweet = require('../models/tweet');




class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet);
    }


    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = TweetRepository;
