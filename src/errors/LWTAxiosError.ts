import { AxiosError } from 'axios';

export class AxiosErrorWrapper extends Error {
  error: AxiosError;
  constructor(error: AxiosError) {
    super();
    this.error = error;
  }
}
