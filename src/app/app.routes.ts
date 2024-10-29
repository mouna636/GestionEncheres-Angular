import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EnchereListComponent } from './features/encheres/enchere-list/enchere-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'encheres', component: EnchereListComponent },
];
