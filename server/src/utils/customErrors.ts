import logger from "../../log/config";

export class BadRequestError extends Error {
  statusCode: number;
  pathFile: string;
  method: string;
  constructor(pathFile: string, method: string) {
    super();
    this.statusCode = 400;
    this.message = 'Bad request';
    this.pathFile = pathFile;
    this.method = method;
    logger?.warn(this.message, { filePath: this.pathFile, method: this.method })
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
