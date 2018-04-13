import { Component, OnInit } from '@angular/core';
import { OfflineStorageService } from './offline-storage.service';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-offline-storage',
  templateUrl: './offline-storage.component.html',
  styleUrls: ['./offline-storage.component.css']
})
export class OfflineStorageComponent implements OnInit {

  public patients: any = [];

  constructor(
    private _offlineStorageService: OfflineStorageService,
    private _patientResourceService: PatientResourceService) {

  }

  public fetchPatients() {
    this._patientResourceService.searchPatient('test')
      .subscribe((patients) => {
        this.processPatients(patients);
      }, (error) => {
        console.error('ERROR: storeData() failed');
      });
  }

  public processPatients(patients) {
    // iterate through the patient list array and save each
    let count: number = 0;
    _.each(patients, (patient) => {
      count++;
      let patientRecord = {
        '_id': count.toString(),
        'patient': patient
      };
      this.savePatient(patientRecord);
    });

  }

  public savePatient(patientObj: any) {
    console.log('Saving patient ...', patientObj);

    this._offlineStorageService.storePatient(patientObj)
      .then((result) => {
        console.log('Patient Saved Successfully', patientObj);
      })
      .catch((error) => {
        console.error('ERROR: Error saving Patient', patientObj);
      });
  }
  public ngOnInit() {
    this.fetchPatients();
  }

}
