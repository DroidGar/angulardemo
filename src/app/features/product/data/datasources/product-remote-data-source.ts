import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Product} from '../../domain/entity/product';
import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product-model';


@Injectable({
  providedIn: 'root',
  // @ts-ignore
  useClass: ProductRemoteDataSource
})
export abstract class ProductRemoteDataSourceBase {
  abstract getProducts(limit: number, category: string | undefined): Promise<Product[]>;

  abstract getProductById(id: number): Promise<Product>;

  abstract getCategories(): Promise<string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductRemoteDataSource extends ProductRemoteDataSourceBase {

  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {
    super();
  }

  override async getProducts(limit: number, category: string | undefined): Promise<Product[]> {
    let result: any[] = await firstValueFrom(
      this.http.get<any[]>(`${this.apiUrl}/products${category ? `/category/${category}` : ''}?limit=${limit}`)
    );
    return result.map(item => ProductModel.fromJson(item));
  }

  override async getProductById(id: number): Promise<Product> {
    let result: any = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/products/${id}`));
    return ProductModel.fromJson(result);
  }

  override async getCategories(): Promise<string[]> {
    return await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/products/categories`))
  }
}
