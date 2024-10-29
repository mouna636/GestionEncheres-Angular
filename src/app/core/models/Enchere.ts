import { User } from './User';

export interface Enchere {
  id: number;
  description: string;
  startingPrice: number;
  duration: number;
  createdAt: Date;
  status: StatusEnum;
  createdBy: User;
}

export interface StatusEnum {
  OPEN: 'open';
  CLOSED: 'closed';
  CANCELED: 'cancelled';
}
