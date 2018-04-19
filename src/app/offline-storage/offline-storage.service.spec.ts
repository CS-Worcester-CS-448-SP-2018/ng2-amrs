import { TestBed, inject } from '@angular/core/testing';
import PouchDB from 'pouchdb';
import { PATIENTS } from '../patient-dashboard/services/patient.mock';
import { OfflineStorageService } from './offline-storage.service';

describe('OfflineStorageService', () => {
  let service = new OfflineStorageService();
  let patient1 = PATIENTS[0];
  let patient2 = PATIENTS[1];
  let patient3 = PATIENTS[2];
  beforeEach(() => {
    /*if (service.db != null) {
      service.clear();
    }*/
    TestBed.configureTestingModule({
      providers: [OfflineStorageService]
    });
  });

  it('Should instantiate a PouchDB database',
    inject([OfflineStorageService], () => {
      service.createDB('test');
      expect(service).not.toBeNull();
    })
  );

  it('Should return a pouch instance',
    inject([OfflineStorageService], () => {
      service.createDB('test1');
      expect(service.db instanceof PouchDB).toBeTruthy();
    })
  );

  it('Should be able to add a patient to the PouchDB database',
    inject([OfflineStorageService], () => {
      service.createDB('test3');
      expect(service.addDoc(patient2)).toBeTruthy();
    })
  );

  it('Should be able to add multiple patients',
    inject([OfflineStorageService], () => {
    service.createDB('test4');
    expect(service.addDoc(patient1)).toBeTruthy();
    expect(service.addDoc(patient2)).toBeTruthy();
    expect(service.addDoc(patient3)).toBeTruthy();
    })
  );

  it('Should discard all patient data with clear()',
    inject([OfflineStorageService], () => {
      service.createDB('test5');
      service.addDoc(patient1);
      service.addDoc(patient2);
      service.addDoc(patient3);
      expect(service.clear()).toBeTruthy();
    })
  );

});
