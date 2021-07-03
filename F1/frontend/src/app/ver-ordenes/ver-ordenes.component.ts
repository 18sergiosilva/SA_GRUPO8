import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';


@Component({
  selector: 'app-ver-ordenes',
  templateUrl: './ver-ordenes.component.html',
  styleUrls: ['./ver-ordenes.component.scss']
})
export class VerOrdenesComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Declaraciones
  ordenes = [];
  tabletitle="LISTA DE ORDENES"
  expandContent = true;

  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/";

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.cargarOrdenes();
  }
  

  cargarOrdenes(): boolean {
    this.http.get(this.endpoint)
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.ordenes = data;
        this.defestados();
      });
    return true;
  }

  defestados(){
    this.ordenes.forEach(element => {
      console.log(element.estado);
      if(element.estado==0){
        element.estado="Nueva Orden";
      }
      else if(element.estado==1){
        element.estado="Empaquetado";
      }
      else if(element.estado==2){
        element.estado="En Camino";
      }
      else if(element.estado==3){
        element.estado="Entregado";
      }
      else if(element.estado==4){
        element.estado="Cancelado";
      }
    });
  }

  editar(id: string) {
    this.router.navigate(['morden', id]);
  }

  findDetails(data) {
    return this.ordenes.filter(x => x.whoseData === data._id);
  }

  expand(){
    this.expandContent = !this.expandContent
    }

}
