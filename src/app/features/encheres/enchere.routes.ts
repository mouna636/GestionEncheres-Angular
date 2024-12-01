import { Routes } from '@angular/router';
import { EnchereDetailComponent } from './enchere-detail/enchere-detail.component';
import { EnchereListComponent } from './enchere-list/enchere-list.component';
import { EncherePageComponent } from './enchere-page/enchere-page.component';

export const enchereRoutes: Routes = [
  {
    path: '',
    component: EncherePageComponent,

    children: [
      { path: '', component: EnchereListComponent },
      { path: ':id', component: EnchereDetailComponent },
    ],
  },
];
