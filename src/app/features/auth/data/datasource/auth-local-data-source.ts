import {StorageService} from '../../../../core/services/storage.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
  // @ts-ignore
  useClass: AuthLocalDataSource
})
export abstract class AuthLocalDataSourceBase {
  abstract saveToken(token: string): void;

  abstract getToken(): string | null;

  abstract removeToken(): void;
}

@Injectable({ providedIn: 'root' })
export class AuthLocalDataSource extends AuthLocalDataSourceBase {

  constructor(private storage: StorageService) {
    super();
  }

  override saveToken(token: string): void {
    this.storage.set('token', token);
  }

  override getToken(): string | null{
    return this.storage.get('token');
  }

  override removeToken(): void {
    this.storage.remove('token');
  }
}
