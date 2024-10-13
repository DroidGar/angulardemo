import {Failure} from '../../../../core/failure/failure';
import {Injectable} from '@angular/core';
import {ProductRepository} from '../../data/repositories/product-repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllCategories {
  constructor(private repository: ProductRepository) {
  }

  async execute(): Promise<Failure | string[]> {
    return this.repository.getCategories();
  }
}
