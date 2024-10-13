import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductsComponent} from './products.component';
import {GetAllProducts} from '../../domain/usecases/get-all-products';
import {GetAllCategories} from '../../domain/usecases/get-all-categories';
import {Logout} from '../../../auth/domain/usecases/logout';
import {Router} from '@angular/router';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import {Product} from '../../domain/entity/product';
import {MatSelectChange} from '@angular/material/select';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductModel} from '../../data/models/product-model';
import {ProductComponent} from './product.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let getAllProductsSpy: jasmine.SpyObj<GetAllProducts>;
  let getAllCategoriesSpy: jasmine.SpyObj<GetAllCategories>;
  let logoutSpy: jasmine.SpyObj<Logout>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<Dialog>;

  beforeEach(async () => {
    const getAllProductsSpyObj = jasmine.createSpyObj('GetAllProducts', ['execute']);
    const getAllCategoriesSpyObj = jasmine.createSpyObj('GetAllCategories', ['execute']);
    const logoutSpyObj = jasmine.createSpyObj('Logout', ['execute']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const dialogSpyObj = jasmine.createSpyObj('Dialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ProductsComponent,
        DialogModule,
      ],
      providers: [
        {provide: GetAllProducts, useValue: getAllProductsSpyObj},
        {provide: GetAllCategories, useValue: getAllCategoriesSpyObj},
        {provide: Logout, useValue: logoutSpyObj},
        {provide: Router, useValue: routerSpyObj},
        {provide: Dialog, useValue: dialogSpyObj}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    getAllProductsSpy = TestBed.inject(GetAllProducts) as jasmine.SpyObj<GetAllProducts>;
    getAllCategoriesSpy = TestBed.inject(GetAllCategories) as jasmine.SpyObj<GetAllCategories>;
    logoutSpy = TestBed.inject(Logout) as jasmine.SpyObj<Logout>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogSpy = TestBed.inject(Dialog) as jasmine.SpyObj<Dialog>;
    fixture.detectChanges();
  });

  const productData = {id: 1, name: 'Product 1', price: 100, category: 'Category 1', description: '', image: ''};
  const product = ProductModel.fromJson(productData);

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', async () => {
    const categories = ['Electronics', 'Books'];
    getAllCategoriesSpy.execute.and.returnValue(Promise.resolve(categories));
    await component.ngOnInit();
    expect(component.categories).toContain('All');
    expect(component.categories).toContain('Electronics');
    expect(component.categories).toContain('Books');
  });

  it('should handle failure when loading categories', async () => {
    getAllCategoriesSpy.execute.and.returnValue(Promise.resolve(new UnhandledFailure('Error')));
    await component.ngOnInit();
    expect(component.categories).toEqual(['All']);
  });

  it('should load products on init', async () => {
    getAllProductsSpy.execute.and.returnValue(Promise.resolve([product]));
    getAllCategoriesSpy.execute.and.returnValue(Promise.resolve([]));
    await component.ngOnInit();
    expect(component.dataSource).toEqual([product]);
  });

  it('should handle failure when loading products', async () => {
    getAllProductsSpy.execute.and.returnValue(Promise.resolve(new UnhandledFailure('Error')));
    getAllCategoriesSpy.execute.and.returnValue(Promise.resolve([]));
    await component.ngOnInit();
    expect(component.dataSource).toEqual([] as Product[]);
  });

  it('should reload products on category change', async () => {
    const event = {value: 'Electronics'} as MatSelectChange;
    component.onCategoryChange(event);
    expect(getAllProductsSpy.execute).toHaveBeenCalled();
  });

  it('should reload products on limit change', async () => {
    const event = {value: 20} as MatSelectChange;
    component.onLimitChange(event);
    expect(getAllProductsSpy.execute).toHaveBeenCalled();
  });

  it('should navigate to auth on successful logout', async () => {
    logoutSpy.execute.and.returnValue(Promise.resolve());
    await component.onLogout();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should handle failure when logging out', async () => {
    logoutSpy.execute.and.returnValue(Promise.resolve(new UnhandledFailure('Error')));
    await component.onLogout();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
