import { IUserHasClubId } from './user-has-club-id.model';

export const sampleWithRequiredData: IUserHasClubId = {};

export const sampleWithPartialData: IUserHasClubId = {
  clubId: 22679,
};

export const sampleWithFullData: IUserHasClubId = {
  userId: 10814,
  clubId: 55419,
  roleId: 71640,
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
