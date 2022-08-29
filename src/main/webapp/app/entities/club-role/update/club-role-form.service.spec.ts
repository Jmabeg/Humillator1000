import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../club-role.test-samples';

import { ClubRoleFormService } from './club-role-form.service';

describe('ClubRole Form Service', () => {
  let service: ClubRoleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubRoleFormService);
  });

  describe('Service methods', () => {
    describe('createClubRoleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClubRoleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });

      it('passing IClubRole should create a new form with FormGroup', () => {
        const formGroup = service.createClubRoleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });
    });

    describe('getClubRole', () => {
      it('should return NewClubRole for default ClubRole initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createClubRoleFormGroup(sampleWithNewData);

        const clubRole = service.getClubRole(formGroup) as any;

        expect(clubRole).toMatchObject(sampleWithNewData);
      });

      it('should return NewClubRole for empty ClubRole initial value', () => {
        const formGroup = service.createClubRoleFormGroup();

        const clubRole = service.getClubRole(formGroup) as any;

        expect(clubRole).toMatchObject({});
      });

      it('should return IClubRole', () => {
        const formGroup = service.createClubRoleFormGroup(sampleWithRequiredData);

        const clubRole = service.getClubRole(formGroup) as any;

        expect(clubRole).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClubRole should not enable id FormControl', () => {
        const formGroup = service.createClubRoleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClubRole should disable id FormControl', () => {
        const formGroup = service.createClubRoleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
