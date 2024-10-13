import {Failure} from '../../../../core/failure/failure';
import {AuthRepositoryBase} from '../../domain/repositories/auth-repository-base';
import {AuthRemoteDataSource} from '../datasource/auth-remote-data-source';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {Injectable} from '@angular/core';
import {Credentials} from '../../domain/entity/credentials';
import {AuthLocalDataSource} from '../datasource/auth-local-data-source';

@Injectable({providedIn: 'root'})
export class AuthRepository implements AuthRepositoryBase {
  constructor(private remote: AuthRemoteDataSource, private local: AuthLocalDataSource) {
  }

  async logout(): Promise<Failure | void> {
    try {
      this.local.removeToken();
    } catch (error) {
      return new UnhandledFailure('Error while trying to logout');
    }
  }

  async login(credentials: Credentials): Promise<Failure | string> {
    try {
      let token = await this.remote.login(credentials);
      this.local.saveToken(token);
      return token;
    } catch (error) {
      return new UnhandledFailure('Error while trying to login');
    }
  }

}
