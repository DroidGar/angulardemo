import {TestBed} from '@angular/core/testing';
import {Login} from './login';
import {AuthRepository} from '../../data/repositories/auth-repository';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {CredentialsModel} from '../../data/models/credentials-model';

describe('Login Use Case', () => {
  let login: Login;
  let repository: jasmine.SpyObj<AuthRepository>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('AuthRepository', ['login']);

    TestBed.configureTestingModule({
      providers: [{provide: AuthRepository, useValue: repository}]
    });

    login = TestBed.inject(Login);
  });

  const credentials = CredentialsModel.fromJson({email: 'user@demo.com', password: '123456'});

  it('should return token on successful login', async () => {
    const token = 'test-token';
    repository.login.and.returnValue(Promise.resolve(token));
    const result = await login.execute(credentials);
    expect(result).toBe(token);
  });

  it('should return failure on login error', async () => {
    repository.login.and.returnValue(Promise.resolve(new UnhandledFailure('Error while trying to login')));
    const result = await login.execute(credentials);
    expect(result.toString()).toEqual('UnhandledFailure: Error while trying to login');
  });
});
