import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INotification } from '../notification.model';
import { NotificationService } from '../service/notification.service';

@Injectable({ providedIn: 'root' })
export class NotificationRoutingResolveService implements Resolve<INotification | null> {
  constructor(protected service: NotificationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotification | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((notification: HttpResponse<INotification>) => {
          if (notification.body) {
            return of(notification.body);
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
