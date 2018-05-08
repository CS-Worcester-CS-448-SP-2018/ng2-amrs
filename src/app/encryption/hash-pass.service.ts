import { Injectable } from '@angular/core';
import { CryptoJS } from 'crypto-js';

@Injectable()
export class HashPassService {

  constructor() { }

  public hashPassword(password: string) {
    let hash = CryptoJS.SHA256(password);
    return '';
  }
}
