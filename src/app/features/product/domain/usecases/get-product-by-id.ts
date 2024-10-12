import {ProductRepositoryBase} from '../repositories/product-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetProductById {
  constructor(private repository: ProductRepositoryBase) {
  }

  async execute(id: number): Promise<Failure | Product> {
    return this.repository.getById(id);
  }
}
