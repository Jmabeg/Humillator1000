import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserHasMatchFormService, UserHasMatchFormGroup } from './user-has-match-form.service';
import { IUserHasMatch } from '../user-has-match.model';
import { UserHasMatchService } from '../service/user-has-match.service';
import { IMatch } from 'app/entities/match/match.model';
import { MatchService } from 'app/entities/match/service/match.service';

@Component({
  selector: 'jhi-user-has-match-update',
  templateUrl: './user-has-match-update.component.html',
})
export class UserHasMatchUpdateComponent implements OnInit {
  isSaving = false;
  userHasMatch: IUserHasMatch | null = null;

  matchesSharedCollection: IMatch[] = [];

  editForm: UserHasMatchFormGroup = this.userHasMatchFormService.createUserHasMatchFormGroup();

  constructor(
    protected userHasMatchService: UserHasMatchService,
    protected userHasMatchFormService: UserHasMatchFormService,
    protected matchService: MatchService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMatch = (o1: IMatch | null, o2: IMatch | null): boolean => this.matchService.compareMatch(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userHasMatch }) => {
      this.userHasMatch = userHasMatch;
      if (userHasMatch) {
        this.updateForm(userHasMatch);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userHasMatch = this.userHasMatchFormService.getUserHasMatch(this.editForm);
    if (userHasMatch.id !== null) {
      this.subscribeToSaveResponse(this.userHasMatchService.update(userHasMatch));
    } else {
      this.subscribeToSaveResponse(this.userHasMatchService.create(userHasMatch));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserHasMatch>>): void {
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

  protected updateForm(userHasMatch: IUserHasMatch): void {
    this.userHasMatch = userHasMatch;
    this.userHasMatchFormService.resetForm(this.editForm, userHasMatch);

    this.matchesSharedCollection = this.matchService.addMatchToCollectionIfMissing<IMatch>(
      this.matchesSharedCollection,
      userHasMatch.match
    );
  }

  protected loadRelationshipsOptions(): void {
    this.matchService
      .query()
      .pipe(map((res: HttpResponse<IMatch[]>) => res.body ?? []))
      .pipe(map((matches: IMatch[]) => this.matchService.addMatchToCollectionIfMissing<IMatch>(matches, this.userHasMatch?.match)))
      .subscribe((matches: IMatch[]) => (this.matchesSharedCollection = matches));
  }
}
