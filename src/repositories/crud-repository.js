const { logger } = require('../config');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/errors')
 

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        let response = await this.model.create(data);
        return response;
    }

    async destroy(id){
        let response = await this.model.findByIdAndDelete(id);
        if(response == null){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id){
        let response = await this.model.findById(id);
        if(response == null){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(){
        let response = await this.model.find({});
        return response;
    }

    async update(id, data){
        let response = await this.model.findByIdAndUpdate(id, data, {new: true});
        if(response == null){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports = CrudRepository;