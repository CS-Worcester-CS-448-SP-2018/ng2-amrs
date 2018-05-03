import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfflinePatientInfoService } from './offline-patient-info.service';

@Component({
  selector: 'offline-patient-info',
  templateUrl: './offline-patient-info.component.html',
  styleUrls: ['./offline-patient-info.component.css']
})
export class OfflinePatientInfoComponent implements OnInit, OnDestroy {

  public patient: any;
  public patientLoaded: boolean = false;
  constructor(private _offlinePatientInfoService: OfflinePatientInfoService) {
  }
  public getPatient() {
    return this._offlinePatientInfoService.getPatient(
      'patient-064e419c-ff4e-4a6f-b83f-e1df48e80723').then((result) => {
      this.patientLoaded = true;
      this.patient = result.patient;
      console.log('component result:', result);
      console.log('component patient:', this.patient);
      // console.log('component - patient.patient', patient.patient);
    }).catch((notExisting) => {
      console.log('getPatient(): UUID not found in PouchDB database.');
    });
    // console.log('component outside promise - patient:', patient);
    // console.log('component outside promise - patient.patient', patient.patient);
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {

  }

}
