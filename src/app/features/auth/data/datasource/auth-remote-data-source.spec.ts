import {TestBed} from '@angular/core/testing';
import {AuthRemoteDataSource, AuthRemoteDataSourceBase} from './auth-remote-data-source';
import {CredentialsModel} from '../models/credentials-model';
import {HttpErrorResponse, provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpInterceptor} from '../../../../core/interceptors/http.interceptor';

describe('AuthRemoteDataSource', () => {
  let remote: AuthRemoteDataSourceBase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([httpInterceptor]))],
    });

    remote = TestBed.inject(AuthRemoteDataSource);
  });

  it('should be created', () => {
    expect(remote).toBeTruthy();
  });

  it('should return a token for valid login', async () => {
    const credentials = CredentialsModel.fromJson({email: 'user@demo.com', password: '123456'});
    const token = 'eyxxxxxxxxxxx';
    const result = await remote.login(credentials);
    expect(result).toBe(token);
  });

  it('should return an error for invalid login', async () => {
    const credentials = CredentialsModel.fromJson({email: 'sad', password: '123'});
    try {
      await remote.login(credentials);
      fail('Expected an error');
    } catch (e: any) {
      expect(e).toBeInstanceOf(HttpErrorResponse);
    }
  })

})
