import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.scss']
})
export class VistaAdminComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Declaraciones
  users = [];
  username = "";
  tabletitle="LISTA DE USUARIOS"

  endpoint = "https://localhost:3000";

  usuario ={
    username : "edit1",
    nombres : "Editorial del Valle",
    correo : "correo1@gmail.com"
  }


  ngOnInit() {
    this.cargarUsers();
    this.users.push(this.usuario);
  }

  cargarUsers(): boolean {
    this.http.get(this.endpoint+'/users/getallnoacepted')
      .toPromise().then((data: any) => {
        this.users = data;
      });
    return true;
  }

  cambiarStatus2(u_username: string) {
      Swal.fire({
        text: 'Usuario '+u_username+' Actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

  }

  cambiarStatus(u_username: string):boolean {
    this.http.post(this.endpoint+'/users/updatestatus',
    {
      'username': u_username
    }).toPromise().then((data: any) => {
      Swal.fire({
        text: 'Usuario Actualizado',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      return true;
    });
    return false;

  }

}
