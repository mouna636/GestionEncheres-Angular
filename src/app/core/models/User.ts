import { Enchere } from './Enchere';
import { Role } from './Role';

export interface User {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  isActive?: boolean;
  profilePicture?: string;
  country?: string;
  countryid?: string;
  role?: Role;
  encheres?: Enchere[];
<<<<<<< HEAD
=======
  rating?: number;

  createdAt?: Date;
>>>>>>> 7040cb29d832349db0d7336f22872348a1b1bdae
}
