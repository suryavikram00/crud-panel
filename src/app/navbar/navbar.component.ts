import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'nms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loading: boolean;

  constructor(private localStorageService: LocalStorageService, public router: Router, private loadingService: LoadingService) { 
    this.loadingService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
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
