import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Product} from '../../domain/entity/product';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product-model';


export interface ProductRemoteDataSourceBase {
  getProducts(limit: number, category: string | undefined): Promise<Product[]>;

  getCategories(): Promise<string[]>;
}

@Injectable({providedIn: 'root'})
export class ProductRemoteDataSource implements ProductRemoteDataSourceBase {

  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {
  }

  async getProducts(limit: number, category: string | undefined): Promise<Product[]> {
    let result: any[] = await firstValueFrom(
      this.http.get<any[]>(`${this.apiUrl}/products${category ? `/category/${category}` : ''}?limit=${limit}`)
    );
    return result.map(item => ProductModel.fromJson(item));
  }

  async getCategories(): Promise<string[]> {
    return await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/products/categories`))
  }
}
