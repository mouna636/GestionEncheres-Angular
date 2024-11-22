<<<<<<< HEAD
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
=======
import { StatusEnum } from './../../../core/models/Enchere';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enchere } from '../../../core/models/Enchere';
import { EnchereService } from '../../../core/services/enchere.service';
import { RouterModule } from '@angular/router';
import { EnchereCardComponent } from '../enchere-card/enchere-card.component';
import { EncherePageComponent } from '../enchere-page/enchere-page.component';

@Component({
  selector: 'app-bid-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    EnchereCardComponent,
    EncherePageComponent,
  ],
  templateUrl: './enchere-list.component.html',
  styleUrls: ['./enchere-list.component.scss'],
})
export class EnchereListComponent implements OnInit {
  filters: string[] = ['all', 'open', 'closed', 'sold', 'cancelled'];
  currentFilter: string = 'all';
  searchTerm: string = '';
  view: 'grid' | 'list' = 'grid';
  encheres!: Enchere[];
  filteredEncheres: Enchere[] = [];

  ngOnInit() {
    this.fetchEncheres();
    this.filterBids(this.currentFilter);
  }

  constructor(private enchereService: EnchereService) {}

  filterBids(filter: string) {
    this.currentFilter = filter;
    if (this.encheres?.length === 0) return;
    this.filteredEncheres = this.encheres?.filter((bid) => {
      if (filter === 'all') return true; // if you have a "All" enum value
      return bid.status.toLowerCase() === filter;
    });
    this.applySearch();
  }

  fetchEncheres() {
    this.enchereService.getEncheres().subscribe((encheres) => {
      console.log('Encheres:', encheres);

      this.encheres = encheres;
      this.filteredEncheres = encheres;
    });
  }

  getBidCount(filter: any): number {
    if (this.encheres?.length === 0) return 0;
    return this.encheres?.filter((bid) =>
      filter === 'all' ? true : bid.status === filter
    )?.length;
  }

  getRemainingTime(bid: Enchere): string {
    const now = new Date();
    const start = new Date(bid.endDate);
    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    return `${hours}h`;
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

  onSearch() {
    this.applySearch();
  }

  applySearch() {
    if (this.encheres?.length === 0) return;
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredEncheres = this.encheres?.filter((bid) => {
      if (this.currentFilter !== 'all' && bid.status !== this.currentFilter)
        return false;
      return (
        bid.title.toLowerCase().includes(searchLower) ||
        bid.description.toLowerCase().includes(searchLower)
        // bid.highestBidder.toLowerCase().includes(searchLower) ||
        // bid.category.toLowerCase().includes(searchLower)
      );
    });
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
    return { days: diffDays, hours: diffHours };
  }

  toggleView() {
    this.view = this.view === 'grid' ? 'list' : 'grid';
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
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
}
