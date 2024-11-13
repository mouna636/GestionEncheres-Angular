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
  createdBy: User;
}

export interface StatusEnum {
  UPCOMING: 'upcoming';
  OPEN: 'open';
  CLOSED: 'closed';
  CANCELED: 'cancelled';
}
