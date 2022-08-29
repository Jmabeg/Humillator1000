import { IUserHasMatch } from 'app/entities/user-has-match/user-has-match.model';

export interface INotification {
  id: number;
  minutes?: number | null;
  isNotified?: boolean | null;
  userHasMatch?: Pick<IUserHasMatch, 'id'> | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
