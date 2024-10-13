import {Failure} from '../../../../core/failure/failure';
import {Injectable} from '@angular/core';
import {Credentials} from '../entity/credentials';
import {AuthRepository} from '../../data/repositories/auth-repository';

@Injectable({
  providedIn: 'root'
})
export class Login {
  constructor(private readonly repository: AuthRepository) {
  }

  async execute(credentials: Credentials): Promise<Failure | string> {
    return this.repository.login(credentials);
  }
}
