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
