import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EncherePageComponent } from './features/encheres/enchere-page/enchere-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FormCategoryComponent } from './features/categories/form-category/form-category.component';
import { ListCategoryComponent } from './features/categories/list-category/list-category.component';
import { AddProductComponent } from './features/products/add-product/add-product.component';
import { ListProductComponent } from './features/products/list-product/list-product.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'side-bar',component:SideBarComponent},
  {path: 'top-bar',component:TopBarComponent},
  { path: 'Categoryform', component: FormCategoryComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-category', component: ListCategoryComponent },
  {
    path: 'encheres',
    component: EncherePageComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/encheres/enchere.routes').then((m) => m.enchereRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
];
