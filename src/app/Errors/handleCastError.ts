import mongoose from "mongoose";
import { TErrorSources } from "../interface/Error";

export const handleCastError = (err: mongoose.Error.CastError) => {
    const errorSources: TErrorSources = [
        {
            path: err.path,
            message: err.message
        }
    ]
    const statusCode = 400
    return {
        statusCode,
        message: 'CastError Validation',
        errorSources,
    }

}