import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-enchere-page',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './enchere-page.component.html',
  styleUrl: './enchere-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EncherePageComponent {}
