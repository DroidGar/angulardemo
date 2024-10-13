import {Failure} from '../../../../core/failure/failure';
import {Credentials} from '../entity/credentials';

export interface AuthRepositoryBase {
  login(credentials: Credentials): Promise<Failure | string>;

  logout(): Promise<Failure | void>;
}
