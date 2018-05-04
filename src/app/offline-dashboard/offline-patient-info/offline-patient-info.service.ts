import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflinePatientInfoService {

  public db: any = new PouchDB('http://localhost:5984/db');

  constructor() {
  }

  public getInfo(uuid) {
    return this.db.get(uuid).then((result: any) => {
      console.log('service- inside the promise, result', result);
      return result;
    }).catch((notExisting) => {
      console.log('patient UUID does not exist:', uuid);
    });
  }
}
