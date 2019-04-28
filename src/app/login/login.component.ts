import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router, location: Location) { }

  ngOnInit() {
  }

  login () {
    const authURL = 'http://localhost:3000/auth/github?callbackUrl=' + location.origin + '/callback'
    window.location.href = authURL ;
  }

}
