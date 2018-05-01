import { FormVisitTypeSearchComponent } from
'./patient-dashboard/common/form-visit-type-search/form-visit-type-search.component';
import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { FeedBackComponent } from './feedback';
import { OfflineDataCaptureComponent } from './offline-data-capture/offline-data-capture.component';
import { OfflinePatientInfoComponent } from './offline-data-capture/offline-patient-info.component';

export const ROUTES: Routes = [
  {
    path: '', loadChildren: './main-dashboard/main-dashboard.module#MainDashboardModule'
  },
  {
    path: 'login', loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {path: 'feed-back', component: FeedBackComponent},
  {path: 'form-visit-search', loadChildren:
   './patient-dashboard/common/form-visit-type-search/form-visit-type-search.module#' +
   'FormVisitTypeSearchModule'},
  {path: 'offline-data-capture', component: OfflineDataCaptureComponent},
  {path: 'offline-patient-info', component: OfflinePatientInfoComponent},
  {path: '**', component: NoContentComponent},
];
