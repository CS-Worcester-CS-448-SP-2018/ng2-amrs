import { Injectable, InjectionToken } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class OfflineStorageService {
  public db: any = null;

  constructor() {
  }

  public createDB(name: string): void {
    this.db = new PouchDB(name);
    console.log(this.db.adapter);
  }

  public addDoc(jsonObject: any): boolean {
    console.log('Adding JSON Object');
    let success: boolean = false;
    return this.db.put(jsonObject).then((response) => {
      console.log('put executed');
      console.log('response:' + response);
      success = true;
      return success;
    }).catch((err) => {
      console.log(err);
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
