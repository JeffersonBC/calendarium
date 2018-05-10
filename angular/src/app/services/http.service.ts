import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable()
export class HttpService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public post(url: string, objeto: any) {
        return this.http.post(
            url,
            JSON.stringify(objeto),
            this.httpOptions
        );
    }

    public get(url: string) {
        return this.http.get(
            url,
            this.httpOptions
        );
    }
}
