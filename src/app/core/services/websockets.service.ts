import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket | null = null;
  private activeUsers = new BehaviorSubject<User[]>([]);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor(
    private ngZone: NgZone,
    private toastr: ToastrService,
    private authS: AuthService
  ) {
    authS.getCurrentUserObservable().subscribe((user) => {
      this.initializeSocket(user);
    });
    // this.initializeSocket();
  }

  private initializeSocket(user: any) {
    console.log('Initializing WebSocket connection...');
    console.log(user);

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
      this.socket.on('connect', () => {
        console.log('Connected to backend');
      });

      this.socket.on('connectionEstablished', (data) => {
        console.log('Connection established:', data);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
      });
      this.setupConnectionListeners();
      this.setupEventListeners(user);
      // this.startHeartbeat();
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

    this.socket.on('connectionEstablished', (data) => {
      console.log('Connection established:', data);
    });
  }

  private setupEventListeners(user: any) {
    if (!this.socket) return;

    this.socket.on(
      'userJoined',
      (data: { user: User; activeUsers: any; message: string }) => {
        console.log('USER JOINED', data);

        this.ngZone.run(() => {
          console.log(data.message);
          console.log('USER JOINED', data);

          this.activeUsers.next(data.activeUsers);
          if (data.user.username === user.username) return;

          this.toastr.success(data.message, 'User Joined');
        });
      }
    );

    this.socket.on(
      'userLeft',
      (data: { user: User; activeUsers: User[]; message: string }) => {
        this.ngZone.run(() => {
          console.log(data.message);
          this.activeUsers.next(data.activeUsers);
          const user = this.activeUsers.value.find(
            (u) => u.username === data.user.username
          );
          if (!user) return;
          this.toastr.info(data.message, 'User Left');
        });
      }
    );

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
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

  private emitJoinRoom(auctionId: string, user: User) {
    console.log('Emitting to join room:', auctionId, user);

    this.socket?.emit('joinRoom', { auctionId, user }, (response: any) => {
      if (response?.status === 'success') {
        console.log('Successfully emiited to join room:', response);
      }
    });
  }

  leaveRoom(auctionId: string, username: string) {
    this.socket?.emit('leaveRoom', { auctionId, username });
  }

  getActiveUsers(): Observable<User[]> {
    console.log('Getting active users', this.activeUsers);

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
    }
  }
}
interface User {
  username: string;
  role: string;
}
