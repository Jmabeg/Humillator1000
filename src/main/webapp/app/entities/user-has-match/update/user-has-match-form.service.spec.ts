import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-has-match.test-samples';

import { UserHasMatchFormService } from './user-has-match-form.service';

describe('UserHasMatch Form Service', () => {
  let service: UserHasMatchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHasMatchFormService);
  });

  describe('Service methods', () => {
    describe('createUserHasMatchFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserHasMatchFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isOwner: expect.any(Object),
            mark: expect.any(Object),
            match: expect.any(Object),
          })
        );
      });

      it('passing IUserHasMatch should create a new form with FormGroup', () => {
        const formGroup = service.createUserHasMatchFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isOwner: expect.any(Object),
            mark: expect.any(Object),
            match: expect.any(Object),
          })
        );
      });
    });

    describe('getUserHasMatch', () => {
      it('should return NewUserHasMatch for default UserHasMatch initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserHasMatchFormGroup(sampleWithNewData);

        const userHasMatch = service.getUserHasMatch(formGroup) as any;

        expect(userHasMatch).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserHasMatch for empty UserHasMatch initial value', () => {
        const formGroup = service.createUserHasMatchFormGroup();

        const userHasMatch = service.getUserHasMatch(formGroup) as any;

        expect(userHasMatch).toMatchObject({});
      });

      it('should return IUserHasMatch', () => {
        const formGroup = service.createUserHasMatchFormGroup(sampleWithRequiredData);

        const userHasMatch = service.getUserHasMatch(formGroup) as any;

        expect(userHasMatch).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserHasMatch should not enable id FormControl', () => {
        const formGroup = service.createUserHasMatchFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserHasMatch should disable id FormControl', () => {
        const formGroup = service.createUserHasMatchFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
