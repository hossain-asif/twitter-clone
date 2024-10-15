

const { StatusCodes } = require('http-status-codes');
const {UserService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function signup(req, res){
    try {

        // console.log(req.body);

        const response = await UserService.signup({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        SuccessResponse.data = response;
        
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}


async function login(req, res){

    try {
        const response = await UserService.signin(req.body);
        SuccessResponse.data = response;
            
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}


module.exports = {
    signup,
    login
}


