import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineDataCaptureComponent } from './offline-data-capture.component';

describe('OfflineDataCaptureComponent', () => {
  let component: OfflineDataCaptureComponent;
  let fixture: ComponentFixture<OfflineDataCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineDataCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineDataCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
