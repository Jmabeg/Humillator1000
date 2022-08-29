import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 30621,
};

export const sampleWithPartialData: INotification = {
  id: 64249,
};

export const sampleWithFullData: INotification = {
  id: 55330,
  minutes: 77848,
  isNotified: true,
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
