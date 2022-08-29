import dayjs from 'dayjs/esm';

import { ISeason, NewSeason } from './season.model';

export const sampleWithRequiredData: ISeason = {
  id: 1079,
};

export const sampleWithPartialData: ISeason = {
  id: 24524,
  name: 'payment CSS',
  startingDate: dayjs('2022-08-26'),
};

export const sampleWithFullData: ISeason = {
  id: 7363,
  name: 'drive virtual',
  startingDate: dayjs('2022-08-26'),
  endingDate: dayjs('2022-08-25'),
};

export const sampleWithNewData: NewSeason = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
