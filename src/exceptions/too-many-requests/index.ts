import HttpException from "../http-exception";

export default class TooManyRequestsException extends HttpException {
  constructor(message: string) {
    super(message, 429);
  }
}
