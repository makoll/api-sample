import { ValidationError } from 'class-validator';

export class ValidateErrors extends Error {
  errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super();
    this.name = new.target.name;
    this.message = this.name;
    this.errors = errors;
  }
}
