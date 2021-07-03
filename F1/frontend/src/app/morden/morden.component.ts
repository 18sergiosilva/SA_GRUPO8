import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-morden',
  templateUrl: './morden.component.html',
  styleUrls: ['./morden.component.scss']
})
export class MordenComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,private route: ActivatedRoute) { }

  id = String(this.route.snapshot.params['id']);
  correo=localStorage.getItem('correo');
  fecha: string;
  nombre: string;
  nit: string;
  direccion: string;
  estado:string;
  status:string;
  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/sinRegistro/";
  orden:string;

  ngOnInit() {
    if (localStorage.getItem('logged') !== '1') {
      localStorage.setItem('logged', '0');
      this.router.navigate(['login']);
    }
    this.getData();
  }

  getData(): boolean {
    this.http.get(this.endpoint+this.id)
      .toPromise().then((data: any) => {
        //console.log(data);
        this.orden=JSON.stringify(data);
        this.fecha=data.fechaGenerado;
        this.nombre=data.nombre;
        this.nit=data.nit;
        this.direccion=data.direccion;
        this.estado=data.estado;

        if(data.estado==0){
          this.status="Nueva Orden";
        }
        else if(data.estado==1){
          this.status="Empaquetado";
        }
        else if(data.estado==2){
          this.status="En Camino";
        }
        else if(data.estado==3){
          this.status="Entregado";
        }
        else if(data.estado==4){
          this.status="Cancelado";
        }
      });
    return true;
  }


  editar() {
    if(this.estado=="3"){

      console.log("ENVIANDO MAIL");
      console.log(this.orden);

      this.http.post('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/sendmail',
      {
        'destino': "fraaanciscolezana8@gmail.com",
        'mensaje': this.orden
      }).toPromise().then((data: any) => {
        console.log(data);
      });

      this.http.put('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/' + this.id,
      {
        'estado': this.estado
      }).toPromise().then((data: any) => {
        console.log(data);
        this.getData();
      });
    }

    else{
      this.http.put('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/' + this.id,
      {
        'estado': this.estado,
      }).toPromise().then((data: any) => {
        console.log(data);
      });
      this.getData();
    }

    
  }
}
