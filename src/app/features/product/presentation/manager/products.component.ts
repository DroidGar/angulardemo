import {Component, inject} from '@angular/core';
import {GetAllProducts} from '../../domain/usecases/get-all-products';
import {Product} from '../../domain/entity/product';
import {Failure} from '../../../../core/failure/failure';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {GetAllCategories} from '../../domain/usecases/get-all-categories';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {ProductComponent} from './product.component';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import {Logout} from '../../../auth/domain/usecases/logout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatButton,
    MatFormField,
    MatSelect,
    MatOption,
    DialogModule,
    MatLabel
  ],
  templateUrl: '../pages/products.component.html',
  styleUrl: '../pages/products.component.css',
  providers: []
})
export class ProductsComponent {
  displayColumns: string[] = ['id', 'name', 'category', 'price', 'actions'];
  dataSource: Product[] = [];
  categories: string[] = ['All'];
  selectedCategory: string = 'All';
  limits: number[] = [5, 10, 15, 20];
  selectedLimit: number = 10;
  dialog = inject(Dialog);

  constructor(
    private getAllProducts: GetAllProducts,
    private getAllCategories: GetAllCategories,
    private logout: Logout,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadCategories().then();
    this.loadProducts().then();
  }

  async loadCategories(): Promise<void> {
    let result = await this.getAllCategories.execute();
    if (result instanceof Failure) {
      console.error('ProductsComponent: Error', result);
      return;
    }
    this.categories.push(...result);
  }

  async loadProducts(): Promise<void> {
    let category = this.selectedCategory == 'All' ? undefined : this.selectedCategory;
    let result = await this.getAllProducts.execute(this.selectedLimit, category);
    if (result instanceof Failure) {
      console.error('ProductsComponent: Error', result);
      return;
    }
    this.dataSource = result;
  }

  async onShowDetail(product: Product): Promise<void> {
    let dialogRef = this.dialog.open(ProductComponent, {
      width: '600px',
      data: product
    });
  }

  onCategoryChange($event: MatSelectChange) {
    this.selectedCategory = $event.value;
    this.loadProducts().then();
  }

  onLimitChange($event: MatSelectChange) {
    this.selectedLimit = $event.value;
    this.loadProducts().then();
  }

  async onLogout() {
    let result = await this.logout.execute();
    if (result instanceof Failure) {
      console.error('ProductsComponent: Error', result);
      return;
    }
    this.router.navigate(['/auth']).then();
  }
}
