import {Failure} from '../../../../core/failure/failure';
import {Injectable} from '@angular/core';
import {AuthRepository} from '../../data/repositories/auth-repository';
import {Credentials} from '../entity/credentials';

@Injectable({
  providedIn: 'root',
  useClass: AuthRepository
})
export abstract class AuthRepositoryBase {
  abstract login(credentials: Credentials): Promise<Failure | string>;
  abstract logout(): Promise<Failure | void>;
}
