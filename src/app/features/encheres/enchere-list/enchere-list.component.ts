import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { EnchereCardComponent } from '../enchere-card/enchere-card.component';
import { EnchereService } from '../../../core/services/enchere.service';
import { Enchere } from '../../../core/models/Enchere';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enchere-list',
  standalone: true,
  imports: [NavbarComponent, RouterLink, EnchereCardComponent, CommonModule],
  templateUrl: './enchere-list.component.html',
  styleUrls: ['./enchere-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EnchereListComponent {
  encheres: Enchere[] = [];
  constructor(private service: EnchereService) {}

  ngOnInit() {
    this.service.getEncheres().subscribe({
      next: (data) => {
        console.log(data);
        this.encheres = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
