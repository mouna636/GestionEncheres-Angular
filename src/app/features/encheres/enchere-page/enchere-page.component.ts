import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-enchere-page',
  standalone: true,
<<<<<<< HEAD
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './enchere-page.component.html',
  styleUrl: './enchere-page.component.scss',
  encapsulation: ViewEncapsulation.None,
=======
  imports: [],
  templateUrl: './enchere-page.component.html',
  styleUrl: './enchere-page.component.scss',
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
})
export class EncherePageComponent {}
