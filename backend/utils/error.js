//custom error like in case of empty field we use this

export const errorHandler = (statusCode , message) => {
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
}