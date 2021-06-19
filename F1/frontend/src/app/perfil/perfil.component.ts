import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Utils } from '../utils/utils';
import * as crypto from 'crypto-js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private location: Location) { }
  username=localStorage.getItem('username');
  contra=localStorage.getItem('pass');
  apellidos:string;
  correo: string;
  telefono:string;
  direccion:string;
  nombres: string;

  endpoint = "http://18.118.255.26:3005";

  ngOnInit() {
    this.entrar();
    Utils.indices=[];
    Utils.indices = [
    ];
  }

  entrar() {
    this.http.post(this.endpoint + '/users/login',
      {
        'username': this.username,
        'contraseña': this.contra
      }).subscribe((data: any) => {
        localStorage.setItem('logged', '1');
        localStorage.setItem('userid', data._id);
        localStorage.setItem('tipoUsuario', data.tipoUsuario);
        localStorage.setItem('username', data.username);
        localStorage.setItem('pass', data.contraseña);

        this.nombres=data.nombres;
        this.apellidos=data.apellidos;
        this.direccion=data.direccion;
        this.telefono=data.telefono;
        this.correo=data.correo;

        
        Utils.indices.push(
          {
            title: 'Cerrar Sesión',
            url: '/login',
            icon: 'mdi-exit-to-app'
          }
        );
      },
        (error: HttpErrorResponse) => {
          console.log(error.error.codigoEstado);
          if (error.error.codigoEstado==401) {
            Swal.fire({
              text: "Usuario no aceptado",
              icon: 'warning',
              confirmButtonText: 'Aceptar',
            });
          }
          else if (error.error.codigoEstado==404) {
            Swal.fire({
              text: "Usuario o Contraseña incorrecta ",
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        });
  }


}
