export class BadRequestError extends Error {
  statusCode: number;
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Bad request';
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super();
    this.message = message + ' Not found';
    this.statusCode = 404;
  }
}
