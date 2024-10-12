import {FormGroup} from '@angular/forms';

export abstract class Credentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  abstract toJson(): Object;
}
