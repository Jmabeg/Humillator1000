export interface IClubRole {
  id: number;
  name?: string | null;
}

export type NewClubRole = Omit<IClubRole, 'id'> & { id: null };
