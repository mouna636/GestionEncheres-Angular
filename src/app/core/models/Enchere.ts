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
  seller: User;
  image: string;
  totalBids: number;
  currentHighestPrice: number;
  viewCount: number;
  rating: number;
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
}
