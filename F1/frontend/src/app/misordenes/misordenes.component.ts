import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-misordenes',
  templateUrl: './misordenes.component.html',
  styleUrls: ['./misordenes.component.scss']
})
export class MisordenesComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ordenes = [];
  ordenes2 = [];
  tabletitle = "MIS ORDENES"
  nombre = localStorage.getItem('nombre');

  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/";

  ngOnInit() {
    if (localStorage.getItem('logged') === '0') {
      this.router.navigate(['login']);
    }
    this.cargarOrdenes();
    this.cargarPorNombre();
  }

  cargarPorNombre() {

  }

  cargarOrdenes(): boolean {
    this.http.get(this.endpoint)
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.ordenes2 = data;
        this.ordenes2.forEach(orden => {
          console.log(orden.nombre);
          if (orden.nombre === this.nombre) {
            if (orden.estado == 0) {
              orden.estado = "Nueva Orden"
            } else if (orden.estado == 1) {
              orden.estado = "Empaquetado"
            } else if (orden.estado == 2) {
              orden.estado = "En Camino"
            } else if (orden.estado == 3) {
              orden.estado = "Entregado"
            } else {
              orden.estado = "Cancelado"
            }
            this.ordenes.push(orden);
          }
        });
      });
    return true;
  }
}
