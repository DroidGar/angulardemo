import {ProductRepositoryBase} from '../../domain/repositories/product-repository-base';
import {ProductRepository} from './product-repository';
import {ProductRemoteDataSource} from '../datasources/product-remote-data-source';
import {Product} from '../../domain/entity/product';
import {Failure} from '../../../../core/failure/failure';

describe('ProductRepository', () => {
  let repository: ProductRepositoryBase
  let remote: jasmine.SpyObj<ProductRemoteDataSource>

  beforeEach(() => {
    remote = jasmine.createSpyObj('ProductRepository', ['getProducts', 'getCategories']);
    repository = new ProductRepository(remote);
  })

  it('should return products on successful get all', async () => {
    const products: Product[] = [];
    remote.getProducts.and.returnValue(Promise.resolve(products));
    const result = await repository.getAll(10, 'category');
    expect(result).toBe(products);
  })

  it('should return failure on get all error', async () => {
    remote.getProducts.and.throwError(new Error('Error while trying to get products'));
    const result = await repository.getAll(10, 'category');
    expect(result).toBeInstanceOf(Failure);
  })

  it('should return categories on successful get all', async () => {
    const categories: string[] = ['a','b'];
    remote.getCategories.and.returnValue(Promise.resolve(categories));
    const result = await repository.getCategories();
    expect(result).toBe(categories);
    expect((result as string[]).length).toEqual(2);
  })

  it('should return failure on get categories error', async () => {
    remote.getCategories.and.throwError(new Error('Error while trying to get categories'));
    const result = await repository.getCategories();
    expect(result).toBeInstanceOf(Failure);
  })
})
