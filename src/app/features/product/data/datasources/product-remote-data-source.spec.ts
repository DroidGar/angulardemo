import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {ProductRemoteDataSource} from './product-remote-data-source';
import {AuthRepository} from '../../../auth/data/repositories/auth-repository';
import {Observable, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

let mockResponse = [
  {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  },
  {
    "id": 10,
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  }
]
describe('ProductRemoteDataSource', () => {
  let remote: ProductRemoteDataSource;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: http}]
    });

    remote = new ProductRemoteDataSource(http);
  });

  it('should be created', () => {
    expect(remote).toBeTruthy();
  });

  it('should get products with limit 1', async () => {
    http.get.withArgs('https://fakestoreapi.com/products?limit=1').and.returnValue(of([]));
    const result = await remote.getProducts(1, undefined);
    expect(result).toEqual([]);
  })

  it('should get products with category and limit 10', async () => {
    http.get.withArgs('https://fakestoreapi.com/products/category/electronics?limit=10').and.returnValue(of([]));
    const result = await remote.getProducts(10, 'electronics');
    expect(result).toEqual([]);
  })

  it('should parse correctly response', async () => {
    http.get.withArgs('https://fakestoreapi.com/products/category/electronics?limit=2').and.returnValue(of(mockResponse));
    const result = await remote.getProducts(2, 'electronics');
    expect(result.length).toEqual(2);
  })

  it('should return categories', async () => {
    http.get.withArgs('https://fakestoreapi.com/products/categories').and.returnValue(of(['a','b']));
    const result = await remote.getCategories();
    expect(result.length).toEqual(2);
  })
})
