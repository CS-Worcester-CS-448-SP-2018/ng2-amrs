import { TestBed, inject } from '@angular/core/testing';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptionService]
    });
  });

  it('should be created', inject([EncryptionService], (service: EncryptionService) => {
    expect(service).toBeTruthy();
  }));

  it('should encrypt a record', () => {
    let data = [{id: 1}, {id: 2}];
    let ciphertext = service.encryptRecord(data, 'mysecretkey')
    expect(ciphertext).toEqual(service.encryptRecord(data, 'mysecretkey'), 'encryptRecord()');
  });


});
