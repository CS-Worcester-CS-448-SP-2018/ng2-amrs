import { TestBed, inject, async } from '@angular/core/testing';

import { HashPassService } from './hash-pass.service';

describe('HashPassService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashPassService]
    });
  });

  it('should be created', inject([HashPassService], (service: HashPassService) => {
    expect(service).toBeTruthy();
  }));

  it('should hash a password', inject( [HashPassService], () => {
    let hashed = service.hashPassword('password123');
    expect(hashed).not.toEqual('password123', 'hashPassword()');
  }));
});
