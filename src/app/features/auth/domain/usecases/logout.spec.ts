import {TestBed} from '@angular/core/testing';
import {Login} from './login';
import {AuthRepository} from '../../data/repositories/auth-repository';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {Logout} from './logout';

describe('Logout Use Case', () => {
  let logout: Logout;
  let repository: jasmine.SpyObj<AuthRepository>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('AuthRepository', ['logout']);

    TestBed.configureTestingModule({
      providers: [{provide: AuthRepository, useValue: repository}]
    });

    logout = TestBed.inject(Logout);
  });

  it('should return token on successful login', async () => {
    const token = 'test-token';
    repository.logout.and.returnValue(Promise.resolve());
    const result = await logout.execute();
    expect(result).toBeUndefined();
  });

  it('should return failure on login error', async () => {
    repository.logout.and.returnValue(Promise.resolve(new UnhandledFailure('Error while trying to logout')));
    const result = await logout.execute();
    expect(result).toEqual(new UnhandledFailure('Error while trying to logout'));
  });
});
