import { IUserHasMatch, NewUserHasMatch } from './user-has-match.model';

export const sampleWithRequiredData: IUserHasMatch = {
  id: 11320,
};

export const sampleWithPartialData: IUserHasMatch = {
  id: 16588,
  mark: 83475,
};

export const sampleWithFullData: IUserHasMatch = {
  id: 11221,
  isOwner: false,
  mark: 35931,
};

export const sampleWithNewData: NewUserHasMatch = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
