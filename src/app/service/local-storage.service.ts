import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setJwtToken(token: any) {
    localStorage.setItem("token", token);
  }

  clearJwtToken() {
    localStorage.removeItem("token");
  }

  getJwtToken(): any {
    return localStorage.getItem("token");
  }
}
