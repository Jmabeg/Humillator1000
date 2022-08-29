import { IUserHasMatchId } from './user-has-match-id.model';

export const sampleWithRequiredData: IUserHasMatchId = {};

export const sampleWithPartialData: IUserHasMatchId = {};

export const sampleWithFullData: IUserHasMatchId = {
  userId: 32965,
  matchId: 68046,
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
