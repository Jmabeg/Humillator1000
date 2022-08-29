import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISeason, NewSeason } from '../season.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISeason for edit and NewSeasonFormGroupInput for create.
 */
type SeasonFormGroupInput = ISeason | PartialWithRequiredKeyOf<NewSeason>;

type SeasonFormDefaults = Pick<NewSeason, 'id'>;

type SeasonFormGroupContent = {
  id: FormControl<ISeason['id'] | NewSeason['id']>;
  name: FormControl<ISeason['name']>;
  startingDate: FormControl<ISeason['startingDate']>;
  endingDate: FormControl<ISeason['endingDate']>;
};

export type SeasonFormGroup = FormGroup<SeasonFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SeasonFormService {
  createSeasonFormGroup(season: SeasonFormGroupInput = { id: null }): SeasonFormGroup {
    const seasonRawValue = {
      ...this.getFormDefaults(),
      ...season,
    };
    return new FormGroup<SeasonFormGroupContent>({
      id: new FormControl(
        { value: seasonRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(seasonRawValue.name),
      startingDate: new FormControl(seasonRawValue.startingDate),
      endingDate: new FormControl(seasonRawValue.endingDate),
    });
  }

  getSeason(form: SeasonFormGroup): ISeason | NewSeason {
    return form.getRawValue() as ISeason | NewSeason;
  }

  resetForm(form: SeasonFormGroup, season: SeasonFormGroupInput): void {
    const seasonRawValue = { ...this.getFormDefaults(), ...season };
    form.reset(
      {
        ...seasonRawValue,
        id: { value: seasonRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SeasonFormDefaults {
    return {
      id: null,
    };
  }
}
