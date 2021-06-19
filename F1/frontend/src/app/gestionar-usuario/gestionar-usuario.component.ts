import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Declaraciones
  users = [];
  username = "";
  tabletitle="LISTA DE USUARIOS"

  endpoint = "http://18.118.255.26:3005";

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.cargarUsers();
  }

  cargarUsers(): boolean {
    this.http.get(this.endpoint+'/users/getAll')
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.users = data.data;
      });
    return true;
  }

  cambiarStatus(u_username: string):boolean {
    this.http.post(this.endpoint+'/users/deleteUser',
    {
      'username': u_username
    }).toPromise().then((data: any) => {
      Swal.fire({
        text: 'Usuario Eliminado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      this.cargarUsers(); 
      return true;
    });
    return false;

  }

}
