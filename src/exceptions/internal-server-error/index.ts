import HttpException from "../http-exception";

export default class InternalServerError extends HttpException {
  constructor(message: string) {
    super(message, 500);
  }
}
