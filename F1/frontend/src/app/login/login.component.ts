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
  encPass = "ayd1";

  ngOnInit() {
    if (localStorage.getItem('logged') === '1') {
      localStorage.setItem('logged', '0');
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
    this.http.post('http://3.140.186.177:3005/users/login',
      {
        'username': this.correo,
        'contraseña': this.contra
      }).subscribe((data: any) => {
        localStorage.setItem('user', data.username);
        localStorage.setItem('logged', '1');
        localStorage.setItem('userid',data._id);
        localStorage.setItem('tipoUsuario',data.tipoUsuario);

        //MENUS
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
        //USUARIO ADMIN
        if(localStorage.getItem('tipoUsuario') ==='0'){
          this.router.navigate(['admin']);
        }
        //USUARIO CLIENTE
        else if (localStorage.getItem('tipoUsuario') === '1') {
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
        //USUARIO EDITORIAL
        else if (localStorage.getItem('tipoUsuario') === '2') {
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
        //localStorage.setItem("producto","");
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

}
