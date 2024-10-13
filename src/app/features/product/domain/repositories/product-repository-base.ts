import {Failure} from '../../../../core/failure/failure';
import {Product} from '../entity/product';

export interface ProductRepositoryBase {

  getAll(limit: number, category: string | undefined): Promise<Failure | Product[]>;

  getCategories(): Promise<Failure | string[]>;
}
