import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-versolicitudes',
  templateUrl: './versolicitudes.component.html',
  styleUrls: ['./versolicitudes.component.scss']
})
export class VersolicitudesComponent implements OnInit {

  // Declaraciones
  solicitudes = [];
  tabletitle="LISTA DE SOLICITUDES :)"
  expandContent = true;

  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3005/solicitudes/";

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): boolean {
    this.http.get(this.endpoint)
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.solicitudes = data.datos;
      });
    return true;
  }

  cambiarStatus(libro: string):boolean {
    let editorial = localStorage.getItem('username');
    this.http.post(this.endpoint+'updatestatus',
    {
      'nombreLibro': libro,
      'Editorial': editorial
    }).toPromise().then((data: any) => {
      Swal.fire({
        text: 'Solicitud Actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      this.cargarSolicitudes(); 
      return true;
    });
    return false;

  }

}
