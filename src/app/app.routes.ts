import {Routes} from '@angular/router';
import {AuthComponent} from './features/auth/presentation/manager/auth.component';
import {ProductsComponent} from './features/product/presentation/manager/products.component';
import {GuardService} from './core/services/guard-service';

export const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'products', component: ProductsComponent, canActivate: [GuardService]},
];
