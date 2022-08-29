import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserHasClub } from '../user-has-club.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-has-club.test-samples';

import { UserHasClubService } from './user-has-club.service';

const requireRestSample: IUserHasClub = {
  ...sampleWithRequiredData,
};

describe('UserHasClub Service', () => {
  let service: UserHasClubService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserHasClub | IUserHasClub[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserHasClubService);
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

    it('should create a UserHasClub', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userHasClub = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userHasClub).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserHasClub', () => {
      const userHasClub = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userHasClub).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserHasClub', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserHasClub', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserHasClub', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addUserHasClubToCollectionIfMissing', () => {
      it('should add a UserHasClub to an empty array', () => {
        const userHasClub: IUserHasClub = sampleWithRequiredData;
        expectedResult = service.addUserHasClubToCollectionIfMissing([], userHasClub);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHasClub);
      });

      it('should not add a UserHasClub to an array that contains it', () => {
        const userHasClub: IUserHasClub = sampleWithRequiredData;
        const userHasClubCollection: IUserHasClub[] = [
          {
            ...userHasClub,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserHasClubToCollectionIfMissing(userHasClubCollection, userHasClub);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserHasClub to an array that doesn't contain it", () => {
        const userHasClub: IUserHasClub = sampleWithRequiredData;
        const userHasClubCollection: IUserHasClub[] = [sampleWithPartialData];
        expectedResult = service.addUserHasClubToCollectionIfMissing(userHasClubCollection, userHasClub);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHasClub);
      });

      it('should add only unique UserHasClub to an array', () => {
        const userHasClubArray: IUserHasClub[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userHasClubCollection: IUserHasClub[] = [sampleWithRequiredData];
        expectedResult = service.addUserHasClubToCollectionIfMissing(userHasClubCollection, ...userHasClubArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userHasClub: IUserHasClub = sampleWithRequiredData;
        const userHasClub2: IUserHasClub = sampleWithPartialData;
        expectedResult = service.addUserHasClubToCollectionIfMissing([], userHasClub, userHasClub2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userHasClub);
        expect(expectedResult).toContain(userHasClub2);
      });

      it('should accept null and undefined values', () => {
        const userHasClub: IUserHasClub = sampleWithRequiredData;
        expectedResult = service.addUserHasClubToCollectionIfMissing([], null, userHasClub, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userHasClub);
      });

      it('should return initial array if no UserHasClub is added', () => {
        const userHasClubCollection: IUserHasClub[] = [sampleWithRequiredData];
        expectedResult = service.addUserHasClubToCollectionIfMissing(userHasClubCollection, undefined, null);
        expect(expectedResult).toEqual(userHasClubCollection);
      });
    });

    describe('compareUserHasClub', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserHasClub(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserHasClub(entity1, entity2);
        const compareResult2 = service.compareUserHasClub(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserHasClub(entity1, entity2);
        const compareResult2 = service.compareUserHasClub(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserHasClub(entity1, entity2);
        const compareResult2 = service.compareUserHasClub(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
