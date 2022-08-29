import dayjs from 'dayjs/esm';

export interface ISeason {
  id: number;
  name?: string | null;
  startingDate?: dayjs.Dayjs | null;
  endingDate?: dayjs.Dayjs | null;
}

export type NewSeason = Omit<ISeason, 'id'> & { id: null };
