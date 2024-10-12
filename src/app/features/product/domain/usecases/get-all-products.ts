import {ProductRepositoryBase} from '../repositories/product-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllProducts {
  constructor(private repository: ProductRepositoryBase) {
  }

  async execute(limit: number, category: string | undefined): Promise<Failure | Product[]> {
    return this.repository.getAll(limit, category);
  }
}
