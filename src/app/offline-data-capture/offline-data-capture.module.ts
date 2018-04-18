import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsModule } from '../app-settings';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';
import { OfflineDataCaptureService } from './offline-data-capture.service';
import { OfflineDataCaptureComponent } from './offline-data-capture.component';

@NgModule({
  imports: [CommonModule, AppSettingsModule],
  declarations: [OfflineDataCaptureComponent],
  providers: [
    PatientResourceService,
    OfflineDataCaptureService
  ],
  exports: []
})

export class OfflineDataCapture {
}
