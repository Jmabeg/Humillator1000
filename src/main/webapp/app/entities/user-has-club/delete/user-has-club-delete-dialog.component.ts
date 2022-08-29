import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserHasClub } from '../user-has-club.model';
import { UserHasClubService } from '../service/user-has-club.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './user-has-club-delete-dialog.component.html',
})
export class UserHasClubDeleteDialogComponent {
  userHasClub?: IUserHasClub;

  constructor(protected userHasClubService: UserHasClubService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userHasClubService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
