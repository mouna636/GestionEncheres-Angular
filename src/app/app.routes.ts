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
import { EnchereDetailComponent } from './features/encheres/enchere-detail/enchere-detail.component';
import { EnchereFormComponent } from './features/encheres/enchere-form/enchere-form.component';
import { EnchereListComponent } from './features/encheres/enchere-list/enchere-list.component';
import { EnchereRoomComponent } from './features/encheres/enchere-room/enchere-room.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'top-bar', component: TopBarComponent },
  { path: 'Categoryform', component: FormCategoryComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-category', component: ListCategoryComponent },
  {
    path: 'room/enchere/:id',
    component: EnchereRoomComponent,
  },
  {
    path: 'encheres',
    component: EnchereListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-enchere',
    component: EnchereFormComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'encheres/edit/:id',
    component: EnchereFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'encheres/:id',
    component: EnchereDetailComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
];
