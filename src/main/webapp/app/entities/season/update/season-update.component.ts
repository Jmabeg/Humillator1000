import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SeasonFormService, SeasonFormGroup } from './season-form.service';
import { ISeason } from '../season.model';
import { SeasonService } from '../service/season.service';

@Component({
  selector: 'jhi-season-update',
  templateUrl: './season-update.component.html',
})
export class SeasonUpdateComponent implements OnInit {
  isSaving = false;
  season: ISeason | null = null;

  editForm: SeasonFormGroup = this.seasonFormService.createSeasonFormGroup();

  constructor(
    protected seasonService: SeasonService,
    protected seasonFormService: SeasonFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ season }) => {
      this.season = season;
      if (season) {
        this.updateForm(season);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const season = this.seasonFormService.getSeason(this.editForm);
    if (season.id !== null) {
      this.subscribeToSaveResponse(this.seasonService.update(season));
    } else {
      this.subscribeToSaveResponse(this.seasonService.create(season));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeason>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(season: ISeason): void {
    this.season = season;
    this.seasonFormService.resetForm(this.editForm, season);
  }
}
