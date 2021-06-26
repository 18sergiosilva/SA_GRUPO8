import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient, private router: Router) { }

  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3005";

  registrarCliente(cliente) {
    let apiUrl = this.endpoint+'/users/register';
    return this.http.post<any>(apiUrl, cliente)
      .pipe(map(data => {
        return data;
      }));
  }
}
