import {ProductRepositoryBase} from '../../domain/repositories/product-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Product} from '../../domain/entity/product';
import {Injectable} from '@angular/core';
import {ProductRemoteDataSource, ProductRemoteDataSourceBase} from '../datasources/product-remote-data-source';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository implements ProductRepositoryBase {

  constructor(protected remote: ProductRemoteDataSource) {
  }

  async getAll(limit: number, category: string | undefined): Promise<Failure | Product[]> {
    try {
      return this.remote.getProducts(limit, category);
    } catch (e: any) {
      return new UnhandledFailure(e.message);
    }
  }

  async getCategories(): Promise<Failure | string[]> {
    try {
      return this.remote.getCategories();
    } catch (e: any) {
      return new UnhandledFailure(e.message);
    }
  }
}
