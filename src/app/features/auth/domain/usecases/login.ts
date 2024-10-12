import {AuthRepositoryBase} from '../repositories/auth-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Injectable} from '@angular/core';
import {Credentials} from '../entity/credentials';

@Injectable({
  providedIn: 'root'
})
export class Login {
  constructor(private readonly repository: AuthRepositoryBase) {
  }

  async execute(credentials: Credentials): Promise<Failure | string> {
    return this.repository.login(credentials);
  }
}
