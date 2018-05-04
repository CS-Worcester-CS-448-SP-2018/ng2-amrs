import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineDashboardComponent } from './offline-dashboard-component';
import { OfflinePatientInfoComponent } from './offline-patient-info/offline-patient-info.component';
import { OfflineDataCaptureComponent } from './offline-data-capture/offline-data-capture.component';

export const routes: Routes = [

  { path: '',
    children: [
      {
        path: '', component: OfflineDashboardComponent,
      },
      {
        path: 'offline-data-capture', component: OfflineDataCaptureComponent
      },
      {
        path: 'offline-patient-info', component: OfflinePatientInfoComponent
      }
    ]
  }
];

export const offlineDashboardRouting: ModuleWithProviders = RouterModule.forChild(routes);
