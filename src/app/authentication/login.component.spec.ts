import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, Response, Headers, BaseRequestOptions,
  ResponseOptions
} from '@angular/http';
import { AuthenticationService } from '../openmrs-api/authentication.service';
import { AppSettingsService } from '../app-settings';
import { SessionService } from '../openmrs-api/session.service';
import { LocalStorageService } from '../utils/local-storage.service';
import { SessionStorageService } from '../utils/session-storage.service';
import { OnlineTrackerService } from '../online-tracker/online-tracker.service';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { MdSnackBarModule } from '@angular/material';
import { UserDefaultPropertiesService } from
  '../user-default-properties/user-default-properties.service';
import { UserService } from '../openmrs-api/user.service';
import { CookieService } from 'ngx-cookie';
import { FormListService } from '../patient-dashboard/common/forms/form-list.service';
import { FormUpdaterService } from '../patient-dashboard/common/formentry/form-updater.service';
import { FormOrderMetaDataService }
from '../patient-dashboard/common/forms/form-order-metadata.service';
import { FormSchemaService } from '../patient-dashboard/common/formentry/form-schema.service';
import { FormSchemaCompiler } from 'ng2-openmrs-formentry';
import { FormsResourceService } from '../openmrs-api/forms-resource.service';
import { MdSnackBar } from '@angular/material';
describe('LoginComponent Unit Tests', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backendInstance: MockBackend,
                     defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      LoginComponent,
      AuthenticationService,
      AppSettingsService,
      SessionService,
      LocalStorageService,
      SessionStorageService,
      CookieService,
      provideRoutes([]),
      UserDefaultPropertiesService,
      UserService,
      FormListService,
      FormsResourceService,
      FormSchemaCompiler,
      FormSchemaService,
      FormUpdaterService,
      FormOrderMetaDataService,
      MdSnackBar,
      OnlineTrackerService
    ],
    imports: [
      RouterTestingModule,
      MdSnackBarModule,
      CookieModule.forRoot()
    ]
  }));

  it('should have required variables', inject([LoginComponent],
    (loginComponent: LoginComponent) => {
      expect(loginComponent.loginSuccess).toBeTruthy();
      expect(loginComponent.loginFailure).toBeTruthy();
      expect(loginComponent.error).toBe(undefined);
    }));
});
