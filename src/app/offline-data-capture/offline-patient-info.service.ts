import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflinePatientInfoService {

  public db: any = new PouchDB('http://localhost:5984/db');

  constructor(protected http: Http) {
  }

  public getPatient(record): Promise<any> {
    let patient: any = [];
    let promise = new Promise((resolve, reject) => {
      this.db.get(record).then((result: any) => {
        patient = result.patient;
        console.log('getPatient', patient);
        resolve(patient);
      }).catch((notExisting) => {
        console.log('Patient not found in PouchDB:', record);
      });

    });

    return promise;
  }
}
