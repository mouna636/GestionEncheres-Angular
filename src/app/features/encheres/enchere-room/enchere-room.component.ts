import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  interval,
  map,
  Observable,
  of,
  startWith,
  Subscription,
  takeWhile,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../../core/services/websockets.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { EnchereService } from '../../../core/services/enchere.service';
import { Enchere } from '../../../core/models/Enchere';
import { EncherePageComponent } from '../enchere-page/enchere-page.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';

interface User {
  username: string;
  role: string;
}

@Component({
  selector: 'app-enchere-room',
  standalone: true,
  imports: [CommonModule, FormsModule, EncherePageComponent],
  animations: [
    // trigger('participantAnimation', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateX(-20px)' }),
    //     animate(
    //       '300ms ease-out',
    //       style({ opacity: 1, transform: 'translateX(0)' })
    //     ),
    //   ]),
    //   transition(':leave', [
    //     animate(
    //       '300ms ease-in',
    //       style({ opacity: 0, transform: 'translateX(-20px)' })
    //     ),
    //   ]),
    // ]),
  ],
  templateUrl: './enchere-room.component.html',
  styleUrls: ['./enchere-room.component.scss'],
})
export class EnchereRoomComponent {
  activeUsers: any[] = [];
  private subscription?: Subscription;
  user!: any;
  enchere!: Enchere;
  currentUserAllowed: boolean = false;
  loadingPermissions: boolean = true;
  constructor(
    private auctionSocketService: WebSocketService,
    private authService: AuthService,
    private enchereService: EnchereService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    const enchId = this.route.snapshot.params['id'];

    if (enchId) {
      this.fetchEnchere(enchId);
    } else {
      console.error('Enchere ID is not defined in the route parameters');
    }
    this.fetchUserAndCheckPermissions(enchId);

    if (typeof window !== 'undefined')
      window.addEventListener('beforeunload', this.onWindowUnload.bind(this));
  }

  fetchEnchere(id: string) {
    this.enchereService.getEnchere(id).subscribe({
      next: (enchere) => {
        console.log('Enchere:', enchere);
        this.enchere = enchere;
      },
      error: (error) => {
        console.error('Error fetching enchere:', error);
        this.router.navigate(['/encheres']);
      },
    });
  }

  fetchUserAndCheckPermissions(enchId: string) {
    this.authService.getCurrentUserObservable().subscribe({
      next: (user) => {
        this.user = user;
        console.log('Current user:', user);
        console.log(this.user.username);
        this.checkIfUserAllowed(user.username, +enchId);
        this.joinAuction(enchId, user);

        setTimeout(() => {
          this.subscription = this.auctionSocketService
            .getActiveUsers()
            .subscribe({
              next: (users: User[]) => {
                console.log('Active users:', users);

                this.activeUsers = users;

                this.cdr.detectChanges();
              },
              error: (error) => {
                console.error('WebSocket error:', error);
              },
            });
        }, 0);
      },
      error: (error) => {
        console.error('Error fetching current user:', error);

        this.currentUserAllowed = false;
      },
    });
  }

  joinAuction(enchereId: string, user: any) {
    this.auctionSocketService.joinRoom(enchereId, user);
  }

  leaveAuction() {
    this.auctionSocketService.leaveRoom(
      this.enchere.id.toString(),
      this.user?.username
    );
  }

  trackByUser(index: number, user: string): string {
    return user;
  }
  private onWindowUnload(event: Event) {
    this.leaveAuction();
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined')
      window.removeEventListener('beforeunload', this.onWindowUnload);

    // Unsubscribe from the active users subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Safely leave the auction room
    if (this.enchere && this.enchere.id && this.user && this.user.username) {
      this.auctionSocketService.leaveRoom(
        this.enchere.id.toString(),
        this.user.username
      );
      this.auctionSocketService.disconnect();
    }
  }

  itemName: string = 'Vintage Luxury Watch';
  itemDescription: string =
    'Rare 1960s Swiss luxury watch in pristine condition';
  itemImage: string = 'assets/watch.jpg';

  currentBid: number = 5000;
  bidAmount: number = 0;

  placeBid(): void {
    if (this.bidAmount > this.currentBid) {
      this.currentBid = this.bidAmount;
      // Implement bid submission logic
    }
  }

  timePassed(): { hours: number; minutes: number; seconds: number } {
    const currentTime = new Date().getTime();
    const startTime = new Date(this.enchere?.startDate).getTime();
    const diffInSeconds = Math.floor((currentTime - startTime) / 1000);

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return { hours, minutes, seconds };
  }

  checkIfUserAllowed(username: string, enchereId: number) {
    console.log('Checking if user is allowed:', username);
    if (!this.enchere) console.log('Enchere not loaded');
    this.enchereService.checkIfSubscribed(username, enchereId).subscribe({
      next: (response) => {
        console.log('Subscription check:', response);
        this.currentUserAllowed = response;
        this.loadingPermissions = false;
      },
      error: (error) => {
        console.error('Error checking subscription:', error);
      },
    });
  }
}
