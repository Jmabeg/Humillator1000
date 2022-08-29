import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClubRole, NewClubRole } from '../club-role.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClubRole for edit and NewClubRoleFormGroupInput for create.
 */
type ClubRoleFormGroupInput = IClubRole | PartialWithRequiredKeyOf<NewClubRole>;

type ClubRoleFormDefaults = Pick<NewClubRole, 'id'>;

type ClubRoleFormGroupContent = {
  id: FormControl<IClubRole['id'] | NewClubRole['id']>;
  name: FormControl<IClubRole['name']>;
};

export type ClubRoleFormGroup = FormGroup<ClubRoleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClubRoleFormService {
  createClubRoleFormGroup(clubRole: ClubRoleFormGroupInput = { id: null }): ClubRoleFormGroup {
    const clubRoleRawValue = {
      ...this.getFormDefaults(),
      ...clubRole,
    };
    return new FormGroup<ClubRoleFormGroupContent>({
      id: new FormControl(
        { value: clubRoleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(clubRoleRawValue.name),
    });
  }

  getClubRole(form: ClubRoleFormGroup): IClubRole | NewClubRole {
    return form.getRawValue() as IClubRole | NewClubRole;
  }

  resetForm(form: ClubRoleFormGroup, clubRole: ClubRoleFormGroupInput): void {
    const clubRoleRawValue = { ...this.getFormDefaults(), ...clubRole };
    form.reset(
      {
        ...clubRoleRawValue,
        id: { value: clubRoleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClubRoleFormDefaults {
    return {
      id: null,
    };
  }
}
