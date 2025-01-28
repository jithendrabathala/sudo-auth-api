import HttpException from "../http-exception";

export default class EntryAlreadyExists extends HttpException {
  constructor(message: string) {
    super(message, 409);
  }
}
