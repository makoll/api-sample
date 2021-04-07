export class BadRequestError extends Error {
  detailMessages: string[] = [];
  constructor(detailMessages: string[]) {
    super();
    this.name = new.target.name;
    this.message = this.name;
    this.detailMessages = detailMessages;
  }
}
