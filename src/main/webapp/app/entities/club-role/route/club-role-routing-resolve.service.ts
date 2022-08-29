import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClubRole } from '../club-role.model';
import { ClubRoleService } from '../service/club-role.service';

@Injectable({ providedIn: 'root' })
export class ClubRoleRoutingResolveService implements Resolve<IClubRole | null> {
  constructor(protected service: ClubRoleService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClubRole | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((clubRole: HttpResponse<IClubRole>) => {
          if (clubRole.body) {
            return of(clubRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
