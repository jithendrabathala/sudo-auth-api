export default class HttpException extends Error {
  message: string;
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode: number, error: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = error;
  }
}
