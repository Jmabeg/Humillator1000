import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClubRole } from '../club-role.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../club-role.test-samples';

import { ClubRoleService } from './club-role.service';

const requireRestSample: IClubRole = {
  ...sampleWithRequiredData,
};

describe('ClubRole Service', () => {
  let service: ClubRoleService;
  let httpMock: HttpTestingController;
  let expectedResult: IClubRole | IClubRole[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClubRoleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ClubRole', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clubRole = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(clubRole).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClubRole', () => {
      const clubRole = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(clubRole).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClubRole', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClubRole', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClubRole', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addClubRoleToCollectionIfMissing', () => {
      it('should add a ClubRole to an empty array', () => {
        const clubRole: IClubRole = sampleWithRequiredData;
        expectedResult = service.addClubRoleToCollectionIfMissing([], clubRole);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clubRole);
      });

      it('should not add a ClubRole to an array that contains it', () => {
        const clubRole: IClubRole = sampleWithRequiredData;
        const clubRoleCollection: IClubRole[] = [
          {
            ...clubRole,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClubRoleToCollectionIfMissing(clubRoleCollection, clubRole);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClubRole to an array that doesn't contain it", () => {
        const clubRole: IClubRole = sampleWithRequiredData;
        const clubRoleCollection: IClubRole[] = [sampleWithPartialData];
        expectedResult = service.addClubRoleToCollectionIfMissing(clubRoleCollection, clubRole);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clubRole);
      });

      it('should add only unique ClubRole to an array', () => {
        const clubRoleArray: IClubRole[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const clubRoleCollection: IClubRole[] = [sampleWithRequiredData];
        expectedResult = service.addClubRoleToCollectionIfMissing(clubRoleCollection, ...clubRoleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const clubRole: IClubRole = sampleWithRequiredData;
        const clubRole2: IClubRole = sampleWithPartialData;
        expectedResult = service.addClubRoleToCollectionIfMissing([], clubRole, clubRole2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clubRole);
        expect(expectedResult).toContain(clubRole2);
      });

      it('should accept null and undefined values', () => {
        const clubRole: IClubRole = sampleWithRequiredData;
        expectedResult = service.addClubRoleToCollectionIfMissing([], null, clubRole, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clubRole);
      });

      it('should return initial array if no ClubRole is added', () => {
        const clubRoleCollection: IClubRole[] = [sampleWithRequiredData];
        expectedResult = service.addClubRoleToCollectionIfMissing(clubRoleCollection, undefined, null);
        expect(expectedResult).toEqual(clubRoleCollection);
      });
    });

    describe('compareClubRole', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClubRole(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareClubRole(entity1, entity2);
        const compareResult2 = service.compareClubRole(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareClubRole(entity1, entity2);
        const compareResult2 = service.compareClubRole(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareClubRole(entity1, entity2);
        const compareResult2 = service.compareClubRole(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
