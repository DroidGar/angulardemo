import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Injectable} from '@angular/core';
import {ProductRemoteDataSource} from '../../../product/data/datasources/product-remote-data-source';
import {Credentials} from '../../domain/entity/credentials';

@Injectable({
  providedIn: 'root',
  // @ts-ignore
  useClass: AuthRemoteDataSource
})
export abstract class AuthRemoteDataSourceBase {
  abstract login(credentials: Credentials): Promise<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthRemoteDataSource extends AuthRemoteDataSourceBase {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {
    super();
  }

  async login(credentials: Credentials): Promise<string> {
    let result = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, credentials.toJson()));
    return result.toString();
  }
}
