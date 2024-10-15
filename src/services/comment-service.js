

const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors');

const {CommentRepository, TweetRepository} = require('../repositories');


const tweetRepository = new TweetRepository();
const commentRepository = new CommentRepository();



async function create(modelId, modelType, userId, content){
    if(modelType == 'Tweet'){
        let commentable = await tweetRepository.get(modelId);
    }
    else if(modelType == 'Comment'){
        let commentable = await commentRepository.get(modelId);
    }
    else{
        throw new Error('Unknown model type');
    }

    const comment = await commentRepository.create({
        content: content,
        userId: userId,
        onModel: modelType,
        commentable: modelId,
        comments: []
    });

    commentable.comments.push(comment);
    await commentable.save();

    return comment;
}


module.exports = {
    create
}