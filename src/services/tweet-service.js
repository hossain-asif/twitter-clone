const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');

const {TweetRepository, HashtagRepository} = require('../repositories');



let tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();



async function create(data){
    try {

        console.log('Service function started...');
        const content = data.content;

        // - select all hashtag using content.match(/#[a-zA-Z0-9_]+/g)
        // - then for each hashtag we should remove '#' and convert it to lower case using .map((tag) => tag.substring(1).toLowerCase());
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
        .map((tag) => tag.substring(1).toLowerCase()); 


        console.log(tags);

        // store the tweet in tweet collection
        const tweet = await tweetRepository.create(data);


        // - storing the hashtags
        // - find the already stored tags
        let alreadyPresentTags = await hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tags => tags.title);

        // - include as new which are not presented in DB. 
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));

        // 
        newTags = newTags.map(tag => {
            return {
                title: tag,
                tweets: [tweet.id]
            }
        });

        await hashtagRepository.bulkCreate(newTags);

        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });


        return tweet;

    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function get(tweetId){
    try {

        const tweet = await tweetRepository.getWithComments(tweetId);
        return tweet;

    } catch (error) {
        console.log(error);
        throw new AppError('Cannot get tweet', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    create,
    get
}