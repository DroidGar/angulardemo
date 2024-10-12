import {ProductRepositoryBase} from '../repositories/product-repository-base';
import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategories {
  constructor(private repository: ProductRepositoryBase) {
  }

  async execute(): Promise<Failure | string[]> {
    return this.repository.getCategories();
  }
}
