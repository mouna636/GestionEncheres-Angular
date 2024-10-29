import { Enchere } from './Enchere';
import { Role } from './Role';

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  isActive: boolean;
  profilePicture?: string;
  state: string;
  stateid: string;
  country: string;
  countryid: string;
  role: Role;
  encheres: Enchere[];
}
