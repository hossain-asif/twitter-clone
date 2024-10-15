const { StatusCodes } = require('http-status-codes');
const {CommentService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');




async function createComment(req, res){

    try {
        const response = await CommentService.create(req.query.modelId, req.query.modelType, req.user.id, req.body.content);
        SuccessResponse.message = 'Successfully created a new comment';
        SuccessResponse.data = response;
    
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}


module.exports = {
    createComment
}
