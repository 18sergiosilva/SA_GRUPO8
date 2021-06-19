import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Utils } from '../utils/utils';
import * as crypto from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private location: Location) { }
  correo: string;
  contra: string;
  incorrecto = false;
  tipoUser = 0;
  titulo = "Ingreso de Usuario";

  endpoint = "http://18.118.255.26:3005";

  ngOnInit() {
    if (localStorage.getItem('logged') === '1') {
      //localStorage.setItem('logged', '0');
      this.router.navigate(['home']);   
    }
    Utils.indices = [
      {
        title: 'Ingresar',
        url: '/login',
        icon: 'mdi-settings-box'
      },
      {
        title: 'Registrarse',
        url: '/registrarse',
        icon: 'mdi-account-multiple-plus'
      },
      {
        title: 'Catalogo Productos',
        url: '/catalogo',
        icon: 'mdi-food'
      },
      {
        title: 'Carrito de Compra',
        url: '/carrito',
        icon: 'mdi-shopping'
      },
      
    ];
  }

  entrar() {
    this.http.post(this.endpoint + '/users/login',
      {
        'username': this.correo,
        'contraseña': this.contra
      }).subscribe((data: any) => {

        localStorage.setItem('user', data.username);
        localStorage.setItem('logged', '1');
        localStorage.setItem('userid', data._id);
        localStorage.setItem('tipoUsuario', data.tipoUsuario);
        localStorage.setItem('username', data.username);

        //USUARIO CLIENTE
        if (localStorage.getItem('tipoUsuario') == '1') {
          //si es administrador
          if (localStorage.getItem('username') == 'admin') {
            console.log("admin");
            this.router.navigate(['vista-admin']);  //VISTA ADMIN 
          }
          else{
            console.log("cliente");
            this.router.navigate(['home']);  //VISTA USUARIO 
          }
        }
        //USUARIO EDITORIAL
        else if (localStorage.getItem('tipoUsuario') == '2') {
          console.log("cliente");
          this.router.navigate(['home']);  //VISTA EDITORIAL
        }
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
          this.cancelar();
          this.incorrecto = true;
        });
        
        Utils.indices.push(
          {
            title: 'Cerrar Sesión',
            url: '',
            icon: 'mdi-exit-to-app'
          }
        );
  }


  cancelar() {
    this.correo = '';
    this.contra = '';
    this.incorrecto = false;
    this.router.navigate(['login']);
  }

}
