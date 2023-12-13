/* eslint-disable @typescript-eslint/no-explicit-any */


export const handleDuplicateError = (err: any) => {

    const match = err.message.match(/"([^"]*)"/);
    // Extract the matched value
    const extractedValue = match && match[1];

    const errorMessage = `${extractedValue} is already Existed`;
    const statusCode = 400;
    const errorDetails = err

    return {
        statusCode,
        message: 'Duplicate Entry',
        errorMessage,
        errorDetails



    }

}