import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflinePatientInfoService {

  public db: any = new PouchDB('http://localhost:5984/db');

  constructor() {
  }

  public getInfo(uuid) {
    let patient: any;
    this.db.get(uuid).then((result: any) => {
      console.log('result:', result);
      patient = result.patient;
    }).catch((notExisting) => {
      console.log('Info not found for uuid:', uuid);
    });
    return patient;
  }
}
