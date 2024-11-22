import { Routes } from '@angular/router';
import { EnchereDetailComponent } from './enchere-detail/enchere-detail.component';
import { EnchereListComponent } from './enchere-list/enchere-list.component';
import { EncherePageComponent } from './enchere-page/enchere-page.component';
<<<<<<< HEAD

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
=======
import { EnchereFormComponent } from './enchere-form/enchere-form.component';

export const enchereRoutes: Routes = [];
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
