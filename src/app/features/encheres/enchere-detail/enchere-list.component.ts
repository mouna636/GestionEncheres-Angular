import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-enchere-detail',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './enchere-list.component.html',
  styleUrl: './enchere-list.component.scss',
})
export class EnchereListComponent {}
