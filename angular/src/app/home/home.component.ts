import { Component, OnInit } from '@angular/core';

import { LoginEmitService } from '../services/login-emit.service';
import { ContasService } from '../services/contas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn = false;
  public user_first_name = '';

  constructor(
    private contasService: ContasService,
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
    this.contasService.getUsuarioLogado().subscribe(
      dados => this.user_first_name = dados['msg']['first_name'],
      (error: any) => console.log(error)
    );
  }
}
