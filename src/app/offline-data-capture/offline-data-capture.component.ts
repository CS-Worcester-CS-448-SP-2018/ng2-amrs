import { Component } from '@angular/core';
import { OfflineDataCaptureService } from './offline-data-capture.service';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import { VitalsResourceService } from '../etl-api/vitals-resource.service';

@Component({
  selector: 'app-offline-data-capture',
  templateUrl: './offline-data-capture.component.html',
  styleUrls: ['./offline-data-capture.component.css']
})
export class OfflineDataCaptureComponent {
  public patients: any = [];
  // public vitals: any;

  constructor(
    private _offlineDataCaptureService: OfflineDataCaptureService,
    private _patientResourceService: PatientResourceService,
    private _vitalsResourceService: VitalsResourceService ) {}

  public fetchPatients(storeOrRemove) {
    console.log('fetchPatients.storeOrRemove:', storeOrRemove);
    this._patientResourceService.searchPatient('test')
      .subscribe((patients) => {
        this.processPatients(patients, storeOrRemove);
      }, (error) => {
        console.error('ERROR: fetchPatients() failed');
      });
  }

  public processPatients(patients, storeOrRemove) {
    console.log('processPatients.storeOrRemove:', storeOrRemove);
    for (let patient of patients) {
      let patientVitals = this.captureVitals(patient.person.uuid);

      let patientRecord = {
        '_id': patient.person.uuid,
        'patient': patient
      };
      if (storeOrRemove === 'store') {
        this.savePatient(patientRecord);
      } else {
        this.removeIfExistingPatient(patientRecord);
      }
    }
  }

  public captureVitals(patientUuid): any {
    console.log('captureVitals:', patientUuid);
    this._vitalsResourceService.getVitals(patientUuid, 1, 10)
      .subscribe((vitals) => {
          console.log('vitals, patientUuid:', vitals, patientUuid);
          // return JSON.stringify(vitals);

          let vitalsArray: any = [];
          vitalsArray = vitals;

          if (vitalsArray.length > 1) {
            let patientRecord = {
              '_id': 'vitals-' + patientUuid,
              'vitals': vitals,
            };
            this.savePatient(patientRecord);
          }
        },
        (err) => {
          console.error('ERROR: fetchVitals() failed');
        });
  }

  public savePatient(patientRecord: any) {
    console.log('Saving patient ...', patientRecord);
    this._offlineDataCaptureService.storeCapturedData(patientRecord)
      .then((result) => {
        console.log('Patient Saved Successfully', patientRecord);
      })
      .catch((error) => {
        console.error('ERROR: Error saving Patient', patientRecord);
      });
  }

  public removeIfExistingPatient(patientRecord) {
    console.log('PouchDB - Removing old patientRecord if ID exists in offline database:',
      patientRecord);
    this._offlineDataCaptureService.removeExistingOfflineData(patientRecord);
  }

}
