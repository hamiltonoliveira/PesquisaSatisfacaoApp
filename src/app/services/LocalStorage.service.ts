import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static getJWT() {
    throw new Error('Method not implemented.');
  }

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setJWT(jwtToken: string): void
  {
      this.storage.setItem('jwtToken', jwtToken);
  }

  getJWT(): string | null {
    if (this.storage) {
      return this.storage.getItem('jwtToken');
    }
    return null;
  }

  removeJWT(): void {
    if (this.storage) {
      this.storage.removeItem('jwtToken');
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }

}
