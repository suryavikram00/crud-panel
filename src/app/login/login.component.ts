import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'src/app/service/toastr.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private localStorageUtils: LocalStorageService, private router: Router, private toast: ToastrService) { }

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  });

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe((data: any) => {

        if (data == undefined) {
          this.toast.open('error', "Error", "Invalid username/password");
          return;
        }
        if (data.jwttoken == undefined) {
          this.toast.open('error', "Error", data.error);
        }
        this.localStorageUtils.setJwtToken((data.jwttoken));
        this.router.navigate(['']);
      });
  }

  signOut() {
    this.localStorageUtils.clearJwtToken();
  }

}
