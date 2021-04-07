export class ForbiddenError extends Error {
  constructor(msg?: string) {
    super();
    this.name = new.target.name;
    this.message = msg ?? this.name;
  }
}
