import { IClub } from 'app/entities/club/club.model';
import { IClubRole } from 'app/entities/club-role/club-role.model';

export interface IUserHasClub {
  id: number;
  rating?: number | null;
  club?: Pick<IClub, 'id'> | null;
  role?: Pick<IClubRole, 'id'> | null;
}

export type NewUserHasClub = Omit<IUserHasClub, 'id'> & { id: null };
