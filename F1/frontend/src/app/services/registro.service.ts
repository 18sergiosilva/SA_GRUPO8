import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient, private router: Router) { }

  endpoint = "https://localhost:3000";

  registrarCliente(cliente) {
    let apiUrl = this.endpoint+'/users/register';
    return this.http.post<any>(apiUrl, cliente)
      .pipe(map(data => {
        return data;
      }));
  }
}
