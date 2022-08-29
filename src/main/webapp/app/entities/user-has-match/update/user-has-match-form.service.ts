import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserHasMatch, NewUserHasMatch } from '../user-has-match.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserHasMatch for edit and NewUserHasMatchFormGroupInput for create.
 */
type UserHasMatchFormGroupInput = IUserHasMatch | PartialWithRequiredKeyOf<NewUserHasMatch>;

type UserHasMatchFormDefaults = Pick<NewUserHasMatch, 'id' | 'isOwner'>;

type UserHasMatchFormGroupContent = {
  id: FormControl<IUserHasMatch['id'] | NewUserHasMatch['id']>;
  isOwner: FormControl<IUserHasMatch['isOwner']>;
  mark: FormControl<IUserHasMatch['mark']>;
  match: FormControl<IUserHasMatch['match']>;
};

export type UserHasMatchFormGroup = FormGroup<UserHasMatchFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserHasMatchFormService {
  createUserHasMatchFormGroup(userHasMatch: UserHasMatchFormGroupInput = { id: null }): UserHasMatchFormGroup {
    const userHasMatchRawValue = {
      ...this.getFormDefaults(),
      ...userHasMatch,
    };
    return new FormGroup<UserHasMatchFormGroupContent>({
      id: new FormControl(
        { value: userHasMatchRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      isOwner: new FormControl(userHasMatchRawValue.isOwner),
      mark: new FormControl(userHasMatchRawValue.mark),
      match: new FormControl(userHasMatchRawValue.match),
    });
  }

  getUserHasMatch(form: UserHasMatchFormGroup): IUserHasMatch | NewUserHasMatch {
    return form.getRawValue() as IUserHasMatch | NewUserHasMatch;
  }

  resetForm(form: UserHasMatchFormGroup, userHasMatch: UserHasMatchFormGroupInput): void {
    const userHasMatchRawValue = { ...this.getFormDefaults(), ...userHasMatch };
    form.reset(
      {
        ...userHasMatchRawValue,
        id: { value: userHasMatchRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserHasMatchFormDefaults {
    return {
      id: null,
      isOwner: false,
    };
  }
}
