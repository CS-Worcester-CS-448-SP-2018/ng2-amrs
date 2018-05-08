import { Injectable } from '@angular/core';
import { CryptoJS } from 'crypto-js';

Injectable();
export class EncryptionService {

  constructor() { }
  public encryptRecord(data: any[], privateKey: string) : string{
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), privateKey);
    return ciphertext;

  }

  public decryptRecord(ciphertext: string, privateKey: string) : string{
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), privateKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

}
