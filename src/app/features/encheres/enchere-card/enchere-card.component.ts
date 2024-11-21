import { Component, Input } from '@angular/core';
import { Enchere } from '../../../core/models/Enchere';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enchere-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enchere-card.component.html',
  styleUrls: ['./enchere-card.component.scss'],
})
export class EnchereCardComponent {
  @Input() enchere!: Enchere;

  dateDiff() {
    const startDate = new Date('2024-11-03T00:00:00');
    const currentDate = new Date();
    const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return { days: diffDays, hours: diffHours };
  }
}
