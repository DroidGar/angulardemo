import {AuthLocalDataSource, AuthLocalDataSourceBase} from './auth-local-data-source';
import {TestBed} from '@angular/core/testing';

describe('AuthLocalDataSource', () => {
  let local: AuthLocalDataSourceBase

  beforeEach(() => {
    TestBed.configureTestingModule({});
    local = TestBed.inject(AuthLocalDataSource);
  })

  // tear down
  afterEach(() => {
    local.removeToken();
  })

  it('should be created', () => {
    expect(local).toBeTruthy();
  })

  it('should save a token', () => {
    const token = 'test-token';
    local.saveToken(token);
    expect(local.getToken()).toBe(token);
  });

  it('should retrieve a saved token', () => {
    const token = 'test-token';
    local.saveToken(token);
    expect(local.getToken()).toBe(token);
  });

  it('should return null if no token is saved', () => {
    expect(local.getToken()).toBeNull();
  });

  it('should remove a saved token', () => {
    const token = 'test-token';
    local.saveToken(token);
    local.removeToken();
    expect(local.getToken()).toBeNull();
  });
});
