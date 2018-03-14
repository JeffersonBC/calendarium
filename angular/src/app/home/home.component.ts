import { Component, OnInit } from '@angular/core';

import { LoginEmitService } from '../login-emit.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn = false;
  public user_first_name = '';

  constructor(
    private http: HttpClient,
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
      this.getUserName();
    }
  }

  getUserName() {
    this.http.get('http://localhost:8000/api/accounts/get_current_user/')
      .subscribe(
        dados => {
          this.user_first_name = dados['first_name'];
        }
      );
  }

}
