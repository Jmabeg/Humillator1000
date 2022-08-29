import { IMatch } from 'app/entities/match/match.model';

export interface IUserHasMatch {
  id: number;
  isOwner?: boolean | null;
  mark?: number | null;
  match?: Pick<IMatch, 'id'> | null;
}

export type NewUserHasMatch = Omit<IUserHasMatch, 'id'> & { id: null };
