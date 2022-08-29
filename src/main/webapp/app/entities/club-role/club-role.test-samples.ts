import { IClubRole, NewClubRole } from './club-role.model';

export const sampleWithRequiredData: IClubRole = {
  id: 34924,
};

export const sampleWithPartialData: IClubRole = {
  id: 23148,
  name: 'Account Street',
};

export const sampleWithFullData: IClubRole = {
  id: 60531,
  name: 'global azure',
};

export const sampleWithNewData: NewClubRole = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
