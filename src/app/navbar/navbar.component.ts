import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'nms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, public router: Router) { 
    
  }


  isUserLoggedIn(){
    return this.localStorageService.getJwtToken()!=undefined;
  }

  ngOnInit(): void {
  }

  logOut(){
    this.localStorageService.clearJwtToken();
    this.router.navigate(['login']);
  }

}
