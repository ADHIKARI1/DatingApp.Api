/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemberDetail.resolverService } from './member-detail.resolver.service';

describe('Service: MemberDetail.resolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberDetail.resolverService]
    });
  });

  it('should ...', inject([MemberDetail.resolverService], (service: MemberDetail.resolverService) => {
    expect(service).toBeTruthy();
  }));
});
