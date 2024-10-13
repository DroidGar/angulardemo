import {FormGroup} from '@angular/forms';
import {Credentials} from '../../domain/entity/credentials';

export class CredentialsModel extends Credentials {
  protected constructor(email: string, password: string) {
    super(email, password);
  }

  static fromFormGroup(formBuilder: FormGroup): Credentials {
    const email = formBuilder.get('email')?.value;
    const password = formBuilder.get('password')?.value;
    return new CredentialsModel(email, password);
  }

  override toJson(): Object {
    return {
      email: this.email,
      password: this.password
    }
  }

  static fromJson(json: any): Credentials {
    return new CredentialsModel(json.email, json.password);
  }
}
