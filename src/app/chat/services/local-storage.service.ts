import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  ignoreClear: string[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (document.defaultView)
      this.localStorage = document.defaultView.localStorage as Storage;
  }

  getItem(key: string) {
    const item = this.localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  setItem(key: string, data: unknown) {
    if (this.localStorage) this.localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key:string){
    if(this.localStorage) this.localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    const keys = Object.keys(localStorage);
    keys?.forEach((k) => {
      if (!this.ignoreClear.includes(k)) localStorage.removeItem(k);
    });
  }
}
