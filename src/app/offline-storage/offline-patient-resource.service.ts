import { Injectable } from '@angular/core';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflinePatientResourceService {
  constructor( private _patientResourceService: PatientResourceService) {}

  public storePatientDataInBrowser(): void {
    let db = new PouchDB('http://localhost:5984/patients');
    let patientdata = this._patientResourceService.getPatientByUuid(
      '5d386b7a-1359-11df-a1f1-0026b9348838');
    db.put(patientdata);
  }
}
