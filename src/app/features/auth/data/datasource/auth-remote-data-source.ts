import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Injectable} from '@angular/core';
import {Credentials} from '../../domain/entity/credentials';

export interface AuthRemoteDataSourceBase {
  login(credentials: Credentials): Promise<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthRemoteDataSource implements AuthRemoteDataSourceBase {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {
  }

  async login(credentials: Credentials): Promise<string> {
    let result = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, credentials.toJson()));
    return result.toString();
  }
}
