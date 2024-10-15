




const { StatusCodes } = require('http-status-codes');
const {LikeService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');




async function toggleLike(req, res){

    

    try {
        const response = await LikeService.toggleLike(req.body.modelId, req.body.modelType, req.body.userId);
        SuccessResponse.message = 'Successfully toggled like';
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
    toggleLike
}







