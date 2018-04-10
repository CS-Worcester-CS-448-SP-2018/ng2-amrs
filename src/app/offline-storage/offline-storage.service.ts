import { Injectable } from '@angular/core';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflineStorageService {
  public db = new PouchDB('http://localhost:5984/db');

  constructor(private _patientResourceService: PatientResourceService) {
  }

  public storeData() {
    /*this._patientResourceService.getPatientByUuid('5d386b7a-1359-11df-a1f1-0026b9348838')
      .subscribe((patient) => {
        console.log('Patient', patient);
        let data = {
          '_id': 'patient data',
          'output': patient
        };
        console.log('Data', data);
        this.db.put(data);
      }, (error) => {
        console.error('ERROR: storeData() failed');
      }); */
    this._patientResourceService.searchPatient('test')
      .subscribe((patients) => {
        console.log('Patient', patients)
        let data = {
          '_id': 'patients',
          'output': patients
        };
        console.log('Data', data);
        this.db.put(data);
      }, (error) => {
        console.error('ERROR: storeData() failed');
      });
  }
}
