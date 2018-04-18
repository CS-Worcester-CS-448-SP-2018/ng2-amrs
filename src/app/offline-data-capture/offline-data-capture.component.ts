import { Component, OnInit } from '@angular/core';
import { OfflineDataCaptureService } from './offline-data-capture.service';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-offline-data-capture',
  templateUrl: './offline-data-capture.component.html',
  styleUrls: ['./offline-data-capture.component.css']
})
export class OfflineDataCaptureComponent implements OnInit {

  public patients: any = [];

  constructor(
    private _offlineDataCaptureService: OfflineDataCaptureService,
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

    this._offlineDataCaptureService.storePatient(patientObj)
      .then((result) => {
        console.log('Patient Saved Successfully', patientObj);
      })
      .catch((error) => {
        console.error('ERROR: Error saving Patient', patientObj);
      });
  }

  /*public temp() {
    this._patientResourceService.getPatientByUuid('5d386b7a-1359-11df-a1f1-0026b9348838')
      .subscribe((patient) => {
        console.log('Patient', patient);
        let data = {
          '_id': 'patient data',
          'output': patient
        };
        console.log('Data', data);
        this._offlineDataCaptureService.db.put(data);
      }, (error) => {
        console.error('ERROR: storeData() failed');
      });
  }*/
  public ngOnInit() {
    this.fetchPatients();
    // this.temp();
  }

}
