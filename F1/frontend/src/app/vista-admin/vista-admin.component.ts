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

  endpoint = "http://18.118.255.26:3005";


  ngOnInit() {
    this.cargarUsers();
  }

  cargarUsers(): boolean {
    this.http.get(this.endpoint+'/users/getallnoacepted')
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.users = data.data;
      });
    return true;
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
      this.router.navigate(['vista-admin']); 
      return true;
    });
    return false;

  }

}
