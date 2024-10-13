export abstract class Credentials {
  email: string;
  password: string;

  protected constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  abstract toJson(): Object;

}
