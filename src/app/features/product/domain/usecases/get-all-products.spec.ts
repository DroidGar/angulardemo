import {GetAllProducts} from './get-all-products';
import {Product} from '../entity/product';
import {ProductRepository} from '../../data/repositories/product-repository';
import {Failure} from '../../../../core/failure/failure';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';

describe('GetAllProducts', () => {

  let getAll: GetAllProducts
  let repository: jasmine.SpyObj<ProductRepository>

  beforeEach(() => {
    repository = jasmine.createSpyObj('ProductRepository', ['getAll']);
    getAll = new GetAllProducts(repository);
  })

  it('should return products on successful get all', async () => {
    const products: Product[] = [];
    repository.getAll.and.returnValue(Promise.resolve(products));
    const result = await getAll.execute(10, 'category');
    expect(result).toBe(products);
  })

  it('should return failure on get all error', async () => {
    repository.getAll.and.returnValue(Promise.resolve(new UnhandledFailure('Error while trying to get products')));
    const result = await getAll.execute(10, 'category');
    expect(result).toBeInstanceOf(Failure);
  })

});
