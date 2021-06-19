import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';
import { RegistroService } from "../services/registro.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  constructor(private router: Router, private servicioRegistrar: RegistroService) { }

  ngOnInit() {
  }

  //datos
  username = "";
  nombres = "";
  apellidos = "";
  correo = "";
  telefono = "";
  direccion = "";
  contrasena = "";
  status=0; //0 para un usuario que desea ser activado
  tipoUsuario="";


  agregar() {
    if(this.tipoUsuario=="1"){
      this.status=1;
    }
    if (this.camposLLenos() == true) {
        const cliente = {
          "username": this.username,
          "nombres": this.nombres,
          "apellidos": this.apellidos,
          "correo": this.correo,
          "telefono": this.telefono,
          "direccion": this.direccion,
          "contraseña": this.contrasena,
          "status":this.status,
          "tipoUsuario":this.tipoUsuario
        }
        this.servicioRegistrar
          .registrarCliente(cliente)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log(data);
              if (data.codigoEstado == 200) {
                Swal.fire({
                  text: 'Su registro fué exitoso',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.cancelar();
                    this.router.navigate(['login']);
                  }
                });
              }
            },
            (error) => {
              if (error.status == 409) {
                Swal.fire({
                  text: 'Error! El username ya existe',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.username = "";
                  }
                });

              }
              else if (error.status == 404) {
                Swal.fire({
                  text: 'Error!',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                }).then(resultado => {
                  if (resultado.value) {
                    this.cancelar();
                  }
                });
              }
            }
          );
    }
    else {
      Swal.fire({
        text: 'Error! Debe llenar todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
    }
  }

  camposLLenos(): boolean {
    if (this.username != "" && this.nombres != "" && this.contrasena != "" && this.correo != "" && this.telefono != "" && this.direccion != "" ) {
      console.log("DATOS:");
      console.log(this.username );
      console.log(this.nombres);
      console.log(this.contrasena);
      console.log(this.correo);
      console.log(this.telefono);
      console.log(this.direccion);
      console.log(this.tipoUsuario);
      console.log(this.status);
      return true
    }
    return false
  }

  cancelar() {
    this.username = "";
    this.correo = "";
    this.contrasena = "";
    this.nombres = "";
    this.apellidos = "";
    this.telefono = "";
    this.direccion = "";
    this.status=0;
    this.tipoUsuario="";
  }

}
