import {ProductRepositoryBase} from '../repositories/product-repository-base';
import {GetAllProducts} from './get-all-products';
import {Product} from '../entity/product';
import {ProductRepository} from '../../data/repositories/product-repository';
import {Failure} from '../../../../core/failure/failure';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {GetAllCategories} from './get-all-categories';

describe('GetAllCategories', () => {

  let getAll: GetAllCategories
  let repository: jasmine.SpyObj<ProductRepositoryBase>

  beforeEach(() => {
    repository = jasmine.createSpyObj('ProductRepository', ['getCategories']);
    getAll = new GetAllCategories(repository);
  })

  it('should return products on successful get all', async () => {
    const data: string[] = [];
    repository.getCategories.and.returnValue(Promise.resolve(data));
    const result = await getAll.execute();
    expect(result).toBe(data);
  })

  it('should return failure on get all error', async () => {
    repository.getCategories.and.returnValue(Promise.resolve(new UnhandledFailure('Error while trying to get categories')));
    const result = await getAll.execute();
    expect(result).toBeInstanceOf(Failure);
  })

});
