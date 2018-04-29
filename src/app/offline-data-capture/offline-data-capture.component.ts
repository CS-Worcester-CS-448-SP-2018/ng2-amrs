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
  public types: Array<string> = ['patient-', 'vitals-'];
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
      let patientRecord = {
        '_id': 'patient-' + patient.person.uuid,
        'patient': patient
      };

      if (storeOrRemove === 'store') {
        this.captureVitals(patient.person.uuid);

        this.savePatient(patientRecord);

      } else {
        let vitalsRecord = {
          '_id': 'vitals-' + patient.person.uuid,
        }
        this.removeIfExistingRecord(patientRecord);
        this.removeIfExistingRecord(vitalsRecord);
      }
    }
  }

  public captureVitals(patientUuid): any {
    console.log('captureVitals:', patientUuid);
    this._vitalsResourceService.getVitals(patientUuid, 1, 10)
      .subscribe((vitals) => {
          console.log('vitals, patientUuid:', vitals, patientUuid);

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

  public removeIfExistingRecord(record) {
      console.log('PouchDB - Removing old record if ID exists in offline database:',
        record);
      this._offlineDataCaptureService.removeExistingOfflineData(record);
  }

}
