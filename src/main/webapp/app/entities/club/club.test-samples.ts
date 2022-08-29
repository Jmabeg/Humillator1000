import { IClub, NewClub } from './club.model';

export const sampleWithRequiredData: IClub = {
  id: 68789,
};

export const sampleWithPartialData: IClub = {
  id: 31062,
  name: 'Borders quantify',
};

export const sampleWithFullData: IClub = {
  id: 44883,
  name: 'neural',
};

export const sampleWithNewData: NewClub = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
