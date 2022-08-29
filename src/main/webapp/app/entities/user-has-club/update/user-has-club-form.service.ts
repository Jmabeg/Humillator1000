import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserHasClub, NewUserHasClub } from '../user-has-club.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserHasClub for edit and NewUserHasClubFormGroupInput for create.
 */
type UserHasClubFormGroupInput = IUserHasClub | PartialWithRequiredKeyOf<NewUserHasClub>;

type UserHasClubFormDefaults = Pick<NewUserHasClub, 'id'>;

type UserHasClubFormGroupContent = {
  id: FormControl<IUserHasClub['id'] | NewUserHasClub['id']>;
  rating: FormControl<IUserHasClub['rating']>;
  club: FormControl<IUserHasClub['club']>;
  role: FormControl<IUserHasClub['role']>;
};

export type UserHasClubFormGroup = FormGroup<UserHasClubFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserHasClubFormService {
  createUserHasClubFormGroup(userHasClub: UserHasClubFormGroupInput = { id: null }): UserHasClubFormGroup {
    const userHasClubRawValue = {
      ...this.getFormDefaults(),
      ...userHasClub,
    };
    return new FormGroup<UserHasClubFormGroupContent>({
      id: new FormControl(
        { value: userHasClubRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      rating: new FormControl(userHasClubRawValue.rating),
      club: new FormControl(userHasClubRawValue.club),
      role: new FormControl(userHasClubRawValue.role),
    });
  }

  getUserHasClub(form: UserHasClubFormGroup): IUserHasClub | NewUserHasClub {
    return form.getRawValue() as IUserHasClub | NewUserHasClub;
  }

  resetForm(form: UserHasClubFormGroup, userHasClub: UserHasClubFormGroupInput): void {
    const userHasClubRawValue = { ...this.getFormDefaults(), ...userHasClub };
    form.reset(
      {
        ...userHasClubRawValue,
        id: { value: userHasClubRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserHasClubFormDefaults {
    return {
      id: null,
    };
  }
}
