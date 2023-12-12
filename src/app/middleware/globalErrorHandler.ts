/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../Errors/handleZodError";
import { handleCastError } from "../Errors/handleCastError";
import { TErrorSources } from "../interface/Error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;

    let message = err.message || 'something Went wrong';
    let errorSources: TErrorSources = [{
        path: "",
        message: 'Something went Wrong'

    }]

    //error checkup
    if (err instanceof ZodError) {
        const modifiedError = handleZodError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorSources = modifiedError?.errorSources
    } else if (err.name === 'CastError') {
        const modifiedError = handleCastError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorSources = modifiedError?.errorSources
    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        // stack: config.NODE_ENV === 'development' ? err?.stack : null
        stack: err?.stack
    });


}

export default globalErrorHandler