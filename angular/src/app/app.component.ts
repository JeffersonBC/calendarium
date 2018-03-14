import { environment } from '../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginEmitService } from './login-emit.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public loggedIn = false;

  constructor(
    private router: Router,
    private loginEmitService: LoginEmitService,
  ) {
    loginEmitService.changeEmitted$.subscribe(
      bool => {
        this.loggedIn = bool;
      }
    );
  }

  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.loggedIn = true;
    }
  }

  public logoff() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.loginEmitService.emitChange(false);

    this.router.navigate(['']);
  }

}
