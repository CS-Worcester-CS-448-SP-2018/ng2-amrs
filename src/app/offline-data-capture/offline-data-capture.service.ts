import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';

@Injectable()
export class OfflineDataCaptureService {
  public db = new PouchDB('http://localhost:5984/db');

  constructor() {}

  public storePatient(data): Promise<string> {
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
