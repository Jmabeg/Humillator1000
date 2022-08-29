import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserHasClubComponent } from './list/user-has-club.component';
import { UserHasClubDetailComponent } from './detail/user-has-club-detail.component';
import { UserHasClubUpdateComponent } from './update/user-has-club-update.component';
import { UserHasClubDeleteDialogComponent } from './delete/user-has-club-delete-dialog.component';
import { UserHasClubRoutingModule } from './route/user-has-club-routing.module';

@NgModule({
  imports: [SharedModule, UserHasClubRoutingModule],
  declarations: [UserHasClubComponent, UserHasClubDetailComponent, UserHasClubUpdateComponent, UserHasClubDeleteDialogComponent],
})
export class UserHasClubModule {}
