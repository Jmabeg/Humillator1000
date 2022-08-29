import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserHasMatchComponent } from './list/user-has-match.component';
import { UserHasMatchDetailComponent } from './detail/user-has-match-detail.component';
import { UserHasMatchUpdateComponent } from './update/user-has-match-update.component';
import { UserHasMatchDeleteDialogComponent } from './delete/user-has-match-delete-dialog.component';
import { UserHasMatchRoutingModule } from './route/user-has-match-routing.module';

@NgModule({
  imports: [SharedModule, UserHasMatchRoutingModule],
  declarations: [UserHasMatchComponent, UserHasMatchDetailComponent, UserHasMatchUpdateComponent, UserHasMatchDeleteDialogComponent],
})
export class UserHasMatchModule {}
