

const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');

const {LikeRepository, TweetRepository} = require('../repositories');

const mongoose = require('mongoose');


const tweetRepository = new TweetRepository();
const likeRepository = new LikeRepository();



async function toggleLike(modelId, modelType, userId){
    
    try {
        let likeable;
    
        if(modelType == 'Tweet'){
            likeable = await tweetRepository.get(modelId);
        }
        else if(modelType == 'Comment'){
            likeable = await likeRepository.get(modelId); 
        }
        else{
            throw new Error('Unknown model type');
        }
    
        const exists = await likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        console.log( exists instanceof mongoose.Model);
        let isAdded;
        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save;
            await likeRepository.destroy({_id: exists.id });
            
            isAdded = false;
        }
        else{
            const newLike = await likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
    
            likeable.likes.push(newLike);
            await likeable.save();
        
            isAdded = true;
        }
    
        return isAdded;

    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    toggleLike
}