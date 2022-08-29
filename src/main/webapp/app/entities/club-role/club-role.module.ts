import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClubRoleComponent } from './list/club-role.component';
import { ClubRoleDetailComponent } from './detail/club-role-detail.component';
import { ClubRoleUpdateComponent } from './update/club-role-update.component';
import { ClubRoleDeleteDialogComponent } from './delete/club-role-delete-dialog.component';
import { ClubRoleRoutingModule } from './route/club-role-routing.module';

@NgModule({
  imports: [SharedModule, ClubRoleRoutingModule],
  declarations: [ClubRoleComponent, ClubRoleDetailComponent, ClubRoleUpdateComponent, ClubRoleDeleteDialogComponent],
})
export class ClubRoleModule {}
