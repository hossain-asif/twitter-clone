


const {TweetService} = require('../services');

const { StatusCodes } = require('http-status-codes');
const upload = require('../config/file-upload-config.js');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const singleUploader = upload.single('image');


async function createTweet(req, res){
    try {
        // singleUploader(req, res, async function(err, data){
        //     if(err){
        //         return res.status(500).json({error: err}); 
        //     }
        // })

        const payload = { ...req.body };
        payload.image = req.file.location;
        console.log(req.body);




        const data = req.body;
        const response = await TweetService.create(data);

        SuccessResponse.data = response;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);

    } catch (error) {

        ErrorResponse.error = {
            message: error.message || 'Something went wrong',
            status: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        };
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}


async function getTweet(req, res){
    try {
        const response = await TweetService.get(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}



module.exports = {
    createTweet,
    getTweet
}
