import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  nuevo_nombre: string;
  nuevo_autor: string;
  nuevo_fecha: string;
  pdf = "";


  ngOnInit() {
  }

  cancelar() {
    this.nuevo_nombre = "";
    this.nuevo_autor = "";
    this.nuevo_fecha = "";
  }

  agregar() {
    this.http.post('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3005/solicitudes/new',
      {
        "nombreLibro": this.nuevo_nombre,
        "nombresAutor": this.nuevo_autor,
        "fechaPublicacion": this.nuevo_fecha,
        "baseArchivo": this.pdf,
        "status": 0
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
      });
  }

  onFileSelected(event: { target: { files: Blob[]; }; }) {
    if (event.target.files) {
      //this.pdf = event.target.files[0].name;
    };
  }
}


