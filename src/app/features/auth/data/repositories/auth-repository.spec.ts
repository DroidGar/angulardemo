import {CredentialsModel} from '../models/credentials-model';
import {AuthRepositoryBase} from '../../domain/repositories/auth-repository-base';
import {TestBed} from '@angular/core/testing';
import {AuthRemoteDataSource} from '../datasource/auth-remote-data-source';
import {AuthRepository} from './auth-repository';
import {AuthLocalDataSource} from '../datasource/auth-local-data-source';
import {provideHttpClient} from '@angular/common/http';
import {Failure} from '../../../../core/failure/failure';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';

describe('AuthRepository', () => {
  let repository: AuthRepositoryBase;
  let remote: AuthRemoteDataSource
  let local: AuthLocalDataSource

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    remote = TestBed.inject(AuthRemoteDataSource);
    local = TestBed.inject(AuthLocalDataSource);
    repository = new AuthRepository(remote, local);
  })

  const credentials = CredentialsModel.fromJson({email: 'user@demo.com', password: '123456'});

  it('should save token on successful login', async () => {
    const token = 'test-token';
    spyOn(remote, 'login').and.returnValue(Promise.resolve(token));
    spyOn(local, 'saveToken');

    const result = await repository.login(credentials);
    expect(result).toBe(token);
    expect(local.saveToken).toHaveBeenCalledWith(token);
  });

  it('should return UnhandledFailure on login error', async () => {
    spyOn(remote, 'login').and.returnValue(Promise.reject(new Error('Login failed')));

    const result = await repository.login(credentials);

    expect(result).toBeInstanceOf(UnhandledFailure);
    expect((result as Failure).message).toBe('Error while trying to login');
  });

  it('should remove token on logout', async () => {
    spyOn(local, 'removeToken');

    await repository.logout();

    expect(local.removeToken).toHaveBeenCalled();
  });

  it('should return UnhandledFailure on logout error', async () => {
    spyOn(local, 'removeToken').and.throwError('Logout failed');

    const result = await repository.logout();

    expect(result).toBeInstanceOf(UnhandledFailure);
    expect((result as Failure).message).toBe('Error while trying to logout');
  });
})
