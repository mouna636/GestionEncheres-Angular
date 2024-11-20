import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Enchere, StatusEnum } from '../../../core/models/Enchere';
import { EncherePageComponent } from '../enchere-page/enchere-page.component';
import { EnchereService } from '../../../core/services/enchere.service';
import { AuthService } from '../../../core/services/auth.service';

interface Product {
  id: number;
  name: string;
  category: string;
  condition: string;
  brand: string;
  model: string;
  year: number;
  specifications: Record<string, string>;
  features: string[];
  location: string;
  shippingOptions: Array<{
    method: string;
    cost: number;
    estimatedDays: string;
  }>;
}

@Component({
  selector: 'app-enchere-detail',
  standalone: true,
  imports: [CommonModule, EncherePageComponent],
  templateUrl: './enchere-detail.component.html',
  styleUrls: ['./enchere-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnchereDetailComponent implements OnInit, OnDestroy {
  @ViewChild('subscribeButton') subscribeButton: any;

  private destroy$ = new Subject<void>();
  private enchereId: string;

  enchere$ = new BehaviorSubject<Enchere | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string | null>(null);
  isSubscribed$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<any>(null);

  activeTab: 'details' | 'shipping' | 'seller' = 'details';
  StatusEnum = StatusEnum;
  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private enchereService: EnchereService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.enchereId = this.activatedRoute.snapshot.params['id'];
    this.initializeProduct();
  }

  ngOnInit(): void {
    if (!this.enchereId) {
      this.error$.next('Invalid auction ID');
      this.isLoading$.next(false);
      return;
    }

    this.loadUser();
    this.loadEnchereData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUser(): void {
    this.authService
      .getCurrentUserObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.user$.next(user);
          this.checkSubscriptionStatus();
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.error$.next('Failed to load user data');
        },
      });
  }

  private loadEnchereData(): void {
    this.isLoading$.next(true);

    this.enchereService
      .getEnchere(this.enchereId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.enchere$.next(data);
          this.updateBidStatus();
          this.checkSubscriptionStatus();
          this.isLoading$.next(false);
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error loading enchere:', error);
          this.error$.next('Failed to load auction data');
          this.isLoading$.next(false);
          this.cdr.markForCheck();
        },
      });
  }

  private checkSubscriptionStatus(): void {
    const user = this.user$.value;
    const enchere = this.enchere$.value;

    if (!user || !enchere) return;

    this.enchereService
      .checkIfSubscribed(user.username, enchere.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (isSubscribed) => {
          this.isSubscribed$.next(isSubscribed);
          if (isSubscribed && this.subscribeButton) {
            this.subscribeButton.nativeElement.innerText = 'Subscribed';
            this.subscribeButton.nativeElement.disabled = true;
          }
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error checking subscription:', error);
        },
      });
  }

  private updateBidStatus(): void {
    const enchere = this.enchere$.value;
    if (!enchere) return;

    const now = new Date().getTime();
    const startDate = new Date(enchere.startDate);
    const endDate = new Date(enchere.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid dates:', {
        startDate: enchere.startDate,
        endDate: enchere.endDate,
      });
      return;
    }

    let newStatus: StatusEnum;

    if (now < startDate.getTime()) {
      newStatus = StatusEnum.UPCOMING;
    } else if (now > endDate.getTime() && endDate.getTime() !== 0) {
      newStatus = StatusEnum.ENDED;
    } else {
      newStatus = StatusEnum.RUNNING;
    }

    this.enchere$.next({ ...enchere, status: newStatus });
    this.cdr.markForCheck();
  }

  getTimeLeft(): string {
    const enchere = this.enchere$.value;
    if (!enchere) return '00:00:00';

    const now = new Date().getTime();
    const targetDate =
      enchere.status !== StatusEnum.RUNNING
        ? new Date(enchere.startDate).getTime()
        : new Date(enchere.endDate).getTime();

    const difference = targetDate - now;
    if (difference <= 0) return '00:00:00';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  onSubscribe(): void {
    const enchere = this.enchere$.value;
    if (!enchere) return;

    if (enchere.seller.id !== undefined) {
      this.enchereService
        .subscribe(enchere.seller.id, enchere.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isSubscribed$.next(true);
            if (this.subscribeButton) {
              this.subscribeButton.nativeElement.innerText = 'Subscribed';
              this.subscribeButton.nativeElement.disabled = true;
            }
            this.cdr.markForCheck();
          },
          error: (error) => {
            console.error('Error subscribing:', error);
          },
        });
    } else {
      console.error('Seller ID is undefined');
    }
  }

  enterAuctionRoom(): void {
    const enchere = this.enchere$.value;
    if (!enchere) return;

    this.router.navigate([`/room/enchere/${enchere.id}`]);
  }

  setActiveTab(tab: 'details' | 'shipping' | 'seller'): void {
    this.activeTab = tab;
    this.cdr.markForCheck();
  }

  getStatusClass(status: StatusEnum): string {
    const statusClasses: Record<StatusEnum, string> = {
      [StatusEnum.UPCOMING]: 'bg-warning',
      [StatusEnum.RUNNING]: 'bg-danger pulse-badge ',
      [StatusEnum.ENDED]: 'bg-secondary',
      [StatusEnum.CANCELLED]: 'bg-danger',
      [StatusEnum.SOLD]: 'bg-info',
      [StatusEnum.DRAFT]: 'bg-secondary',
      [StatusEnum.SCHEDULED]: 'bg-primary',
      [StatusEnum.PAUSED]: 'bg-warning',
      [StatusEnum.OPEN]: 'bg-success',
      [StatusEnum.CLOSED]: 'bg-secondary',
    };
    return statusClasses[status] || 'bg-secondary';
  }

  getImage(image: string): string {
    return `http://localhost:3000/uploads/images/encheres/${image}`;
  }

  private initializeProduct(): void {
    this.product = {
      id: 1,
      name: 'Rolex Daytona Chronograph',
      category: 'Luxury Watches',
      condition: 'Like New',
      brand: 'Rolex',
      model: 'Daytona',
      year: 2022,
      specifications: {
        'Case Material': '18k White Gold',
        Movement: 'Automatic',
        'Case Size': '40mm',
        'Water Resistance': '100m',
        Crystal: 'Sapphire',
        'Dial Color': 'Black',
        'Strap Material': 'Oysterflex',
        'Reference Number': '116519LN',
      },
      features: [
        'Chronograph function',
        'Tachymetric scale',
        'Screw-down pushers',
        'Original box and papers',
        'Factory warranty until 2025',
        'Certified authentic',
      ],
      location: 'Geneva, Switzerland',
      shippingOptions: [
        {
          method: 'Secured Express',
          cost: 150,
          estimatedDays: '2-3 business days',
        },
        {
          method: 'Standard Insured',
          cost: 75,
          estimatedDays: '5-7 business days',
        },
      ],
    };
  }
}
