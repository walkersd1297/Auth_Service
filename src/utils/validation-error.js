const AppError = require('./error-handlers.js');
const {StatusCodes} = require('http-status-codes');
class ValidationError extends AppError{
    constructor(error){
        let name = error.name;
        let message = [];
        error.errors.forEach((err)=>{
            message.push(err.message);
        });
        super(
            name,
            message,
            "Cannot validate through the provided details",
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidationError;