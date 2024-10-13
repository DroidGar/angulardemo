import {AuthRepositoryBase} from '../repositories/auth-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Injectable} from '@angular/core';
import {Credentials} from '../entity/credentials';
import {AuthRepository} from '../../data/repositories/auth-repository';

@Injectable({
  providedIn: 'root'
})
export class Logout {
  constructor(private readonly repository: AuthRepository) {
  }

  async execute(): Promise<Failure | void> {
    return this.repository.logout();
  }
}
