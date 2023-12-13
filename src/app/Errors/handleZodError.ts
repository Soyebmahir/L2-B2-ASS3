import { TGenericErrorResponse } from "../interface/Error";
import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message
        }
    })
    const errorMessages = errorSources.map(error => `${error.path} is ${error.message}`)
    const errorMessage = errorMessages.join('. ')
    const errorDetails = err

    const statusCode = 400;

    return {
        statusCode,
        errorMessage,
        message: 'Validation Error',
        errorDetails

    }
}