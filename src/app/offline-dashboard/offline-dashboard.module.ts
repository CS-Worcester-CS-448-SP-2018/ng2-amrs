import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule , Router } from '@angular/router';
import { SessionStorageService } from '../utils/session-storage.service';
import { HttpClient } from '../shared/services/http-client.service';
import { OfflineDashboardComponent } from './offline-dashboard-component';
import { offlineDashboardRouting } from './offline-dashboard-routes';
import { OfflinePatientInfoService } from './offline-patient-info/offline-patient-info.service';
import { OfflinePatientInfoComponent } from './offline-patient-info/offline-patient-info.component';
import { OfflineDataCaptureService } from './offline-data-capture/offline-data-capture.service';
import { OfflineDataCaptureComponent } from './offline-data-capture/offline-data-capture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    offlineDashboardRouting
  ],
  declarations: [
    OfflineDashboardComponent,
    OfflineDataCaptureComponent,
    OfflinePatientInfoComponent
  ],
  providers: [
    {
      provide: Http,
      useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions,
                   router: Router, sessionStorageService: SessionStorageService) =>
        new HttpClient(xhrBackend, requestOptions, router, sessionStorageService),
      deps: [XHRBackend, RequestOptions, Router, SessionStorageService]
    },
    OfflineDataCaptureService,
    OfflinePatientInfoService
  ],
  exports: [ OfflineDashboardComponent]
})

export class OfflineDashboardModule {}
