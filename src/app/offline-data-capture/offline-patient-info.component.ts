import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfflinePatientInfoService } from './offline-patient-info.service';

@Component({
  selector: 'offline-patient-info',
  templateUrl: './offline-patient-info.component.html',
  styleUrls: ['./offline-patient-info.component.css']
})
export class OfflinePatientInfoComponent implements OnInit, OnDestroy {

  // public patient: any;
  public patientLoaded: boolean = false;
  constructor(private _offlinePatientInfoService: OfflinePatientInfoService) {
  }

  public getPatient() {
    let patient: any[] = this._offlinePatientInfoService.getPatient(
      'patient-064e419c-ff4e-4a6f-b83f-e1df48e80723');
    this.patientLoaded = true;
    console.log('component - result', patient);
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {

  }

}
