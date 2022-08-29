import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { NotificationFormService, NotificationFormGroup } from './notification-form.service';
import { INotification } from '../notification.model';
import { NotificationService } from '../service/notification.service';
import { IUserHasMatch } from 'app/entities/user-has-match/user-has-match.model';
import { UserHasMatchService } from 'app/entities/user-has-match/service/user-has-match.service';

@Component({
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html',
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;
  notification: INotification | null = null;

  userHasMatchesSharedCollection: IUserHasMatch[] = [];

  editForm: NotificationFormGroup = this.notificationFormService.createNotificationFormGroup();

  constructor(
    protected notificationService: NotificationService,
    protected notificationFormService: NotificationFormService,
    protected userHasMatchService: UserHasMatchService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUserHasMatch = (o1: IUserHasMatch | null, o2: IUserHasMatch | null): boolean =>
    this.userHasMatchService.compareUserHasMatch(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.notification = notification;
      if (notification) {
        this.updateForm(notification);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.notificationFormService.getNotification(this.editForm);
    if (notification.id !== null) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
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

  protected updateForm(notification: INotification): void {
    this.notification = notification;
    this.notificationFormService.resetForm(this.editForm, notification);

    this.userHasMatchesSharedCollection = this.userHasMatchService.addUserHasMatchToCollectionIfMissing<IUserHasMatch>(
      this.userHasMatchesSharedCollection,
      notification.userHasMatch
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userHasMatchService
      .query()
      .pipe(map((res: HttpResponse<IUserHasMatch[]>) => res.body ?? []))
      .pipe(
        map((userHasMatches: IUserHasMatch[]) =>
          this.userHasMatchService.addUserHasMatchToCollectionIfMissing<IUserHasMatch>(userHasMatches, this.notification?.userHasMatch)
        )
      )
      .subscribe((userHasMatches: IUserHasMatch[]) => (this.userHasMatchesSharedCollection = userHasMatches));
  }
}
