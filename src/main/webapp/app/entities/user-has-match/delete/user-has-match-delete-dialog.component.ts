import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserHasMatch } from '../user-has-match.model';
import { UserHasMatchService } from '../service/user-has-match.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './user-has-match-delete-dialog.component.html',
})
export class UserHasMatchDeleteDialogComponent {
  userHasMatch?: IUserHasMatch;

  constructor(protected userHasMatchService: UserHasMatchService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.userHasMatchService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
