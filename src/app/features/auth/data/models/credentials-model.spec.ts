import {FormControl, FormGroup} from "@angular/forms";
import {CredentialsModel} from './credentials-model';

describe('CredentialsModel', () => {
  it('should create CredentialsModel from FormGroup', () => {
    const formBuilder = new FormGroup({
      email: new FormControl('user@demo.com'),
      password: new FormControl('123456')
    });
    const credentials = CredentialsModel.fromFormGroup(formBuilder);
    expect(credentials.email).toBe('user@demo.com');
    expect(credentials.password).toBe('123456');
  });

  it('should create CredentialsModel from JSON', () => {
    const json = {email: 'user@demo.com', password: '123456'};
    const credentials = CredentialsModel.fromJson(json);
    expect(credentials.email).toBe('user@demo.com');
    expect(credentials.password).toBe('123456');
  });

  it('should convert CredentialsModel to JSON', () => {
    const payload = {email: 'user@demo.com', password: '123456'};
    const credentials = CredentialsModel.fromJson(payload);
    const json = credentials.toJson();
    expect(json).toEqual({email: 'user@demo.com', password: '123456'});
  });

  it('should handle missing email in FormGroup', () => {
    const formBuilder = new FormGroup({
      email: new FormControl(null),
      password: new FormControl('123456')
    });
    const credentials = CredentialsModel.fromFormGroup(formBuilder);
    expect(credentials.email).toBeNull();
    expect(credentials.password).toBe('123456');
  });

  it('should handle missing password in FormGroup', () => {
    const formBuilder = new FormGroup({
      email: new FormControl('user@demo.com'),
      password: new FormControl(null)
    });
    const credentials = CredentialsModel.fromFormGroup(formBuilder);
    expect(credentials.email).toBe('user@demo.com');
    expect(credentials.password).toBeNull();
  });
})
