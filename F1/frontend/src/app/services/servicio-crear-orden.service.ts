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
    let apiUrl = 'http://18.118.255.26:3004/ordenes/sinRegistro';
    return this.http.post<any>(apiUrl, orden)
      .pipe(map(data => {
        return data;
      }));
  }

}
