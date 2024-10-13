import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';
import {Injectable} from '@angular/core';
import {ProductRepository} from '../../data/repositories/product-repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllProducts {
  constructor(private repository: ProductRepository) {
  }

  async execute(limit: number, category: string | undefined): Promise<Failure | Product[]> {
    return this.repository.getAll(limit, category);
  }
}
