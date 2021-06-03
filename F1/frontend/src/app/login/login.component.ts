import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Utils } from '../utils/utils';
import * as crypto from 'crypto-js';

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
  contrasenaEn = "";
  encPass = "ayd1";

  ngOnInit() {
    if (localStorage.getItem('logued') === '1') {
      localStorage.setItem('logued', '0');
      this.router.navigate(['login']);
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
      }
    ];
  }
  entrar() {
    this.encriptarContrasena();
    this.http.post('http://3.140.186.177:3005/users/login',
      {
        'username': this.correo,
        'contraseña': this.contrasenaEn
      }).subscribe((data: any) => {
        localStorage.setItem('user', data.username);
        localStorage.setItem('logued', '1');
        localStorage.setItem('userid',data._id);
        localStorage.setItem('tipoUsuario',data.tipoUsuario);
        Utils.indices = [
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
          {
            title: 'Consultar Orden',
            url: '/consultar',
            icon: 'mdi-clipboard-check'
          }
        ];
        if (localStorage.getItem('tipoUsuario') === '1') {
          Utils.indices.push(
            {
              title: 'Agregar Producto',
              url: '/crear',
              icon: 'mdi-pencil'
            },
            {
              title: 'Modificar Producto',
              url: '/modificar',
              icon: 'mdi-folder-upload'
            },
            {
              title: 'Eliminar Producto',
              url: '/eliminar',
              icon: 'mdi-delete'
            },
            {
              title: 'Estado de Ordenes',
              url: '/ordenes-estado',
              icon: 'mdi-clipboard-text-outline'
            },
            {
              title: 'Eliminar Orden',
              url: '/eliminarorden',
              icon: 'mdi-folder-remove'
            }
          );
        }
        Utils.indices.push(
          {
            title: 'Cerrar Sesión',
            url: '',
            icon: 'mdi-exit-to-app'
          }
        );
        this.router.navigate(['home']);
        localStorage.setItem("producto","");
      },
        (error: HttpErrorResponse) => {
          this.cancelar();
          this.incorrecto = true;
        });
  }

  cancelar() {
    this.correo = '';
    this.contra = '';
    this.incorrecto = false;
  }


  encriptarContrasena() {
    this.contrasenaEn = this.contra;
    this.contrasenaEn = crypto.AES.encrypt(this.contrasenaEn.trim(), this.encPass.trim()).toString();
  }


}
