import { Injectable } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';
import { CryptoJS } from 'crypto-js';

@Injectable()
export class PrivateKeygen {

  private localStorageService = new LocalStorageService();
  private STORAGE_KEY = 'privateEncryptionKey';

  public createAndStashPKey(password: string, salt: string) {
    let key = this.createPKey(password, salt);
    this.stashPKey(key);
  }

  public retrievePKey(): string {
    return this.localStorageService.getItem(this.STORAGE_KEY);
  }

  // todo: Update when we have a working crypto library
  private createPKey(password: string, salt: string): string {
    return '###' + password + '###' + salt + '###';
  }

  private stashPKey(key: string) {
    this.localStorageService.setItem(this.STORAGE_KEY, key);
  }
}
