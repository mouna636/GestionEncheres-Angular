import { User } from './User';

export interface Enchere {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  createdAt: Date;
  status: StatusEnum;
<<<<<<< HEAD
  createdBy: User;
}

export interface StatusEnum {
  UPCOMING: 'upcoming';
  OPEN: 'open';
  CLOSED: 'closed';
  CANCELED: 'cancelled';
=======
  seller: User;
  image: string;
  totalBids: number;
  currentHighestPrice: number;
  viewCount: number;
  rating: number;
  product: any;
}

export enum StatusEnum {
  UPCOMING = 'upcoming',
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
  SOLD = 'sold',
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  PAUSED = 'paused',
  ENDED = 'ended',
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
}
