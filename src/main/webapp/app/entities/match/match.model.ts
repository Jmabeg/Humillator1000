import dayjs from 'dayjs/esm';
import { IClub } from 'app/entities/club/club.model';
import { ISeason } from 'app/entities/season/season.model';

export interface IMatch {
  id: number;
  startingDate?: dayjs.Dayjs | null;
  endingDate?: dayjs.Dayjs | null;
  description?: string | null;
  title?: string | null;
  delete?: boolean | null;
  club?: Pick<IClub, 'id'> | null;
  season?: Pick<ISeason, 'id'> | null;
}

export type NewMatch = Omit<IMatch, 'id'> & { id: null };
