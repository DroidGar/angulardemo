import {StorageService} from '../../../../core/services/storage.service';
import {Injectable} from '@angular/core';

export interface AuthLocalDataSourceBase {
  saveToken(token: string): void;

  getToken(): string | null;

  removeToken(): void;
}

@Injectable({providedIn: 'root'})
export class AuthLocalDataSource implements AuthLocalDataSourceBase {

  constructor(private storage: StorageService) {
  }

  saveToken(token: string): void {
    this.storage.set('token', token);
  }

  getToken(): string | null {
    return this.storage.get('token');
  }

  removeToken(): void {
    this.storage.remove('token');
  }
}
