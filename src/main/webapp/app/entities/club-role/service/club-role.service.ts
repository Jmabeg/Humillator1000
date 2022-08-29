import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClubRole, NewClubRole } from '../club-role.model';

export type PartialUpdateClubRole = Partial<IClubRole> & Pick<IClubRole, 'id'>;

export type EntityResponseType = HttpResponse<IClubRole>;
export type EntityArrayResponseType = HttpResponse<IClubRole[]>;

@Injectable({ providedIn: 'root' })
export class ClubRoleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/club-roles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(clubRole: NewClubRole): Observable<EntityResponseType> {
    return this.http.post<IClubRole>(this.resourceUrl, clubRole, { observe: 'response' });
  }

  update(clubRole: IClubRole): Observable<EntityResponseType> {
    return this.http.put<IClubRole>(`${this.resourceUrl}/${this.getClubRoleIdentifier(clubRole)}`, clubRole, { observe: 'response' });
  }

  partialUpdate(clubRole: PartialUpdateClubRole): Observable<EntityResponseType> {
    return this.http.patch<IClubRole>(`${this.resourceUrl}/${this.getClubRoleIdentifier(clubRole)}`, clubRole, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClubRole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClubRole[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getClubRoleIdentifier(clubRole: Pick<IClubRole, 'id'>): number {
    return clubRole.id;
  }

  compareClubRole(o1: Pick<IClubRole, 'id'> | null, o2: Pick<IClubRole, 'id'> | null): boolean {
    return o1 && o2 ? this.getClubRoleIdentifier(o1) === this.getClubRoleIdentifier(o2) : o1 === o2;
  }

  addClubRoleToCollectionIfMissing<Type extends Pick<IClubRole, 'id'>>(
    clubRoleCollection: Type[],
    ...clubRolesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const clubRoles: Type[] = clubRolesToCheck.filter(isPresent);
    if (clubRoles.length > 0) {
      const clubRoleCollectionIdentifiers = clubRoleCollection.map(clubRoleItem => this.getClubRoleIdentifier(clubRoleItem)!);
      const clubRolesToAdd = clubRoles.filter(clubRoleItem => {
        const clubRoleIdentifier = this.getClubRoleIdentifier(clubRoleItem);
        if (clubRoleCollectionIdentifiers.includes(clubRoleIdentifier)) {
          return false;
        }
        clubRoleCollectionIdentifiers.push(clubRoleIdentifier);
        return true;
      });
      return [...clubRolesToAdd, ...clubRoleCollection];
    }
    return clubRoleCollection;
  }
}
