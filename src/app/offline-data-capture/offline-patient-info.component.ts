import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppFeatureAnalytics } from '../../../shared/app-analytics/app-feature-analytics.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { Subscription } from 'rxjs';
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

  public ngOnInit() {
    this.patient = this._offlinePatientInfoService.getInfo(
      'patient-064e419c-ff4e-4a6f-b83f-e1df48e80723');
    this.patientLoaded = true;
    console.log('Patient Result', this.patient);
  }

  public ngOnDestroy(): void {
  }

}
