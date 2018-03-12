import { Component, OnInit, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-conta-login',
  templateUrl: './conta-login.component.html',
  styleUrls: ['./conta-login.component.css']
})
export class ContaLoginComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  tryLogin(user: string, password: string) {
    const json = {username: user, password: password};

    const header = new Headers();
    header.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: header });

    this.http.post(
      'http://localhost:8000/api/accounts/get_auth_token/',
      JSON.stringify(json),
      options
    )
      .map(response => response.json())
      .subscribe(
        dados => {
          alert(dados['token']);
        },
        (error: any) => {
          alert('erro');
        }
      );

  }

}
