import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EnchereListComponent } from './features/encheres/enchere-list/enchere-list.component';
import { EnchereDetailComponent } from './features/encheres/enchere-detail/enchere-detail.component';
import { EncherePageComponent } from './features/encheres/enchere-page/enchere-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { enchereRoutes } from './features/encheres/enchere.routes';
import { EnchereFormComponent } from './features/encheres/enchere-form/enchere-form.component';
import { EnchereRoomComponent } from './features/encheres/enchere-room/enchere-room.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'room/enchere/:id',
    component: EnchereRoomComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'encheres',
    component: EnchereListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'encheres/create',
    component: EnchereFormComponent,
    canActivate: [AuthGuard],
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
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/' }, // Catch-all route for invalid URLs
];
