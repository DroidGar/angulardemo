import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';
import {Injectable} from '@angular/core';
import {ProductRepository} from '../../data/repositories/product-repository';


@Injectable({
  providedIn: 'root',
  useClass: ProductRepository
})
export abstract class ProductRepositoryBase {

  abstract getAll(limit: number, category: string | undefined): Promise<Failure | Product[]>;

  abstract getById(id: number): Promise<Failure | Product>;

  abstract getCategories(): Promise<Failure | string[]>;
}
