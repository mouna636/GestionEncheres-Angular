import { Component, Input } from '@angular/core';
import { Enchere } from '../../../core/models/Enchere';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enchere-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enchere-card.component.html',
  styleUrls: ['./enchere-card.component.scss'],
})
export class EnchereCardComponent {
  @Input() bid!: Enchere;

  getRemainingTimeToStart(): string {
    const now = new Date();
    const start = new Date(this.bid.startDate);
    const diff = start.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Started';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `Starts In: ${days}d ${hours}h`;
    } else {
      return `Starts In: ${hours}h`;
    }
  }

  getProgressWidth(bid: Enchere): number {
    // const increase = bid.currentPrice - bid.startPrice;
    // const maxIncrease = bid.startPrice; // 100% increase
    // return Math.min((increase / maxIncrease) * 100, 100);
    return 50;
  }

  getProgressWithToStart(bid: Enchere): number {
    const now = new Date();
    const start = new Date(bid.startDate);
    const diff = start.getTime() - now.getTime();

    const total = bid.duration * 60 * 60 * 1000;
    const remaining = total - diff;
    console.log(Math.min((remaining / total) * 100, 100));

    return Math.min((remaining / total) * 100, 100);
  }

  returnImage(image: string): string {
    return `http://localhost:3000/uploads/images/encheres/${image}`;
  }

  isEndingSoon(bid: Enchere): boolean {
    const now = new Date();

    const endDate = new Date(bid.endDate);
    const diffHours = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24 && bid.status === 'running';
  }

  isStartingSoon(bid: Enchere): boolean {
    const now = new Date();

    const startDate = new Date(bid.startDate);
    const diffHours = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24 && bid.status !== 'running';
  }

  startsIn(bid: Enchere): { days: number; hours: number } {
    const startDate = new Date(bid.startDate);
    const currentDate = new Date();
    const diffTime = Math.abs(startDate.getTime() - currentDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    console.log('Diff days:', diffDays, 'Diff hours:', diffHours);

    return { days: diffDays, hours: diffHours };
  }

  editBid(bid: Enchere) {
    console.log('Editing bid:', bid);
  }

  cancelBid(bid: Enchere) {
    console.log('Cancelling bid:', bid);
  }

  placeBid(bid: Enchere) {
    console.log('Placing bid on:', bid);
  }
}
