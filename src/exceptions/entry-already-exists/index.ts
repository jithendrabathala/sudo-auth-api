import HttpException from "../http-exception";

export default class EntryAlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}
