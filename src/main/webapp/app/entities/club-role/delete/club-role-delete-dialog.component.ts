import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClubRole } from '../club-role.model';
import { ClubRoleService } from '../service/club-role.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './club-role-delete-dialog.component.html',
})
export class ClubRoleDeleteDialogComponent {
  clubRole?: IClubRole;

  constructor(protected clubRoleService: ClubRoleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clubRoleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
