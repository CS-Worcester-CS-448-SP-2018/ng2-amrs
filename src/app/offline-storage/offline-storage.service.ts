import { Injectable, InjectionToken } from '@angular/core';
import PouchDB from 'pouchdb';

interface PouchDBPutResult {
  ok: boolean;
  id: string;
  rev: string;
}

@Injectable()
export class OfflineStorageService {
  public dbname: string;
  private db: PouchDB = null;

  constructor() {
  }

  public createDB(name: string): void {
    this.db = new PouchDB(name);
    console.log(this.db.adapter);
  }

  public addDoc(jsonObject: any): Promise<any> {
    console.log('checking if object already exists');
    return this.db.get(jsonObject._id).then((existing) => {
      return this.db.put({
        _id: existing.id,
        _rev: existing.rev,
        data: jsonObject
      });
    }).catch((doesntExist) => {
      console.log('Storing captured data for the first time:', jsonObject._id);
      return this.db.put(jsonObject);
    });
  }

  public getDoc(id: string): JSON {
    let x1: JSON;
    this.db.get(id).then((doc) => {
      x1 = doc;
    }).catch((err) => {
      console.log(err);
    });
    return x1;
  }

  public deleteDoc(id: string): JSON {
    let element: JSON;
    this.db.remove(id).then((doc) => {
      element = doc;
      console.log(doc);
    });
    return element;
  }

  public clear(): boolean {
    let success: boolean = false;
    return this.db.destroy().then((response) => {
     console.log(response);
     success = true;
     return success;
    }).catch((err) => {
      console.log(err);
    });
  }

}
