import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface User {
  username: string;
  role: { id: number; name: string };
}

interface Offer {
  amount: number;
  timestamp: Date;
  user: User;
}

interface OfferUpdate {
  auctionId: string;
  newOffer: Offer;
  allOffers: Offer[];
  highestBid: Offer;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket | null = null;
  private activeUsers = new BehaviorSubject<User[]>([]);
  private offers = new BehaviorSubject<Offer[]>([]);
  private highestBid = new BehaviorSubject<Offer | null>(null);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor(
    private ngZone: NgZone,
    private toastr: ToastrService,
    private authS: AuthService,
    private router: Router
  ) {
    authS.getCurrentUserObservable().subscribe((user) => {
      if (user) {
        this.initializeSocket(user);
      }
    });
  }

  private initializeSocket(user: any) {
    console.log('Initializing WebSocket connection...', user);

    this.ngZone.runOutsideAngular(() => {
      this.socket = io('http://localhost:3000/auction', {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: 1000,
        timeout: 10000,
        withCredentials: true,
      });

      this.setupConnectionListeners();
      this.setupEventListeners(user);
    });
  }

  private setupConnectionListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.ngZone.run(() => {
        console.log('Connected to WebSocket server');
        this.connectionStatus.next(true);
        this.reconnectAttempts = 0;
      });
    });

    this.socket.on('connect_error', (error) => {
      this.ngZone.run(() => {
        console.error('Connection error:', error);
        this.connectionStatus.next(false);
        this.reconnectAttempts++;

        if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
          console.error('Max reconnection attempts reached');
          this.socket?.disconnect();
        }
      });
    });
  }

  private setupEventListeners(user: User) {
    if (!this.socket) return;

    this.socket.on(
      'userJoined',
      (data: {
        user: User;
        activeUsers: User[];
        currentOffers: Offer[];
        message: string;
      }) => {
        this.ngZone.run(() => {
          console.log('User joined:', data);
          this.activeUsers.next(data.activeUsers);
          this.offers.next(data.currentOffers);

          if (data.user.username !== user.username) {
            this.toastr.success(data.message, 'User Joined');
          }
        });
      }
    );

    this.socket.on(
      'userLeft',
      (data: { user: User; activeUsers: User[]; message: string }) => {
        this.ngZone.run(() => {
          console.log('User left:', data);
          this.activeUsers.next(data.activeUsers);
          this.toastr.info(data.message, 'User Left');
        });
      }
    );
    this.socket.on('kicked', (data: { message: string }) => {
      this.ngZone.run(() => {
        this.toastr.warning(data.message, 'Kicked from Auction');
        this.disconnect();
        this.router.navigate(['/']);
        this.activeUsers.next([]);
      });
    });

    this.socket.on(
      'userKicked',
      (data: { kickedUser: string; activeUsers: User[]; message: string }) => {
        this.ngZone.run(() => {
          console.log('User kicked:', data);
          this.activeUsers.next(data.activeUsers);
          this.toastr.info(data.message, 'User Kicked');
        });
      }
    );

    this.socket.on('offerUpdate', (data: OfferUpdate) => {
      this.ngZone.run(() => {
        console.log('Offer update received:', data);
        this.offers.next(data.allOffers);

        this.highestBid.next(data.highestBid);

        if (data.newOffer.user.username !== user.username) {
          this.toastr.info(
            `New bid: $${data.newOffer.amount}`,
            `Bid by ${data.newOffer.user.username}`
          );
        }
      });
    });

    this.socket.on('error', (error: { error: string }) => {
      this.ngZone.run(() => {
        console.error('WebSocket error:', error);
        this.toastr.error(error.error, 'Error');
      });
    });
  }

  joinRoom(auctionId: string, user: User) {
    if (!this.socket?.connected) {
      console.log('Socket not connected, attempting to connect...');
      this.socket?.connect();

      this.socket?.once('connect', () => {
        this.emitJoinRoom(auctionId, user);
      });
    } else {
      this.emitJoinRoom(auctionId, user);
    }
  }

  kickUser(auctionId: string, userToKick: string) {
    if (!this.socket?.connected) {
      console.error('Socket not connected');
      return;
    }

    this.authS.getCurrentUserObservable().subscribe((admin) => {
      if (admin && admin.role.name === 'admin') {
        this.socket?.emit('kickUser', {
          auctionId,
          adminUsername: admin.username,
          userToKick,
        });
      } else {
        this.toastr.error('Only admins can kick users', 'Unauthorized');
      }
    });
  }

  emitNewOffer(auctionId: string, user: User, amount: number) {
    console.log('Emitting new offer:', { auctionId, user, amount });

    this.socket?.emit(
      'NewOffer',
      {
        auctionId,
        user,
        offer: { amount },
      },
      (response: any) => {
        if (response?.status === 'success') {
          console.log('Offer placed successfully:', response);
          this.toastr.success('Your bid has been placed', 'Success');
        } else if (response?.status === 'error') {
          console.error('Error placing offer:', response);
          this.toastr.error(response.message, 'Error');
        }
      }
    );
  }

  getOffers(): Observable<Offer[]> {
    return this.offers.asObservable();
  }

  getHighestBid(): Observable<Offer | null> {
    return this.highestBid.asObservable();
  }

  private emitJoinRoom(auctionId: string, user: User) {
    console.log('Joining room:', { auctionId, user });

    this.socket?.emit('joinRoom', { auctionId, user }, (response: any) => {
      if (response?.status === 'success') {
        console.log('Successfully joined room:', response);
        // Initialize offers with current state
        if (response.currentOffers) {
          this.offers.next(response.currentOffers);
        }
      } else {
        console.error('Failed to join room:', response);
        this.toastr.error(
          response.message || 'Failed to join auction',
          'Error'
        );
      }
    });
  }

  leaveRoom(auctionId: string, username: string) {
    this.socket?.emit('leaveRoom', { auctionId, username });
    // Clear local state
    this.offers.next([]);
    this.highestBid.next(null);
  }

  getActiveUsers(): Observable<any[]> {
    return this.activeUsers.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connectionStatus.next(false);
      this.offers.next([]);
      this.highestBid.next(null);
      this.activeUsers.next([]);
    }
  }
}
