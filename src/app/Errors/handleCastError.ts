import mongoose from "mongoose";


export const handleCastError = (err: mongoose.Error.CastError) => {
    // const errorSources: TErrorSources = [
    //     {
    //         path: err.path,
    //         message: err.message
    //     }
    // ]
    const errorMessage = `${err.value} is not a valid ID`
    const errorDetails = err
    const statusCode = 400
    return {
        statusCode,
        message: 'Invalid Id',

        errorMessage,
        errorDetails
    }

}