import PouchDB from 'pouchdb';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class OfflineDataCaptureService implements OnInit {
  public db: any = new PouchDB('http://localhost:5984/db');

  constructor() {}

  public isExisting(data): boolean {
    return this.db.get(data).then((existing) => {
      return true;
    }).catch((notExisting) => {
      return false;
    });
  }

  public removeExistingOfflineData(data) {
    return this.db.get(data._id).then((existing) => {
      return this.db.remove(existing).then((success) => {
        console.log('Data deleted from PouchDB - ID:', data._id);
      });
    }).catch((error) => {
      console.log('Existing stored data not found for ID:', data._id);
    });
  }

  public storeCapturedData(data): Promise<string> {
    return this.db.get(data._id).then((existing) => {
      console.log('we hit the db.get(data).existing block');
      console.log('existing._id:', existing._id);
      console.log('existing._.rev:', existing._rev);
      console.log('data _.rev:', data.rev);
      return this.db.put({
        _id: existing._id,
        _rev: existing._rev,
        // capturedData: 'IS THIS DOING ANYTHING AT ALL?!'
        capturedData: data.capturedData
      });
    }).catch((notExisting) => {
      console.log('Storing captured data for the first time:', data._id);
      return this.db.put(data);
    });
  }

  /*public storeCapturedData(data): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.db.put(data);
        resolve('Success');
      } catch (error) {
        reject(error);
      }
    });
  }*/

  public ngOnInit() {}

}
