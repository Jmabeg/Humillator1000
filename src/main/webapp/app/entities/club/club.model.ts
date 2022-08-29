export interface IClub {
  id: number;
  name?: string | null;
}

export type NewClub = Omit<IClub, 'id'> & { id: null };
