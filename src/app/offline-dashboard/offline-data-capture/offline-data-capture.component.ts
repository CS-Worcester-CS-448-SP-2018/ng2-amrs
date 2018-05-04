import { Component, OnDestroy, OnInit } from '@angular/core';
import { OfflineDataCaptureService } from './offline-data-capture.service';
import { PatientResourceService } from '../../openmrs-api/patient-resource.service';
import { VitalsResourceService } from '../../etl-api/vitals-resource.service';
import { VisitResourceService } from '../../openmrs-api/visit-resource.service';
import { EncounterResourceService } from '../../openmrs-api/encounter-resource.service';
import { LabsResourceService } from '../../etl-api/labs-resource.service';
import { HivPatientClinicalSummaryResourceService } from
    '../../etl-api/hiv-patient-clinical-summary-resource.service';
import { HivSummaryIndicatorsResourceService } from
    '../../etl-api/hiv-summary-indicators-resource.service';
import { OfflinePatientInfoService } from '../offline-patient-info/offline-patient-info.service';
import { AppFeatureAnalytics } from '../../../shared/app-analytics/app-feature-analytics.service';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offline-data-capture',
  templateUrl: './offline-data-capture.component.html',
  styleUrls: ['./offline-data-capture.component.css']
})
export class OfflineDataCaptureComponent implements OnInit, OnDestroy {
  public patients: any = [];
  public types: Array<string> = ['patient-', 'vitals-'];
  // public vitals: any;
  public patient1: any;
  public patientLoaded: boolean = false;

  constructor(
    private _offlineDataCaptureService: OfflineDataCaptureService,
    private _patientResourceService: PatientResourceService,
    private _vitalsResourceService: VitalsResourceService,
    private _encounterResourceService: EncounterResourceService,
    private _hivSummaryIndicatorsResourceService: HivSummaryIndicatorsResourceService,
    private _labsResourceService: LabsResourceService,
    private _offlinePatientInfoService: OfflinePatientInfoService) {}

  public capturePatients(storeOrRemove) {
    console.log('capturePatients.storeOrRemove:', storeOrRemove);
    this._patientResourceService.searchPatient('test')
      .subscribe((patients) => {
        this.processPatients(patients, storeOrRemove);
      }, (error) => {
        console.error('ERROR: capturePatients() failed');
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
        this.saveRecord(patientRecord);

        this.captureVitals(patient.person.uuid);
        this.captureVisits(patient.person.uuid);

        // labs and HivSummary are not capturing any data. ETL server issue?
        // this.captureLabs(patient.person.uuid);
        // this.captureHivSummary(patient.person.uuid);

      } else {
        this.removeIfExistingRecord(patientRecord);

        let vitals = { '_id': 'vitals-' + patient.person.uuid };
        this.removeIfExistingRecord(vitals);

        let visits = { '_id': 'visits-' + patient.person.uuid };
        this.removeIfExistingRecord(visits);

        let labs = { '_id': 'labs-' + patient.person.uuid };
        this.removeIfExistingRecord(labs);

        let hivSummary = { '_id': 'hivSummary-' + patient.person.uuid };
        this.removeIfExistingRecord(hivSummary);
      }
    }
  }

  public captureVitals(patientUuid): any {
    console.log('captureVitals:', patientUuid);
    this._vitalsResourceService.getVitals(patientUuid, 0, 10)
      .subscribe((vitals) => {
          if (vitals.length > 1) {
            console.log('vitals, patientUuid:', vitals, patientUuid);
            let patientRecord = {
              '_id': 'vitals-' + patientUuid,
              'vitals': vitals
            };
            this.saveRecord(patientRecord);
          }
        },
        (error) => {
          console.error('ERROR: captureVitals() failed');
        });
  }

  public captureVisits(patientUuid): any {
    console.log('captureVisits:', patientUuid);
    this._encounterResourceService.getEncountersByPatientUuid(patientUuid)
      .subscribe((visits) => {
          if (visits.length > 10) {
            visits = visits.slice(0, 10);
          }

          if (visits.length > 1) {
            console.log('visits, patientUuid:', visits, patientUuid);
            let visitsRecord = {
              '_id': 'visits-' + patientUuid,
              'visits': visits
            };
            this.saveRecord(visitsRecord);
          }
        },
        (error) => {
          console.error('ERROR: captureVisits() failed');
        });
  }

  public captureHivSummary(patientUuid): any {
    this._hivSummaryIndicatorsResourceService.getHivSummaryIndicatorsReport(patientUuid)
      .subscribe((hivSummary) => {
          if (hivSummary.length > 1) {
            console.log('captureHivSummary, patientUuid:', hivSummary, patientUuid);
            let patientRecord = {
              '_id': 'hivSummary-' + patientUuid,
              'hivSummary': hivSummary
            };
            this.saveRecord(patientRecord);
          }
        },
        (error) => {
          console.error('ERROR: captureHivSummary() failed');
        });
  }

  public captureLabs(patientUuid): any {
    console.log('captureLabs:', patientUuid);

    let labsArray: any = [];
    let date = new Date();
    let currentYear = date.getFullYear();
    let previousYear = currentYear - 1;

    let params = {
      startDate: previousYear.toString(),
      endDate: currentYear.toString(),
      patientUuId: patientUuid
    };

    this._labsResourceService.getNewPatientLabResults(params)
      .subscribe((labs) => {
          if (labs.length > 1) {
            console.log('labs, patientUuid:', labs, patientUuid);
            let labsRecord = {
              '_id': 'labs-' + patientUuid,
              'labs': labs
            };
            this.saveRecord(labsRecord);
          }
        },
        (error) => {
          console.error('ERROR: captureLabs() failed');
        });
  }

  public saveRecord(record: any) {
    console.log('Saving record ...', record);
    this._offlineDataCaptureService.storeCapturedData(record)
      .then((result) => {
        console.log('Record Saved Successfully', record);
      })
      .catch((error) => {
        console.error('ERROR: Error saving Patient', record);
      });
  }

  public removeIfExistingRecord(record) {
    console.log('PouchDB - Removing old record if ID exists in offline database:',
      record);
    this._offlineDataCaptureService.removeExistingOfflineData(record);
  }

  public ngOnInit() {}

  public ngOnDestroy(): void {}

}
