import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';

@Injectable()
export class OfflineDataCaptureService {
  public db = new PouchDB('http://localhost:5984/db');

  constructor() {
    this.db.destroy().then((response) => {
      this.db = new PouchDB('http://localhost:5984/db');
    }).catch((err) => {
      console.log(err);
    });
  }

  public isExisting(uuid): boolean {
    this.db.get(uuid).catch((err) => {
      if (err.name === 'not_found') {
        return false;
      }
    });
    return true;
  }

  public removeExistingDataByUuid(data) {
    this.db.get(data).then((exists) => {
      this.db.remove(data);
    }).then((result) => {
      console.log('Success');
    }).catch((err) => {
      console.log('UUID does not yet exist in offline database:', data);
    });
  }

  public storeCapturedData(data): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.db.put(data);
        resolve('Success');
      } catch (error) {
        reject(error);
      }
    });
  }

}
