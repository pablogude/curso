import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  constructor(
    private api: ApiService,
    private storage: LocalStorageService,
    private router: Router,
   ) { }

  ngOnInit(): void { }

  public formError = "";

  public credentials = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  };

  public formSubmit() {
    this.formError = "";

    if(
      !this.credentials.first_name ||
      !this.credentials.last_name ||
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.password_confirm
    ) {
      return this.formError = "All fields are required";
    }

    // var re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    //
    // if(!re.test(this.credentials.email)) {
    //   return this.formError = "Please enter a valid email address.";
    // }

    if(this.credentials.password !== this.credentials.password_confirm) {
      return this.formError = "Passwords don't match";
    }

    this.register();

  }

  private register() {

    let requestObject = {
      type: "POST",
      location: "users/register",
      body: this.credentials
    }

    this.api.makeRequest(requestObject).then((val) => {
      if(val.token) {
         this.storage.setToken(val.token);
         this.router.navigate(['/']);
         return;
      }
      if(val.message) { this.formError = val.message }

    });
  }
}
