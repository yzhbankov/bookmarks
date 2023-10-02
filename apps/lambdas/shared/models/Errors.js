class BaseError {

    constructor(message, httpStatus) {
        this.message = message;
        this.statusCode = httpStatus;
    }
}

export class UnprocessableEntityError extends BaseError {
    constructor(message = 'Unprocessable Entity Error') {
        super(message, 422);
    }
}

export class NotFoundError extends BaseError {
    constructor(message = 'Not Found Error') {
        super(message, 404);
    }
}

export class BadRequestError extends BaseError {
    constructor(message = 'Bad Request Error') {
        super(message, 400);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized Error') {
        super(message, 401);
    }
}
