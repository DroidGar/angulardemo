import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductComponent} from './product.component';
import {DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Product} from '../../domain/entity/product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef<ProductComponent>>;
  const productData: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    category: 'Test Category',
    description: '',
    image: ''
  };

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [MatIcon, MatButton],
      providers: [
        {provide: DialogRef, useValue: dialogRefSpyObj},
        {provide: DIALOG_DATA, useValue: productData}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(DialogRef) as jasmine.SpyObj<DialogRef<ProductComponent>>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product with injected data', () => {
    expect(component.product).toEqual(productData);
  });

  it('should close the dialog when close method is called', () => {
    component.dialogRef.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

});
