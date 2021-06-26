import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioCrearOrdenService {
  constructor(private http: HttpClient, private router: Router) { }

  crearOrden(orden) {
    let apiUrl = 'http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/sinRegistro';
    return this.http.post<any>(apiUrl, orden)
      .pipe(map(data => {
        return data;
      }));
  }

}
