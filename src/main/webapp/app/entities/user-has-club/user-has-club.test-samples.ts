import { IUserHasClub, NewUserHasClub } from './user-has-club.model';

export const sampleWithRequiredData: IUserHasClub = {
  id: 38249,
};

export const sampleWithPartialData: IUserHasClub = {
  id: 47155,
  rating: 28271,
};

export const sampleWithFullData: IUserHasClub = {
  id: 48412,
  rating: 70468,
};

export const sampleWithNewData: NewUserHasClub = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
