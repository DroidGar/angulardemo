export abstract class Failure {
  message: string;
  code: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }

  abstract toString(): string
}
