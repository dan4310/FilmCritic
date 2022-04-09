function BaseError(message, code) {
    var err = new Error(message);
    return {
        message,
        error: err.stack,
        code
    }
}

module.exports = {
    NotFoundError: (resource) => {
        return BaseError(
            `Resource not found ${resource}`, 
            "NOT_FOUND"
        )
    },
    RunTimeError: (error) => {
        return BaseError(
            error.message,
            error.stack
        )
    },
    QueryFailedError: (error, stack) => {
        var temp = BaseError(
            error.sqlMessage,
            'QUERY_FAILED'
        );
        temp.message = stack;
        return temp;
    },
    NotAllowedError: (message) => {
        return BaseError(
            `${message}`,
            "NOT_ALLOWED"
        )
    },
    NotAuthorizedError: (message) => {
        return BaseError(
            message,
            "NOT_AUTHORIZED"
        )
    },
    BadRequestError: (message) => {
        return BaseError(
            message,
            "BAD_REQUEST"
        )
    },
    DataResult: (data, message) => {
        return data;
    }
};