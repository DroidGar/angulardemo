import {Failure} from './failure';

export class UnhandledFailure extends Failure {
  constructor(message: string | undefined = 'Unhandled Failure') {
    super(message, 'UNHANDLED_FAILURE');
  }

  toString(): string {
    return `UnhandledFailure: ${this.message}`;
  }
}
