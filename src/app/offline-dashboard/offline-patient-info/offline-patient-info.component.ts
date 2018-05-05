import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfflinePatientInfoService } from './offline-patient-info.service';

@Component({
  selector: 'offline-patient-info',
  templateUrl: './offline-patient-info.component.html',
  styleUrls: ['./offline-patient-info.component.css']
})
export class OfflinePatientInfoComponent implements OnInit, OnDestroy {

  public patient: any = [];
  public vitals: any = [];
  public visits: any = [];

  public patientLoaded: boolean = false;
  public vitalsLoaded: boolean = false;
  public visitsLoaded: boolean = false;
  public query: any;

  constructor(private _offlinePatientInfoService: OfflinePatientInfoService) {
  }

  public onInput(event: any) {
    this.query = event.target.value;
    this.getPatient();
    this.clearOutput();
  }

  public clearOutput() {
    this.patient.length = 0;
    this.vitals.length = 0;
    this.visits.length = 0;
  }

  public getPatient() {
    return this._offlinePatientInfoService.getInfo(
      'patient-' + this.query).then((result) => {
      this.patientLoaded = true;
      this.patient = result.patient;

      console.log('component result:', result);
      console.log('component patient:', this.patient);

      this.getVitals();
      this.getVisits();

    }).catch((notExisting) => {
      console.log('getPatient(): UUID not found in PouchDB database.');
    });
  }

  public getVitals() {
    return this._offlinePatientInfoService.getInfo(
      'vitals-' + this.query).then((result) => {
      this.vitalsLoaded = true;
      this.vitals = result.vitals;
      console.log('component result:', result);
      console.log('component vitals:', this.vitals);
    }).catch((notExisting) => {
      console.log('getVitals(): UUID not found in PouchDB database.');
    });
  }

  public getVisits() {
    return this._offlinePatientInfoService.getInfo(
      'visits-' + this.query).then((result) => {
      this.visitsLoaded = true;
      this.visits = result.visits;
      console.log('component result:', result);
      console.log('component visits:', this.visits);
    }).catch((notExisting) => {
      console.log('getVisits(): UUID not found in PouchDB database.');
    });
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }

}
