import { Component, OnInit } from '@angular/core';

import { LoginEmitService } from '../login-emit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn = false;

  constructor(private loginEmitService: LoginEmitService,
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

}
