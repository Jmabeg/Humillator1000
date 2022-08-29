import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../season.test-samples';

import { SeasonFormService } from './season-form.service';

describe('Season Form Service', () => {
  let service: SeasonFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonFormService);
  });

  describe('Service methods', () => {
    describe('createSeasonFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSeasonFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            startingDate: expect.any(Object),
            endingDate: expect.any(Object),
          })
        );
      });

      it('passing ISeason should create a new form with FormGroup', () => {
        const formGroup = service.createSeasonFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            startingDate: expect.any(Object),
            endingDate: expect.any(Object),
          })
        );
      });
    });

    describe('getSeason', () => {
      it('should return NewSeason for default Season initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSeasonFormGroup(sampleWithNewData);

        const season = service.getSeason(formGroup) as any;

        expect(season).toMatchObject(sampleWithNewData);
      });

      it('should return NewSeason for empty Season initial value', () => {
        const formGroup = service.createSeasonFormGroup();

        const season = service.getSeason(formGroup) as any;

        expect(season).toMatchObject({});
      });

      it('should return ISeason', () => {
        const formGroup = service.createSeasonFormGroup(sampleWithRequiredData);

        const season = service.getSeason(formGroup) as any;

        expect(season).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISeason should not enable id FormControl', () => {
        const formGroup = service.createSeasonFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSeason should disable id FormControl', () => {
        const formGroup = service.createSeasonFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
