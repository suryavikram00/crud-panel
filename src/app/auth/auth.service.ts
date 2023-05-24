import { Injectable } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageUtils: LocalStorageService) { }

  isAuthenticated() {

    const jwt = this.localStorageUtils.getJwtToken();
    if (jwt){
      return true;
    }
    return false;
  }

}