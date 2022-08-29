import dayjs from 'dayjs/esm';

import { IMatch, NewMatch } from './match.model';

export const sampleWithRequiredData: IMatch = {
  id: 82797,
};

export const sampleWithPartialData: IMatch = {
  id: 81765,
  startingDate: dayjs('2022-08-25'),
  description: 'Iowa Cambridgeshire',
  title: 'User-friendly',
};

export const sampleWithFullData: IMatch = {
  id: 50059,
  startingDate: dayjs('2022-08-25'),
  endingDate: dayjs('2022-08-26'),
  description: 'Metal',
  title: 'white Granite envisioneer',
  delete: false,
};

export const sampleWithNewData: NewMatch = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
