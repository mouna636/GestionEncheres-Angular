import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EnchereListComponent } from './features/encheres/enchere-list/enchere-list.component';
import { EnchereDetailComponent } from './features/encheres/enchere-detail/enchere-detail.component';
import { EncherePageComponent } from './features/encheres/enchere-page/enchere-page.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
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
