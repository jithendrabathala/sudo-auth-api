import HttpException from "../http-exception";

export default class TooManyRequests extends HttpException {
  constructor(message: string) {
    super(message, 429);
  }
}
