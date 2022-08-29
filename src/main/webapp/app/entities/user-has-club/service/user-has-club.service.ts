import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserHasClub, NewUserHasClub } from '../user-has-club.model';

export type PartialUpdateUserHasClub = Partial<IUserHasClub> & Pick<IUserHasClub, 'id'>;

export type EntityResponseType = HttpResponse<IUserHasClub>;
export type EntityArrayResponseType = HttpResponse<IUserHasClub[]>;

@Injectable({ providedIn: 'root' })
export class UserHasClubService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/user-has-clubs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userHasClub: NewUserHasClub): Observable<EntityResponseType> {
    return this.http.post<IUserHasClub>(this.resourceUrl, userHasClub, { observe: 'response' });
  }

  update(userHasClub: IUserHasClub): Observable<EntityResponseType> {
    return this.http.put<IUserHasClub>(`${this.resourceUrl}/${this.getUserHasClubIdentifier(userHasClub)}`, userHasClub, {
      observe: 'response',
    });
  }

  partialUpdate(userHasClub: PartialUpdateUserHasClub): Observable<EntityResponseType> {
    return this.http.patch<IUserHasClub>(`${this.resourceUrl}/${this.getUserHasClubIdentifier(userHasClub)}`, userHasClub, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserHasClub>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserHasClub[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserHasClubIdentifier(userHasClub: Pick<IUserHasClub, 'id'>): number {
    return userHasClub.id;
  }

  compareUserHasClub(o1: Pick<IUserHasClub, 'id'> | null, o2: Pick<IUserHasClub, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserHasClubIdentifier(o1) === this.getUserHasClubIdentifier(o2) : o1 === o2;
  }

  addUserHasClubToCollectionIfMissing<Type extends Pick<IUserHasClub, 'id'>>(
    userHasClubCollection: Type[],
    ...userHasClubsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userHasClubs: Type[] = userHasClubsToCheck.filter(isPresent);
    if (userHasClubs.length > 0) {
      const userHasClubCollectionIdentifiers = userHasClubCollection.map(
        userHasClubItem => this.getUserHasClubIdentifier(userHasClubItem)!
      );
      const userHasClubsToAdd = userHasClubs.filter(userHasClubItem => {
        const userHasClubIdentifier = this.getUserHasClubIdentifier(userHasClubItem);
        if (userHasClubCollectionIdentifiers.includes(userHasClubIdentifier)) {
          return false;
        }
        userHasClubCollectionIdentifiers.push(userHasClubIdentifier);
        return true;
      });
      return [...userHasClubsToAdd, ...userHasClubCollection];
    }
    return userHasClubCollection;
  }
}
