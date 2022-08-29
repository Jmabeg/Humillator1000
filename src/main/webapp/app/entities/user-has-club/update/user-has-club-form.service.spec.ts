import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-has-club.test-samples';

import { UserHasClubFormService } from './user-has-club-form.service';

describe('UserHasClub Form Service', () => {
  let service: UserHasClubFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHasClubFormService);
  });

  describe('Service methods', () => {
    describe('createUserHasClubFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserHasClubFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            rating: expect.any(Object),
            club: expect.any(Object),
            role: expect.any(Object),
          })
        );
      });

      it('passing IUserHasClub should create a new form with FormGroup', () => {
        const formGroup = service.createUserHasClubFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            rating: expect.any(Object),
            club: expect.any(Object),
            role: expect.any(Object),
          })
        );
      });
    });

    describe('getUserHasClub', () => {
      it('should return NewUserHasClub for default UserHasClub initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserHasClubFormGroup(sampleWithNewData);

        const userHasClub = service.getUserHasClub(formGroup) as any;

        expect(userHasClub).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserHasClub for empty UserHasClub initial value', () => {
        const formGroup = service.createUserHasClubFormGroup();

        const userHasClub = service.getUserHasClub(formGroup) as any;

        expect(userHasClub).toMatchObject({});
      });

      it('should return IUserHasClub', () => {
        const formGroup = service.createUserHasClubFormGroup(sampleWithRequiredData);

        const userHasClub = service.getUserHasClub(formGroup) as any;

        expect(userHasClub).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserHasClub should not enable id FormControl', () => {
        const formGroup = service.createUserHasClubFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserHasClub should disable id FormControl', () => {
        const formGroup = service.createUserHasClubFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
