import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsModule} from '../app-settings';
import { PatientResourceService } from '../openmrs-api/patient-resource.service';


@NgModule({
  imports: [CommonModule, AppSettingsModule],
  declarations: [],
  providers: [
    PatientResourceService,
  ],
  exports: []
})

export class OfflineStorage {
}
