import {Component, inject} from '@angular/core';
import {Dialog, DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Product} from '../../domain/entity/product';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: '../pages/product.component.html',
  styleUrl: '../pages/product.component.css',
  providers: [Dialog]
})
export class ProductComponent {
  dialogRef = inject(DialogRef);
  product: Product = inject(DIALOG_DATA);
}
