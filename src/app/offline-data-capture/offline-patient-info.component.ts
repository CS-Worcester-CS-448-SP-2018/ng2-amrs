import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfflinePatientInfoService } from './offline-patient-info.service';

@Component({
  selector: 'offline-patient-info',
  templateUrl: './offline-patient-info.component.html',
  styleUrls: ['./offline-patient-info.component.css']
})
export class OfflinePatientInfoComponent implements OnInit, OnDestroy {

  public patient: any;
  public vitals: any;

  public patientLoaded: boolean = false;
  public vitalsLoaded: boolean = false;

  constructor(private _offlinePatientInfoService: OfflinePatientInfoService) {
  }
  public getPatient() {
    return this._offlinePatientInfoService.getInfo(
      'patient-064e419c-ff4e-4a6f-b83f-e1df48e80723').then((result) => {
      this.patientLoaded = true;
      this.patient = result.patient;
      console.log('component result:', result);
      console.log('component patient:', this.patient);
      this.getVitals();
    }).catch((notExisting) => {
      console.log('getPatient(): UUID not found in PouchDB database.');
    });
  }

  public getVitals() {
    return this._offlinePatientInfoService.getInfo(
      'vitals-064e419c-ff4e-4a6f-b83f-e1df48e80723').then((result) => {
      this.vitalsLoaded = true;
      this.vitals = result.vitals;
      console.log('component result:', result);
      console.log('component vitals:', this.vitals);
    }).catch((notExisting) => {
      console.log('getVitals(): UUID not found in PouchDB database.');
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {

  }

}
