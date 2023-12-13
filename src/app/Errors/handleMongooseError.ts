import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/Error";


export const handleMongooseError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {

    const errorMessage = err.message

    const statusCode = 400;
    return {
        statusCode,
        message: 'Mongoose validation Error',
        errorMessage,
        errorDetails: err



    }

}